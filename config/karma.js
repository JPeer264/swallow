// karma.conf.js
module.exports = config => {
    config.set({
        basePath: '../',
        preprocessors: {
            'src/**/*.js': ['babel'],
            '**/src/**/*.js': ['coverage']
        },
        babelPreprocessor: {
            options: {
                presets: ['es2015'],
                sourceMap: 'inline'
            },
            filename: file => {
                return file.originalPath.replace(/\.js$/, '.es5.js');
            },
            sourceFileName: file => {
                return file.originalPath;
            }
        },
        files: [
            'dev/assets/js/vendor.js',
            'src/**/*.js',
            'src/**/*.spec.js'
        ],
        browsers: [
            'PhantomJS',
            'Firefox',
            'Chrome'
        ],
        frameworks: [
            'mocha',
            'chai'
        ],
        autoWatch: false,
        client: {
            mocha: {
                opts: './config/mocha.opts'
            }
        },
        reporters: [
            'progress',
            'coverage'
        ],
        coverageReporter: {
            type : 'html',
            dir : 'coverage/',
            subdir: browser => {
                // normalization process to keep a consistent browser name across different
                // https://github.com/karma-runner/karma-coverage/blob/master/docs/configuration.md#subdir
                return browser.toLowerCase().split(/[ /-]/)[0];
            }
        }
    });
};