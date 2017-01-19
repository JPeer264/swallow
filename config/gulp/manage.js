import path from 'path';
import glob from 'glob';
import merge from 'merge-stream';
import autoprefixer from 'autoprefixer';
import mainBowerFiles from 'main-bower-files';

module.exports = options => {
    const gulp    = options.gulp;
    const paths   = options.paths;
    const plugins = options.plugins;
    const postcssProcessors = [
        autoprefixer({ browsers: ['last 2 versions'] })
    ];

    return {
        hbs: () => {
            return gulp.src(gulp.data.get('paths.src.base') + '/index.hbs')
                .pipe(plugins.compileHandlebars({}, {
                    batch : [
                        gulp.data.get('paths.src.folder.assets.base') + '/templates'
                    ],
                }))
                .pipe(plugins.rename('index.html'))
                .pipe(gulp.dest(gulp.data.get('paths.dev.base')));
        },
        sass: () => {
            return gulp.src(gulp.data.get('paths.src.files.scss'))
                .pipe(plugins.sourcemaps.init())
                .pipe(plugins.sass())
                .pipe(plugins.postcss(postcssProcessors))
                .pipe(plugins.concat('global.css'))
                .pipe(plugins.sourcemaps.write(gulp.data.get('paths.base')))
                .pipe(gulp.dest(gulp.data.get('paths.dev.folder.assets.css')));
        },
        'js:own': () => {
            return gulp.src(gulp.util._.flatten(gulp.data.get('paths.src.files.js')))
                .pipe(plugins.sourcemaps.init())
                .pipe(plugins.babel({
                    presets: ['es2015']
                }))
                .pipe(plugins.concat('main.js'))
                .pipe(plugins.sourcemaps.write(gulp.data.get('paths.base')))
                .pipe(gulp.dest(gulp.data.get('paths.dev.folder.assets.js')));
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
                    gulp.data.get('paths.src.files.couldBeVendor.js'),
                    gulp.data.get('paths.vendor.js'),
                    gulp.data.get('paths.src.ignore.min'),
                    bowerFiles
                ]))
                .pipe(plugins.filter('**/*.js'))
                .pipe(plugins.sourcemaps.init())
                .pipe(plugins.concat('vendor.js'))
                .pipe(plugins.sourcemaps.write(gulp.data.get('paths.base')))
                .pipe(gulp.dest(gulp.data.get('paths.dev.folder.assets.js')));
        },
        'sass:browser': () => {
            let stream = merge();

            glob('./src/assets/scss/*', (err, paths) => {
                // delete if no indexOf browser.
                for (let dir of paths) {
                    // continue if the path is not the right dir
                    if (dir.indexOf('browser.') === -1) {
                        continue;
                    }

                    let dirName = path.basename(dir);
                    let fileName = dirName.slice(8, dirName.length);

                    stream.add(gulp.src([dir + '/**/*.scss', '!**/_*.scss'])
                        .pipe(plugins.sourcemaps.init())
                        .pipe(plugins.sass())
                        .pipe(plugins.postcss(postcssProcessors))
                        .pipe(plugins.concat(fileName + '.css'))
                        .pipe(plugins.sourcemaps.write(gulp.data.get('paths.base')))
                        .pipe(gulp.dest(gulp.data.get('paths.dev.folder.assets.css'))));
                }
            });

            return stream.isEmpty() ? gulp.util.noob : stream;
        }
    };
};
