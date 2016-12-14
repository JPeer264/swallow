'use strict';

const _       = require('lodash');
const gulp    = require('gulp');
const grunt   = require('grunt');
const plugins = require('gulp-load-plugins')();
const directories = {
    src: 'src',
    assets: 'assets',
    dest: 'dist',
    dev: 'dev',
    cache: '.cache'
};

const paths = {
        names: directories,
        paths: {
            base: ".",
            cache: {
                base: "<%=  paths.base      %>/<%= names.cache %>",
                tests: "<%= paths.cache.base  %>/**/*.spec.js",
                folder: {
                    assets: {
                        base: "<%=  paths.cache.base               %>/<%= names.assets %>",
                        js: "<%=    paths.cache.folder.assets.base %>/js",
                        jss: "<%=   paths.cache.folder.assets.js   %>/**",
                        scss: "<%=  paths.cache.folder.assets.base %>/scss",
                        scsss: "<%= paths.cache.folder.assets.scss %>/**",
                        css: "<%=   paths.cache.folder.assets.base %>/css",
                        csss: "<%=  paths.cache.folder.assets.css  %>/**",
                        img: "<%=   paths.cache.folder.assets.base %>/img",
                        imgs: "<%=  paths.cache.folder.assets.img  %>/**",
                        svg: "<%=   paths.cache.folder.assets.base %>/svg",
                        svgs: "<%=  paths.cache.folder.assets.svg  %>/**",
                        json: "<%=  paths.cache.folder.assets.base %>/json",
                        jsons: "<%= paths.cache.folder.assets.json %>/**"
                    }
                },
                ignore: {
                    modules: [
                        "!<%= paths.cache.base %>/**/node_modules/**/*.js",
                        "!<%= paths.cache.base %>/**/node_modules/**/*.css",
                        "!<%= paths.cache.base %>/**/node_modules/**/*.html"
                    ],
                    tests: [
                        "!<%= paths.cache.tests %>"
                    ],
                    _js: [
                        "!<%=   paths.cache.base   %>/**/_*.js"
                    ],
                    couldBeVendor: [
                        "!<%= paths.cache.base %>/**/*.min.js",
                        "!<%= paths.cache.base %>/**/*jquery*.js",
                        "!<%= paths.cache.base %>/**/*angular*.js",
                        "!<%= paths.cache.base %>/**/*ember*.js",
                        "!<%= paths.cache.base %>/**/*bootstrap*.js",
                        "!<%= paths.cache.base %>/**/*.min.css",
                        "!<%= paths.cache.base %>/**/*bootstrap*.css"
                    ],
                    _scss: "!<%= paths.cache.base %>/**/_*.scss",
                    _css: "!<%= paths.cache.base %>/**/_*.css",
                    _html: "!<%= paths.cache.base %>/**/_*.html",
                    assets: [
                        "!<%= paths.cache.files.assets.js",
                        "!<%= paths.cache.files.assets.css",
                        "!<%= paths.cache.files.assets.scss",
                        "!<%= paths.cache.files.assets.img",
                        "!<%= paths.cache.files.assets.svg",
                        "!<%= paths.cache.files.assets.json"
                    ],
                    min: [
                        "!<%= paths.cache.base %>/**/*.min.*"
                    ]
                },
                allFiles: {
                    js: "<%=   paths.cache.base %>/**/*.js",
                    scss: "<%= paths.cache.base %>/**/*.scss",
                    css: "<%=  paths.cache.base %>/**/*.css",
                    html: "<%= paths.cache.base %>/**/*.html",
                    img: "<%=  paths.cache.base %>/**/*.img",
                    svg: "<%=  paths.cache.base %>/**/*.svg",
                    json: "<%= paths.cache.base %>/**/*.json"
                },
                files: {
                    js: [
                        "<%= paths.cache.allFiles.js %>",
                        "<%= paths.cache.ignore._js %>",
                        "<%= paths.cache.ignore.tests %>"
                    ],
                    scss: [
                        "<%= paths.cache.allFiles.scss %>",
                        "<%= paths.cache.ignore._scss %>"
                    ],
                    css: [
                        "<%= paths.cache.allFiles.css %>",
                        "<%= paths.cache.ignore._css %>"
                    ],
                    html: [
                        "<%= paths.cache.allFiles.html %>",
                        "<%= paths.cache.ignore._scss %>"
                    ],
                    assets: {
                        js: [
                            "<%= paths.cache.folder.assets.jss %>/*.class.js",
                            "<%= paths.cache.folder.assets.jss %>/*.js",
                            "<%= paths.cache.folder.assets.jss %>/*.init.js",
                            "<%= paths.cache.ignore._js %>",
                            "<%= paths.cache.ignore.tests %>"
                        ],
                        scss: [
                            "<%= paths.cache.folder.assets.scss %>/*.scss",
                            "<%= paths.cache.ignore._scss %>",
                            "<%= paths.cache.folder.assets.css %>/*.css",
                            "<%= paths.cache.ignore._css %>"
                        ],
                        oldBrowserScss: [
                            "<%= pahts.cache.folder.assets.scss %>/**/*.scss",
                            "!<%= pahts.cache.folder.assets.scss %>/*.scss"
                        ],
                        img: "<%=  paths.cache.folder.assets.imgs %>/*.img",
                        svg: "<%=  paths.cache.folder.assets.svgs %>/*.svg",
                        json: "<%= paths.cache.folder.assets.jsons %>/*.json"
                    },
                    couldBeVendor: {
                        js: [
                            "<%= paths.cache.base %>/**/*.min.js",
                            "<%= paths.cache.base %>/**/*jquery*.js",
                            "<%= paths.cache.base %>/**/*angular*.js",
                            "<%= paths.cache.base %>/**/*ember*.js",
                            "<%= paths.cache.base %>/**/*bootstrap*.js"
                        ],
                        css: [
                            "<%= paths.cache.base %>/**/*.min.css",
                            "<%= paths.cache.base %>/**/*bootstrap*.css"
                        ]
                    }
                }
            },
            dev: {
                base: "<%= paths.base %>/<%= names.dev %>",
                folder: {
                    assets: {
                        base: "<%=   paths.dev.base %>/<%= names.assets %>",
                        js: "<%=     paths.dev.folder.assets.base %>/js",
                        jss: "<%=    paths.dev.folder.assets.js %>/**",
                        css: "<%=    paths.dev.folder.assets.base %>/css",
                        csss: "<%=   paths.dev.folder.assets.css %>/**",
                        styles: "<%= paths.dev.folder.assets.css %>/global.css"
                    },
                    tests: {
                        base: "<%= paths.dev.base %>/tests",
                        js: "<%=   paths.dev.folder.tests.base   %>/js",
                        instrumented: "<%=   paths.dev.folder.tests.base   %>/instrumented",
                        css: "<%=  paths.dev.folder.tests.base   %>/css"
                    },
                    docs: {
                        base: "<%= paths.dev.base %>/docs"
                    }
                },
                files: {
                    css: "<%= paths.dev.folder.assets.csss %>/*.css",
                    instrumented: [
                        "<%=   paths.dev.folder.tests.instrumented   %>/**/*.class.js",
                        "<%=   paths.dev.folder.tests.instrumented   %>/**/*.js",
                        "!<%=   paths.dev.folder.tests.instrumented   %>/**/*_.js"
                    ]
                }
            },
            vendor: {
                base: "<%= paths.base %>/vendor",
                css: [
                    "<%= paths.vendor.base %>/**/*.css"
                ],
                js: [
                    "<%= paths.vendor.base %>/**/*.js"
                ],
                min: {
                    js: "<%=  paths.vendor.base %>/**/*.min.js",
                    css: "<%= paths.vendor.base %>/**/*.min.css"
                }
            },
            src: {
                base: "<%=  paths.base      %>/<%= names.src %>",
                tests: "<%= paths.src.base  %>/**/*.spec.js",
                folder: {
                    assets: {
                        base: "<%=  paths.src.base               %>/<%= names.assets %>",
                        js: "<%=    paths.src.folder.assets.base %>/js",
                        jss: "<%=   paths.src.folder.assets.js   %>/**",
                        scss: "<%=  paths.src.folder.assets.base %>/scss",
                        scsss: "<%= paths.src.folder.assets.scss %>/**",
                        css: "<%=   paths.src.folder.assets.base %>/css",
                        csss: "<%=  paths.src.folder.assets.css  %>/**",
                        img: "<%=   paths.src.folder.assets.base %>/img",
                        imgs: "<%=  paths.src.folder.assets.img  %>/**",
                        svg: "<%=   paths.src.folder.assets.base %>/svg",
                        svgs: "<%=  paths.src.folder.assets.svg  %>/**",
                        json: "<%=  paths.src.folder.assets.base %>/json",
                        jsons: "<%= paths.src.folder.assets.json %>/**"
                    }
                },
                ignore: {
                    modules: [
                        "!<%= paths.src.base %>/**/node_modules/**/*.js",
                        "!<%= paths.src.base %>/**/node_modules/**/*.css",
                        "!<%= paths.src.base %>/**/node_modules/**/*.html"
                    ],
                    tests: [
                        "!<%= paths.src.tests %>"
                    ],
                    browser_scss: "!<%= paths.src.folder.assets.scss %>/browser.*/**/*.scss",
                    _js: [
                        "!<%=   paths.src.base   %>/**/_*.js"
                    ],
                    couldBeVendor: [
                        "!<%= paths.src.base %>/**/*.min.js",
                        "!<%= paths.src.base %>/**/*jquery*.js",
                        "!<%= paths.src.base %>/**/*angular*.js",
                        "!<%= paths.src.base %>/**/*ember*.js",
                        "!<%= paths.src.base %>/**/*bootstrap*.js",
                        "!<%= paths.src.base %>/**/*.min.css",
                        "!<%= paths.src.base %>/**/*bootstrap*.css"
                    ],
                    _scss: "!<%= paths.src.base %>/**/_*.scss",
                    _css: "!<%= paths.src.base %>/**/_*.css",
                    _html: "!<%= paths.src.base %>/**/_*.html",
                    assets: [
                        "!<%= paths.src.files.assets.js",
                        "!<%= paths.src.files.assets.css",
                        "!<%= paths.src.files.assets.scss",
                        "!<%= paths.src.files.assets.img",
                        "!<%= paths.src.files.assets.svg",
                        "!<%= paths.src.files.assets.json"
                    ],
                    min: [
                        "!<%= paths.src.base %>/**/*.min.*"
                    ]
                },
                allFiles: {
                    js: "<%=   paths.src.base %>/**/*.js",
                    scss: "<%= paths.src.base %>/**/*.scss",
                    css: "<%=  paths.src.base %>/**/*.css",
                    html: "<%= paths.src.base %>/**/*.html",
                    img: "<%=  paths.src.base %>/**/*.img",
                    svg: "<%=  paths.src.base %>/**/*.svg",
                    json: "<%= paths.src.base %>/**/*.json"
                },
                files: {
                    js: [
                        "<%= paths.src.allFiles.js %>",
                        "<%= paths.src.ignore._js %>",
                        "<%= paths.src.ignore.tests %>"
                    ],
                    scss: [
                        "<%= paths.src.allFiles.scss %>",
                        "<%= paths.src.ignore.browser_scss %>",
                        "<%= paths.src.ignore._scss %>"
                    ],
                    css: [
                        "<%= paths.src.allFiles.css %>",
                        "<%= paths.src.ignore._css %>"
                    ],
                    html: [
                        "<%= paths.src.allFiles.html %>",
                        "<%= paths.src.ignore._scss %>"
                    ],
                    assets: {
                        js: [
                            "<%= paths.src.folder.assets.jss %>/*.class.js",
                            "<%= paths.src.folder.assets.jss %>/*.js",
                            "<%= paths.src.folder.assets.jss %>/*.init.js",
                            "<%= paths.src.ignore._js %>",
                            "<%= paths.src.ignore.tests %>"
                        ],
                        scss: [
                            "<%= paths.src.folder.assets.scss %>/*.scss",
                            "<%= paths.src.ignore._scss %>",
                            "<%= paths.src.folder.assets.css %>/*.css",
                            "<%= paths.src.ignore._css %>"
                        ],
                        oldBrowserScss: [
                            "<%= pahts.src.folder.assets.scss %>/**/*.scss",
                            "!<%= pahts.src.folder.assets.scss %>/*.scss"
                        ],
                        img: "<%=  paths.src.folder.assets.imgs %>/*.img",
                        svg: "<%=  paths.src.folder.assets.svgs %>/*.svg",
                        json: "<%= paths.src.folder.assets.jsons %>/*.json"
                    },
                    couldBeVendor: {
                        js: [
                            "<%= paths.src.base %>/**/*.min.js",
                            "<%= paths.src.base %>/**/*jquery*.js",
                            "<%= paths.src.base %>/**/*angular*.js",
                            "<%= paths.src.base %>/**/*ember*.js",
                            "<%= paths.src.base %>/**/*bootstrap*.js"
                        ],
                        css: [
                            "<%= paths.src.base %>/**/*.min.css",
                            "<%= paths.src.base %>/**/*bootstrap*.css"
                        ]
                    }
                }
            },
            dest: {
                base: "<%=  paths.base %>/<%= names.dest %>",
                folder: {
                    html: "<%= paths.dest.base %>/html",
                    htmls: "<%= paths.dest.folder.html %>/**",
                    assets: {
                        base: "<%=  paths.dest.base %>/<%= names.assets %>",
                        js: "<%=    paths.dest.folder.assets.base %>/js",
                        jss: "<%=   paths.dest.folder.assets.base %>/**",
                        css: "<%=   paths.dest.folder.assets.base %>/css",
                        csss: "<%=  paths.dest.folder.assets.base %>/**",
                        html: "<%=  paths.dest.folder.assets.base %>/html",
                        htmls: "<%= paths.dest.folder.assets.base %>/**",
                        img: "<%=   paths.dest.folder.assets.base %>/img",
                        imgs: "<%=  paths.dest.folder.assets.base %>/**",
                        svg: "<%=   paths.dest.folder.assets.base %>/svg",
                        svgs: "<%=  paths.dest.folder.assets.base %>/**",
                        json: "<%=  paths.dest.folder.assets.base %>/json",
                        jsons: "<%= paths.dest.folder.assets.base %>/**"
                    }
                },
                allFiles: {
                    js: "<%=     paths.dest.folder.assets.jss   %>/*.js",
                    css: "<%=    paths.dest.folder.assets.csss  %>/*.css",
                    mincss: "<%= paths.dest.folder.assets.csss  %>/*.min.css",
                    html: "<%=   paths.dest.folder.assets.htmls %>/*.html",
                    img: "<%=   paths.dest.folder.assets.imgs  %>/*.img",
                    svg: "<%=   paths.dest.folder.assets.svgs  %>/*.svg",
                    json: "<%=   paths.dest.folder.assets.jsons %>/*.json"
                }
            },
            reports: {
                base: "<%= paths.dev.base     %>/reports",
                coverage: "<%= paths.reports.base %>/coverage",
                checkstyle: "<%= paths.reports.base %>/checkstyle.xml",
                pmd: "<%=        paths.reports.base %>/pmd.xml",
                html: "<%= paths.reports.base %>/.html-status.json",
                html2: "<%= paths.reports.base %>/app.json",
                csslint: "",
                js: ""
            },
            config: "<%= paths.base %>/config"
        }
    };

gulp.util         = require('gulp-util');
gulp.util._       = _;
gulp.gconfig      = grunt.config;
gulp.gconfig.init(paths);

function getTask(mainTask, subTask) {
    const task = require('./config/gulp/' + mainTask)({gulp, plugins, paths});

    return task[subTask];
}

let taskName = 'default';

// managing
gulp.task('manage', ['manage:sass', 'manage:js:vendor', 'manage:js']);
gulp.task('manage:js', getTask('manage', 'js:own'));
gulp.task('manage:js:vendor', getTask('manage', 'js:vendor'));
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