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
            console.log(paths)

            var t = gulp.util.template('src/scss/main.scss', paths);
            console.log(t)
            return gulp.src('src/**/*.scss')
                .pipe(plugins.sass())
                .pipe(plugins.postcss(postcssProcessors))
                .pipe(gulp.dest('dev'));
        }
    };
};
