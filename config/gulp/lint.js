module.exports = options => {
    const gulp    = options.gulp;
    const paths   = options.paths;
    const plugins = options.plugins;

    return {
        scss: () => {
            return gulp.src(gulp.data.get('paths.src.allFiles.scss'))
                .pipe(plugins.sassLint({
                    configFile: gulp.data.get('paths.config.scsslint')
                }))
                .pipe(plugins.sassLint.format())
                .pipe(plugins.sassLint.failOnError());
        },
        js: () => {
            return gulp.src(gulp.util._.flatten(gulp.data.get('paths.src.files.js')))
                .pipe(plugins.eslint({
                    configFile: gulp.data.get('paths.config.eslint')
                }))
                .pipe(plugins.eslint.format())
                .pipe(plugins.eslint.failOnError());
        },
        html: () => {
            return gulp.src(gulp.data.get('paths.src.allFiles.html'))
                .pipe(plugins.htmllint({
                    failOnError: true,
                    config: gulp.data.get('paths.config.htmllint')
                }));
        },
    };
};
