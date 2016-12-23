module.exports = options => {
    const gulp    = options.gulp;
    const paths   = options.paths;
    const plugins = options.plugins;

    return {
        sass: function () {
            return gulp.src('/');
        },
        js: function () {
            return gulp.src('/');
        },
        css: function () {
            return gulp.src(gulp.data.get('paths.dev.base') + '/**/*.css')
                .pipe(plugins.csslint(gulp.data.get('paths.config.csslint')))
                .pipe(plugins.csslint.formatter());
        },
        html: function () {
            return gulp.src('/');
        },
    };
};
