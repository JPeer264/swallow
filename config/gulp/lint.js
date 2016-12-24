module.exports = options => {
    const gulp    = options.gulp;
    const paths   = options.paths;
    const plugins = options.plugins;

    return {
        sass: () => {
            return gulp.src('/');
        },
        js: () => {
            return gulp.src(gulp.util._.flatten(gulp.data.get('paths.src.files.js')))
                .pipe(plugins.eslint({
                    configFile: gulp.data.get('paths.config.eslint')
                }))
                .pipe(plugins.eslint.format())
                .pipe(plugins.eslint.failOnError());
        },
        css: () => {
            return gulp.src(gulp.data.get('paths.dev.base') + '/**/*.css')
                .pipe(plugins.csslint(gulp.data.get('paths.config.csslint')))
                .pipe(plugins.csslint.formatter());
        },
        html: () => {
            return gulp.src('/');
        },
    };
};
