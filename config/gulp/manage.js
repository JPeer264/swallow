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

            return gulp.src(gulp.gconfig.get('paths.src.files.scss'))
                .pipe(plugins.sourcemaps.init())
                .pipe(plugins.sass())
                .pipe(plugins.postcss(postcssProcessors))
                .pipe(plugins.sourcemaps.write(gulp.gconfig.get('paths.base')))
                .pipe(gulp.dest(gulp.gconfig.get('paths.dev.base')));
        }
    };
};
