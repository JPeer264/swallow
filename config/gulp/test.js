module.exports = function (options) {
    const gulp        = options.gulp;
    const plugins     = options.plugins;
    const directories = options.directories;

    return {
        all: function () {
            return gulp.src(directories.src + '/')
                .pipe(gulp.dest(directories.dev));
        }
    };
};
