'use strict';

// @todo find alternative for finding recursive template strings
// remove grunt as template finder

/*************
 ** MODULES **
 *************/
const _       = require('lodash');
const gulp    = require('gulp');
const grunt   = require('grunt');
const merge   = require('merge-stream');
const paths   = require('./config/paths.json');
const plugins = require('gulp-load-plugins')();
const deleteEmpty = require('delete-empty');
const browserSync = require('browser-sync').create();

/**
 * get a task in ./config/gulp/
 *
 * @param  {string} mainTask the filename for the task
 * @param  {string} subTask  the returned task from the filename
 *
 * @return {Stream}
 */
const getTask = (mainTask, subTask) => {
    const task = require('./config/gulp/' + mainTask)({gulp, plugins, paths});

    return task[subTask];
};

gulp.util   = require('gulp-util');
gulp.util._ = _;
gulp.data   = grunt.config;
gulp.data.init(paths);

/***********
 ** TASKS **
 ***********/
gulp.task('default', ['build:prod']);

// 0. Helper
// ---------
gulp.task('clean', () => {
    return gulp.src(_.flatten([
            gulp.data.get('paths.dev.base'),
            gulp.data.get('paths.dest.base'),
            gulp.data.get('paths.reports.base'),
            './coverage'
        ]))
        .pipe(plugins.clean());
});

// 1. Managing
// -----------
gulp.task('manage', ['manage:sass', 'manage:js:vendor', 'manage:js']);
gulp.task('manage:js', getTask('manage', 'js:own'));
gulp.task('manage:js:vendor', getTask('manage', 'js:vendor'));
gulp.task('manage:sass', ['manage:sass:browser'], getTask('manage', 'sass'));
gulp.task('manage:sass:browser', getTask('manage', 'sass:browser'));

// 2. Linting
// ----------
gulp.task('lint', ['lint:js', 'lint:scss', 'lint:html']);
gulp.task('lint:fail', ['lint:js:fail', 'lint:scss:fail', 'lint:html:fail']);
gulp.task('lint:js', getTask('lint', 'js'));
gulp.task('lint:js:fail', getTask('lint', 'js:fail'));
gulp.task('lint:scss', getTask('lint', 'scss'));
gulp.task('lint:scss:fail', getTask('lint', 'scss:fail'));
gulp.task('lint:html', getTask('lint', 'html'));
gulp.task('lint:html:fail', getTask('lint', 'html:fail'));

// 3. Minifying
// ------------
gulp.task('minify', ['minify:css', 'minify:js', 'minify:html']);
gulp.task('minify:js', ['manage:js', 'minify:css'], getTask('minify', 'js'));
gulp.task('minify:css', ['manage:sass'], getTask('minify', 'css'));
gulp.task('minify:html', ['minify:css'], getTask('minify', 'html'));

// 4. Testing
// ----------
gulp.task('test', ['manage:js:vendor'], getTask('test', 'all'));

// 5. Reports
// ----------
gulp.task('reports', ['reports:test', 'reports:lint']);
gulp.task('reports:test', ['test']);
gulp.task('reports:lint', () => {
    let stream = require('merge-stream')();

    stream.add(getTask('lint', 'js:report')());
    stream.add(getTask('lint', 'scss:report')());

    return stream;
});

// 6. Build
// --------
gulp.task('build', ['build:prod']);

gulp.task('build:dev', ['manage'], () => {
    const stream = gulp.src(gulp.data.get('paths.src.copy'))
        .pipe(gulp.dest(gulp.data.get('paths.dev.base')));

    stream.on('end', () => {
        return deleteEmpty.sync(gulp.data.get('paths.dev.base'))
    });

    return stream;
});

gulp.task('build:prod', ['test', 'lint:fail'], () => {
    let stream = merge();

    // clean everything before start to make the production build
    gulp.start('clean', () => {
        gulp.start('minify', () => {
            // first stream to copy everything but html, js and scss
            stream.add(gulp.src(_.flatten([
                    gulp.data.get('paths.src.copy'),
                    gulp.data.get('paths.src.ignore.html')
                ]))
                .pipe(gulp.dest(gulp.data.get('paths.dest.base'))));

            // clean dev dir - optional
            stream.add(gulp.src(gulp.data.get('paths.dev.base'))
                .pipe(plugins.clean()));

            // clean empty dir
            stream.on('end', () => {
                return deleteEmpty.sync(gulp.data.get('paths.dest.base'));
            });

            return stream;
        });
    });
});

// 7. Serve
// --------
gulp.task('serve', ['serve:dev']);

gulp.task('serve:dev',['build:dev'], () => {
    browserSync.init({
        server: gulp.data.get('paths.dev.base'),
        open: true
    });

    gulp.watch(gulp.data.get('paths.src.allFiles.js'), ['manage:js'])
    gulp.watch(gulp.data.get('paths.src.allFiles.scss'), ['manage:sass'])
    gulp.watch(gulp.data.get('paths.src.allFiles.html'), () => {
        return gulp.src(gulp.data.get('paths.src.copy'))
            .pipe(gulp.dest(gulp.data.get('paths.dev.base')));
    }).on('change', browserSync.reload);
});

gulp.task('serve:reports', () => {
    // @todo add tests without fail
});

module.exports = gulp;
