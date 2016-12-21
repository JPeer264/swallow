module.exports = options => {
    const gulp    = options.gulp;
    const paths   = options.paths;
    const plugins = options.plugins;

    return {
        all: function () {
            return gulp.src('/');
        }
    };
};
