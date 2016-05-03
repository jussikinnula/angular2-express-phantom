# angular2-express-phantom

Example boilerplate to build SEO-friendly Angular 2 application on top of ExpressJS, and using PhantomJS to prerender pages for search engines.

Note! The exact reason of this boilerplate, is to experiment with server-side rendering by using existing software

## What's in the boilerplate?

### General parts

* Angular 2 components structure (based on the *best practices* by John Papa & community)
* Webpack configuration to build client app, client vendor and server bundles (which builds also on Heroku)
* Everything under `src` is written in TypeScript, also the typings are included
* Basic content by using json-loader (Webpack) and a content service

### Server-side rendering

* Proof-of-concept implementation of server-side rendering, using PhantomJS (when GET parameter `_escaped_fragment_` is set)
* Server-side rendered pages nicely do handover to the JavaScript world

## TODO

### Content improvements

* Add MongoDB for the content (basically making this boilerplate a *MEAN* stack alike starting point)
* Add support for external CMS'es (Contently, Contentful, etc)
* Add static assets (fonts, images, etc)

### Server-side rendering
* Add Redis/Memcached based caching for the server-side rendered pages
* Add user-agent white/blacklist for enabling server-side rendering for browsers
* Change to using Angular 2 new router (instead of Angular 2 RC0's `@angular/router-deprecated`)
* Make `PageComponent` to nest (allowing multi-level pages, e.g. http://myhost.local/first/second/third)

## Installation

### Install node modules

```
npm install
```

### Install typings (optional)

The typings should be installed along with `npm install`, however, for manual upkeep of the typings you probably want to install it globally (e.g. you can use it with just `typings` command).

```
npm install -g typings
typings install
```

## Local development

### Build

```
npm run build
```

### Start web server

```
npm start
```

### Start Webpack development server

In case that you want to only develop the Angular 2 part (e.g. front-end), you can use Webpack development server:

```
npm run dev
```

### Open local app in browser

[http://localhost:5000/](http://localhost:5000/)

## Heroku

### Create a Heroku app first (if you don't have already one)

```
heroku create --region eu my-cool-app
```

We need to add buildpacks, as we need to use two of them. The first one is default Heroku's NodeJS buildpack, and the other one has PhantomJS on it.

```
heroku buildpacks:set heroku/nodejs
heroku buildpacks:set https://github.com/stomita/heroku-buildpack-phantomjs.git
```

### Deploy

```
git push heroku origin
```

### Open Heroku app in browser

```
heroku open
```

