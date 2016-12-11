module.exports = function (options) {
    const gulp        = options.gulp;
    const plugins     = options.plugins;
    const directories = options.directories;

    return {
        sass: function () {
            return gulp.src(directories.src + '/')
                .pipe(gulp.dest(directories.dev));
        },
        js: function () {
            return gulp.src(directories.src + '/')
                .pipe(gulp.dest(directories.dev));
        },
        css: function () {
            return gulp.src(directories.src + '/')
                .pipe(gulp.dest(directories.dev));
        },
        html: function () {
            return gulp.src(directories.src + '/')
                .pipe(gulp.dest(directories.dev));
        },
    };
};
