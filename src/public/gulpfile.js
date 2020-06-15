const gulp = require('gulp');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const webpack = require('gulp-webpack');

let files = {
    'jquery': './js/jquery-1.12.4.min.js',
    'jquey-slimscroll': './js/jquery.slimscroll.min.js',
    'enscroll': './js/enscroll.min.js',
    'pixi': './js/pixi.min.js',
    'TcPlayer': './js/TcPlayer-2.2.0.js',
    'webim': './js/webim.js',
    'zepto': './js/zepto.js'
}

for (let key in files) {
    gulp.task(key, function() {
        gulp.src(files[key])
          .pipe(babel({
              presets: ['env']
          }))
          .pipe(uglify())
          .pipe(gulp.dest('../../dist/public/js'));
    })
}

