module.exports = options => {
    const gulp    = options.gulp;

    return {
        js: () => {
            return gulp.src(gulp.data.get('paths.dev.allFiles.js'))
                .pipe(gulp.plugins.sourcemaps.init({loadMaps: true}))
                .pipe(gulp.plugins.rcs({
                    exclude: '**/vendor.js'
                }))
                .pipe(gulp.plugins.uglify())
                .pipe(gulp.plugins.rename({
                    suffix: '.min'
                }))
                .pipe(gulp.plugins.sourcemaps.write(gulp.data.get('paths.base')))
                .pipe(gulp.dest(gulp.data.get('paths.dest.base')));
        },
        css: () => {
            return gulp.src(gulp.data.get('paths.dev.allFiles.css'))
                .pipe(gulp.plugins.sourcemaps.init({loadMaps: true}))
                .pipe(gulp.plugins.rcs())
                .pipe(gulp.plugins.cleanCss())
                .pipe(gulp.plugins.rename({
                    suffix: '.min'
                }))
                .pipe(gulp.plugins.sourcemaps.write(gulp.data.get('paths.base')))
                .pipe(gulp.dest(gulp.data.get('paths.dest.base')));
        },
        html: () => {
            return gulp.src(gulp.data.get('paths.src.allFiles.html'))
                .pipe(gulp.plugins.cdnify({
                    rewriter: url => {
                        var arr = url.split('.');

                        if (arr[arr.length - 2] !== 'min') {
                            arr.splice((arr.length - 1), 0, 'min');
                        }

                        return arr.join('.');
                    }
                }))
                .pipe(gulp.plugins.rcs())
                .pipe(gulp.plugins.htmlmin({collapseWhitespace: true}))
                .pipe(gulp.dest(gulp.data.get('paths.dest.base')));
        }
    };
};
