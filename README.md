# angular2-express-phantom

Example boilerplate to build SEO-friendly Angular 2 application on top of ExpressJS, and using PhantomJS to prerender pages for search engines.

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

