module.exports = options => {
    const gulp    = options.gulp;
    const paths   = options.paths;
    const plugins = options.plugins;

    return {
        js: () => {
            return gulp.src(gulp.data.get('paths.dev.allFiles.js'))
                .pipe(plugins.sourcemaps.init({loadMaps: true}))
                .pipe(plugins.rcs({
                    exclude: '**/vendor.js'
                }))
                .pipe(plugins.uglify())
                .pipe(plugins.rename({
                    suffix: '.min'
                }))
                .pipe(plugins.sourcemaps.write(gulp.data.get('paths.base')))
                .pipe(gulp.dest(gulp.data.get('paths.dest.base')));
        },
        css: () => {
            return gulp.src(gulp.data.get('paths.dev.allFiles.css'))
                .pipe(plugins.sourcemaps.init({loadMaps: true}))
                .pipe(plugins.rcs())
                .pipe(plugins.cleanCss())
                .pipe(plugins.rename({
                    suffix: '.min'
                }))
                .pipe(plugins.sourcemaps.write(gulp.data.get('paths.base')))
                .pipe(gulp.dest(gulp.data.get('paths.dest.base')));
        },
        html: () => {
            return gulp.src(gulp.data.get('paths.src.allFiles.html'))
                .pipe(plugins.cdnify({
                    rewriter: url => {
                        var arr = url.split('.');

                        if (arr[arr.length - 2] !== 'min') {
                            arr.splice((arr.length - 1), 0, 'min');
                        }

                        return arr.join('.');
                    }
                }))
                .pipe(plugins.rcs())
                .pipe(plugins.htmlmin({collapseWhitespace: true}))
                .pipe(gulp.dest(gulp.data.get('paths.dest.base')));
        }
    };
};
