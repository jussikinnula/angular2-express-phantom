import path = require("path");
import http = require("http");
import express = require("express");
import serveStatic = require("serve-static");

// The port should be always defined in env, by default we can use 5000
const port: number = process.env.PORT || 5000;

// Root directory will be on the ../target (instead of being in src)
const root = path.join(path.resolve(__dirname, "../target"));

// Get ExpressJS instance
let app: express.Express = express();

// Static assets are served directly from assets directory
app.use("/assets", serveStatic(path.resolve(root, "assets")));

// Set router to serve index.html (e.g. single page app)
let router: express.Router = express.Router();
router.get("/", (request: express.Request, result: express.Response) => {
    // In case that the request query contains _escaped_fragment_,
    // use PhantomJS to prerender the page
    if (typeof request.query['_escaped_fragment_'] === 'string') {
        // We need to remove the query parameters to avoid infinite loop
        let pagePath = request.originalUrl.split("?").shift();
        // Otherwise the page URL is just contructed from protocol, host and path
        let pageUrl = request.protocol + '://' + request.get('host') + pagePath;
        let phantom = require('phantom');
        var _ph, _page, _outObj;

        phantom.create().then(ph => {
            _ph = ph;
            return _ph.createPage();
        }).then(page => {
            _page = page;
            return _page.open(pageUrl);
        }).then(status => {
            return _page.property('content')
        }).then(content => {
            result.send(content);
            _page.close();
            _ph.exit();
        });
    } else {
        // Regularly just deliver the single-page-app index.html
        result.sendFile(path.join(root, "/index.html"));
    }
});

// Set app to use router as the default route
app.use("*", router);

// Start server
app.listen(port, (error: any) => {
    if (error) {
        console.log(error);
    }
    console.log("==> Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port);
});
