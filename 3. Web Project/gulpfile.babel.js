'use strict';

import gulp from 'gulp';

import plumber from 'gulp-plumber';
import livereload from 'gulp-livereload';

import concat from 'gulp-concat';
import sass from 'gulp-sass';

import babelify from 'babelify';
import bro from 'gulp-bro';
import uglifyify from 'uglifyify';




const rootPath = 'web/';
const assetsPath = rootPath + 'assets/';

const paths = {
    watch: {
        js: [
            'src/js/**/*.js',
            '!src/js/copy/*'
        ],
        sass: [
            'src/scss/**/*.scss'
        ]
    },
    copy: {
        html: [
            'src/html/**/*'
        ],
        js: [
            'src/js/copy/**/*'
        ],
        config: [
            '../config.xml',
            'src/config.xml'
        ]
    }
};

function onError(error) {
    console.log(error.toString());
    this.emit('end');
}

gulp.task('build-js', function () {
    return gulp.src('./src/js/index.js')
        .pipe(bro({
            transform: [
                babelify.configure({ presets: ['es2015'] })/*,
                [ 'uglifyify', { global: true } ]*/
            ]
        }))
        .pipe(plumber())
        .pipe(concat('app.js'))
        .pipe(gulp.dest(assetsPath + 'js/'))
    ;
});


gulp.task('build-css', function() {
    return gulp.src(paths.watch.sass)
        .pipe(plumber())
        .pipe(sass())
        .pipe(concat('style.css'))
        .pipe(gulp.dest(assetsPath + 'css/'))
    ;
});

gulp.task('copy-html', function () {
    return gulp.src(paths.copy.html)
        .pipe(gulp.dest(rootPath));
});

gulp.task('copy-js', function () {
    return gulp.src(paths.copy.js)
        .pipe(gulp.dest(assetsPath + 'js/'));
});

gulp.task('copy-config', function () {
    return gulp.src(paths.copy.config)
        .pipe(gulp.dest(rootPath));
});



gulp.task('files-watch', function() {
    livereload.listen();

    gulp.watch(paths.watch.js, ['build-js']);
    gulp.watch(paths.watch.sass, ['build-css']);
    gulp.watch(paths.copy.html, ['copy-html']);
    gulp.watch(paths.copy.config, ['copy-config']);
});

gulp.task('default', ['copy', 'build-js', 'build-css']);
gulp.task('copy', ['copy-html', 'copy-js', 'copy-config']);
gulp.task('watch', ['default', 'files-watch']);
gulp.task('build', ['default']);