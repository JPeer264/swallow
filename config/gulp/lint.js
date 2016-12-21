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
            return gulp.src('/');
        },
        html: function () {
            return gulp.src('/');
        },
    };
};
