module.exports = function (options) {
    const gulp        = options.gulp;
    const plugins     = options.plugins;
    const directories = options.directories;

    return {
        sass: function () {
            return gulp.src(directories.src + '/assets/scss/main.scss')
                .pipe(plugins.sass())
                .pipe(gulp.dest(directories.dev));
        }
    };
};
