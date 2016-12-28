# 🍹 Swallow

> A Gulp boilerplate for testing, live conding, linting, deploying, ...

> It is also optimized for CI systems

## Contents

- [Basic usage](#basic-usage)
- [Features](#features)

## Basic usage

> you must have installed Node v4+ and NPM v3+

First, make sure you have instlled Gulp globally
```sh
$ npm i -g gulp
```

Secondly, install the dependencies
```sh
$ npm i
```

### Build

**Dev**

Build the developing code. The builded files are stored in `dev`
```sh
$ gulp build:dev
```

**Production**

Build the production ready code. The builded files will be generated into the directory `./dist`
```sh
$ gulp build:prod
```

or
```sh
$ gulp
```

**Clean it up, Scotty**

Remove all gulp generated files and directories by using:
```sh
$ gulp clean
```

## Features

- [Browser stylesheets](#browser-stylesheets)
- [Production ready code](#production-ready-code)
- [ES2015 support](#es2015-support)
- [Testing](#testing)
- [Linting](#linting)
- [Live coding](#live-conding)

### Browser stylesheets

> Generates a own stylesheet for browsers

In the directory `./src/assets/scss` you must add a new folder with the prefix `browser.`. This new prefixed folder will generate its own file, the file is called as the folder without the prefix.

Example:

```
└─── src/
    └─── assets/
        └─── scss/
            ├─── main.scss
            └─── browser.ie8/
                └─── main.scss
```

Will generate a file called: `ie8.css`. This folder is also fully ignored from the gulp generated `global.css`

Output for development:
```
└─── dev/
    └─── assets/
        ├─── global.css
        └─── ie8.css
```

### Production ready code

Your code gets automatically optimized when triggering `gulp build:prod`. This includes minified files, selectors, autoprefixer and much more.

### ES2015 support

Write your code with ES2015 syntax.

### Testing

Test your code with mocha with `gulp test`. It will test your code in `chrome`, `firefox` and `phantomjs` using `karma`. You can change the karma configuration in `./config/karma.js`

### Linting
> All configuration files are stored in the directory `./config`

Lint your `scss`, `js` and `html` code with `gulp lint`. This task will NOT fail. If you have a CI system

### Live coding

Always code and see what you did with a self updating browser on your desktop or other devices in your network.

Just use `gulp serve`

### Reports

Include generated reports in the `checkstyle` format for your CI system to check the quality of your project. The reports will be generated into the directory `./reports`.

Run:
```sh
$ gulp reports
```
And it will generate:

- `./reports/sasslint.xml`
- `./reports/eslint.xml`

## License

MIT © [Jan Peer Stöcklmair](https://www.jpeer.at)