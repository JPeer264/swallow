module.exports = options => {
    const gulp         = options.gulp;
    const paths        = options.paths;
    const plugins      = options.plugins;

    return {
        js: function () {
            return gulp.src(gulp.gconfig.get('paths.dev.files.js'))
                .pipe(plugins.sourcemaps.init({loadMaps: true}))
                .pipe(plugins.rcs())
                .pipe(plugins.uglify())
                .pipe(plugins.rename({
                    suffix: '.min'
                }))
                .pipe(plugins.sourcemaps.write(gulp.gconfig.get('paths.base')))
                .pipe(gulp.dest(gulp.gconfig.get('paths.dest.folder.assets.js')));
        },
        css: function () {
            return gulp.src(gulp.gconfig.get('paths.dev.files.css'))
                .pipe(plugins.sourcemaps.init({loadMaps: true}))
                .pipe(plugins.rcs())
                .pipe(plugins.cleanCss())
                .pipe(plugins.rename({
                    suffix: '.min'
                }))
                .pipe(plugins.sourcemaps.write(gulp.gconfig.get('paths.base')))
                .pipe(gulp.dest(gulp.gconfig.get('paths.dest.folder.assets.css')));
        },
        html: function () {
            return gulp.src(gulp.gconfig.get('paths.src.allFiles.html'))
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
                .pipe(gulp.dest(gulp.gconfig.get('paths.dest.base')));
        }
    };
};
