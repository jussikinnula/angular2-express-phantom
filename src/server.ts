import path = require("path");
import http = require("http");
import express = require("express");
import serveStatic = require("serve-static");

// The port should be always defined in env
const port: number = process.env.PORT || 5000;

// Root directory will be on the ../target (instead of src)
const root = path.join(path.resolve(__dirname, "../target"));

// Get ExpressJS instance
let app: express.Express = express();

// Static assets are served directly from assets directory
app.use("/assets", serveStatic(path.resolve(root, "assets")));

// Set router to serve index.html (e.g. single page app)
let router: express.Router = express.Router();
router.get("/", (req: express.Request, res: express.Response) => {
    // In case that the request query contains _escaped_fragment_,
    // use PhantomJS to prerender the page
    if (typeof req.query['_escaped_fragment_'] === 'string') {
        let prerender = require("./server/prerender");
        prerender(req, res);
    } else {
        // Regularly just deliver the single-page-app index.html
        res.sendFile(path.join(root, "/index.html"));
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
