module.exports = function (options) {
    const gulp         = options.gulp;
    const paths        = options.paths;
    const plugins      = options.plugins;
    const autoprefixer = require('autoprefixer');

    return {
        sass: function () {
            const postcssProcessors = [
                autoprefixer({ browsers: ['last 2 versions'] })
            ];

            return gulp.src('src/**/*.scss')
                .pipe(plugins.sass())
                .pipe(plugins.postcss(postcssProcessors))
                .pipe(gulp.dest('dev'));
        }
    };
};
