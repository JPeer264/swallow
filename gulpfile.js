'use strict';

const _       = require('lodash');
const gulp    = require('gulp');
const grunt   = require('grunt');
const paths   = require('./config/paths.json');
const plugins = require('gulp-load-plugins')();
const deleteEmpty = require('delete-empty');

gulp.util   = require('gulp-util');
gulp.util._ = _;
gulp.data   = grunt.config;
gulp.data.init(paths);

function getTask(mainTask, subTask) {
    const task = require('./config/gulp/' + mainTask)({gulp, plugins, paths});

    return task[subTask];
}

gulp.task('default', ['build:prod']);

gulp.task('clean', () => {
    return gulp.src(_.flatten([
            gulp.data.get('paths.dev.base'),
            gulp.data.get('paths.dest.base'),
            './coverage'
        ]))
        .pipe(plugins.clean())
});

// managing
gulp.task('manage', ['manage:sass', 'manage:js:vendor', 'manage:js']);
gulp.task('manage:js', getTask('manage', 'js:own'));
gulp.task('manage:js:vendor', getTask('manage', 'js:vendor'));
gulp.task('manage:sass', ['manage:sass:browser'], getTask('manage', 'sass'));
gulp.task('manage:sass:browser', getTask('manage', 'sass:browser'));

// linting
gulp.task('lint', ['lint:js', 'lint:scss', 'lint:html']);
gulp.task('lint:js', getTask('lint', 'js'));
gulp.task('lint:scss', getTask('lint', 'scss'));
gulp.task('lint:html', getTask('lint', 'html'));

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
        return deleteEmpty.sync('dev/')
    });

    return stream;
});
gulp.task('build:prod', ['minify'], () => {
    // rcs, minify, copy:prod, cdnify:prod, clean:dev
});

// serve
// @todo