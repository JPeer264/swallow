import path from 'path';
import glob from 'glob';
import merge from 'merge-stream';
import autoprefixer from 'autoprefixer';
import mainBowerFiles from 'main-bower-files';
import webpack from 'webpack';


module.exports = options => {
    const gulp    = options.gulp;
    const paths   = options.paths;
    const plugins = options.plugins;
    const postcssProcessors = [
        autoprefixer({ browsers: ['last 2 versions'] })
    ];

    const webpackConfig = require(gulp.data.get('paths.config.webpack'));

    return {
        sass: () => {
            return gulp.src(gulp.data.get('paths.src.files.scss'))
                .pipe(plugins.sourcemaps.init())
                .pipe(plugins.sass())
                .pipe(plugins.postcss(postcssProcessors))
                .pipe(plugins.concat('global.css'))
                .pipe(plugins.sourcemaps.write(gulp.data.get('paths.base')))
                .pipe(gulp.dest(gulp.data.get('paths.dev.folder.assets.css')));
        },
        'js:webpack': cb => {
            return webpack(webpackConfig, (err, stats) => {
                if(err) throw new gulp.util.PluginError("webpack", err);

                gulp.util.log("[webpack]", stats.toString({
                    // output options
                }));

                cb();
            });
        },
        'js:vendor': () => {
            let bowerFiles;

            // try to read bower files
            try {
                bowerFiles = mainBowerFiles();
            } catch (e) {
                bowerFiles = '!';
            }

            return gulp.src(gulp.util._.flatten([
                    gulp.data.get('paths.src.files.couldBeVendor.js'),
                    gulp.data.get('paths.vendor.allFiles.js'),
                    gulp.data.get('paths.src.ignore.min'),
                    bowerFiles
                ]))
                .pipe(plugins.filter('**/*.js'))
                .pipe(plugins.sourcemaps.init())
                .pipe(plugins.concat('vendor.js'))
                .pipe(plugins.sourcemaps.write(gulp.data.get('paths.base')))
                .pipe(gulp.dest(gulp.data.get('paths.dev.folder.assets.js')));
        },
        'sass:browser': done => {
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

                    const newStream = gulp.src([dir + '/**/*.scss', '!**/_*.scss'])
                        .pipe(plugins.sourcemaps.init())
                        .pipe(plugins.sass())
                        .pipe(plugins.postcss(postcssProcessors))
                        .pipe(plugins.concat(fileName + '.css'))
                        .pipe(plugins.sourcemaps.write(gulp.data.get('paths.base')))
                        .pipe(gulp.dest(gulp.data.get('paths.dev.folder.assets.css')))

                    stream.add(newStream);
                }

                done();
                return stream.isEmpty() ? gulp.util.noop : stream;
            });
        }
    };
};
