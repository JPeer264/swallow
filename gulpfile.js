'use strict';

// @todo reports get automatically produced by linting:
// 1. linting should fail for CI
// 2. linting should not fail for reports

const _       = require('lodash');
const gulp    = require('gulp');
const grunt   = require('grunt');
const merge   = require('merge-stream');
const paths   = require('./config/paths.json');
const plugins = require('gulp-load-plugins')();
const deleteEmpty = require('delete-empty');
const browserSync = require('browser-sync').create();

gulp.util   = require('gulp-util');
gulp.util._ = _;
gulp.data   = grunt.config;
gulp.data.init(paths);

const getTask = (mainTask, subTask) => {
    const task = require('./config/gulp/' + mainTask)({gulp, plugins, paths});

    return task[subTask];
};

gulp.task('default', ['build:prod']);

gulp.task('clean', () => {
    return gulp.src(_.flatten([
            gulp.data.get('paths.dev.base'),
            gulp.data.get('paths.dest.base'),
            './coverage'
        ]))
        .pipe(plugins.clean());
});

// managing
gulp.task('manage', ['manage:sass', 'manage:js:vendor', 'manage:js']);
gulp.task('manage:js', getTask('manage', 'js:own'));
gulp.task('manage:js:vendor', getTask('manage', 'js:vendor'));
gulp.task('manage:sass', ['manage:sass:browser'], getTask('manage', 'sass'));
gulp.task('manage:sass:browser', getTask('manage', 'sass:browser'));

// linting
gulp.task('lint', ['lint:js', 'lint:scss', 'lint:html']);
gulp.task('lint:fail', ['lint:js:fail', 'lint:scss:fail', 'lint:html:fail']);
gulp.task('lint:js', getTask('lint', 'js'));
gulp.task('lint:js:fail', getTask('lint', 'js:fail'));
gulp.task('lint:scss', getTask('lint', 'scss'));
gulp.task('lint:scss:fail', getTask('lint', 'scss:fail'));
gulp.task('lint:html', getTask('lint', 'html'));
gulp.task('lint:html:fail', getTask('lint', 'html:fail'));

// minifying
gulp.task('minify', ['minify:css', 'minify:js', 'minify:html']);
gulp.task('minify:js', ['manage:js', 'minify:css'], getTask('minify', 'js'));
gulp.task('minify:css', ['manage:sass'], getTask('minify', 'css'));
gulp.task('minify:html', ['minify:css'], getTask('minify', 'html'));

// test
gulp.task('test', ['manage:js:vendor'], getTask('test', 'all'));

// reports
gulp.task('reports', ['reports:test', 'reports:lint']);
gulp.task('reports:test', getTask('test', 'reports'));
gulp.task('reports:lint', getTask('lint', 'reports'));

// build
gulp.task('build', ['build:prod']);

gulp.task('build:dev', ['manage'], () => {
    const stream = gulp.src(gulp.data.get('paths.src.copy'))
        .pipe(gulp.dest(gulp.data.get('paths.dev.base')));

    stream.on('end', () => {
        return deleteEmpty.sync(gulp.data.get('paths.dev.base'))
    });

    return stream;
});

gulp.task('build:prod', ['minify'], () => {
    let stream = merge();

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

// serve
gulp.task('serve', ['serve:dev']);

gulp.task('serve:dev', ['build:dev'], () => {
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
