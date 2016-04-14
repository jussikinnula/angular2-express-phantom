import express = require('express');

module.exports = prerender;

function prerender(req: express.Request, res: express.Response) {
    // We need to remove the query parameters to avoid infinite loop
    let pagePath = req.originalUrl.split("?").shift();
    // Otherwise the page URL is just contructed from protocol, host and path
    let pageUrl = req.protocol + '://' + req.get('host') + pagePath;
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
        // Check if title contains "- Not Found", and change HTTP status
        let title = content.match(/<title[^>]*>([^<]+)<\/title>/)[1];
        if (title.indexOf("- Not Found") != -1) {
            res.status(404);
        }

        // Send the resulting page
        res.send(content);
        _page.close();
        _ph.exit();
    });
}