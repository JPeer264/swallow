'use strict';

const gulp    = require('gulp');
const plugins = require('gulp-load-plugins')();
const directories = {
    src: 'src',
    assets: 'assets',
    dest: 'dist',
    dev: 'dev',
    cache: '.cache'
};

gulp.util = require('gulp-util');

function getTask(mainTask, subTask) {
    const task = require('./config/gulp/' + mainTask)({gulp, plugins, directories});

    return task[subTask];
}

let taskName = 'default';

// managing
gulp.task('manage', ['manage:sass', 'manage:js']);
gulp.task('manage:js', getTask('manage', 'js'));
gulp.task('manage:sass', getTask('manage', 'sass'));

// linting
// @todo check which looks better
gulp.task('lint', ['lint:js', 'lint:css', 'lint:html']);
gulp.task('lint:js',   getTask('lint', 'js'));
gulp.task('lint:css',  getTask('lint', 'css'));
gulp.task('lint:html', getTask('lint', 'html'));

// minifying
gulp.task('minify', ['minify:css', 'minify:js']);
gulp.task('minify:js', getTask('minify', 'js'));
gulp.task('minify:css', getTask('minify', 'css'));

// test
gulp.task('test', getTask('test', 'all'));

// reports
gulp.task('reports', ['reports:test', 'reports:lint']);
gulp.task('reports:test', getTask('test', 'reports'));
gulp.task('reports:lint', getTask('lint', 'reports'));

// build
gulp.task('build', ['build:prod']);
gulp.task('build:dev', ['manage'], () => {
    // copy:dev and copy:src (sourcemaps)
});
gulp.task('build:prod', ['build:dev'], () => {
    // rcs, minify, copy:prod, cdnify:prod, clean:dev
});

// serve
// @todo