const gulp = require('../gulpfile.babel.js');

export default {
    entry: gulp.data.get('paths.src.files.jsEntry'),
    sourceMap: true,
    format: 'es'
};
