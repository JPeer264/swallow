module.exports = options => {
    const gulp         = options.gulp;
    const paths        = options.paths;
    const plugins      = options.plugins;
    const autoprefixer = require('autoprefixer');
    const mainBowerFiles = require('main-bower-files');

    return {
        sass: () => {
            const postcssProcessors = [
                autoprefixer({ browsers: ['last 2 versions'] })
            ];

            return gulp.src(gulp.gconfig.get('paths.src.files.scss'))
                .pipe(plugins.sourcemaps.init())
                .pipe(plugins.sass())
                .pipe(plugins.postcss(postcssProcessors))
                .pipe(plugins.concat('global.css'))
                .pipe(plugins.sourcemaps.write(gulp.gconfig.get('paths.base')))
                .pipe(gulp.dest(gulp.gconfig.get('paths.dev.folder.assets.css')));
        },
        'js:own': () => {
            return gulp.src(gulp.util._.flatten(gulp.gconfig.get('paths.src.files.js')))
                .pipe(plugins.sourcemaps.init())
                .pipe(plugins.babel({
                    presets: ['es2015']
                }))
                .pipe(plugins.concat('main.js'))
                .pipe(plugins.sourcemaps.write(gulp.gconfig.get('paths.base')))
                .pipe(gulp.dest(gulp.gconfig.get('paths.dev.folder.assets.js')));
        },
        'js:vendor': () => {
            let bowerFiles;

            // try to read bower files
            try {
                bowerFiles = mainBowerFiles();
            } catch (e) {
                bowerFiles = '';
            }

            return gulp.src(gulp.util._.flatten([
                    gulp.gconfig.get('paths.src.files.couldBeVendor.js'),
                    gulp.gconfig.get('paths.vendor.js'),
                    gulp.gconfig.get('paths.src.ignore.min'),
                    bowerFiles
                ]))
                .pipe(plugins.sourcemaps.init())
                .pipe(plugins.concat('vendor.js'))
                .pipe(plugins.sourcemaps.write(gulp.gconfig.get('paths.base')))
                .pipe(gulp.dest(gulp.gconfig.get('paths.dev.folder.assets.js')));
        }
    };
};
