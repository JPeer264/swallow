module.exports = options => {
    const gulp    = options.gulp;
    const paths   = options.paths;
    const plugins = options.plugins;

    // lints scss files but does not fail
    const scss = () => {
        return gulp.src(gulp.data.get('paths.src.allFiles.scss'))
            .pipe(plugins.sassLint({
                configFile: gulp.data.get('paths.config.scsslint')
            }))
            .pipe(plugins.sassLint.format());
    };

    // lints scss files and fails
    const scssFail = () => {
        return scss().pipe(plugins.sassLint.failOnError());
    };

    // lints js files but does not fail
    const js = () => {
        return gulp.src(gulp.util._.flatten(gulp.data.get('paths.src.files.js')))
            .pipe(plugins.eslint({
                configFile: gulp.data.get('paths.config.eslint')
            }))
            .pipe(plugins.eslint.format());
    };

    // lints js files and fails
    const jsFail = () => {
        return js().pipe(plugins.eslint.failOnError());
    };

    // lints html files but does not fail
    const html = () => {
        return gulp.src(gulp.data.get('paths.src.allFiles.html'))
            .pipe(plugins.htmllint({
                config: gulp.data.get('paths.config.htmllint')
            }));
    };

    // lints html files and fails
    const htmlFail = () => {
        // @todo does not really fail
        return gulp.src(gulp.data.get('paths.src.allFiles.html'))
            .pipe(plugins.htmllint({
                failOnError: true,
                config: gulp.data.get('paths.config.htmllint')
            }));
    };

    return {
        scss,
        'scss:fail': scssFail,
        js,
        'js:fail': jsFail,
        html,
        'html:fail': htmlFail
    };
};
