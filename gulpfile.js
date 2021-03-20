const gulp = require('gulp')
const browserSync  = require('browser-sync')
const autoprefixer = require('gulp-autoprefixer')
const cleanCSS = require('gulp-clean-css')
const concat = require('gulp-concat')
const cssimport = require("gulp-cssimport")
const stripCssComments = require('gulp-strip-css-comments')
const strip = require('gulp-strip-comments')
const uglify = require('gulp-uglify')
const del = require('del')
const jsImport = require('gulp-js-import')


/*** begin CREATE LIBS MIN ***/
function styles(){
	return gulp.src('./src/libs.css')
        .pipe(cssimport())
        .pipe(concat('libs.css'))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 5 versions'],
            cascade: false
        }))
        .pipe(stripCssComments({
        	preserve: false
        }))
        .pipe(cleanCSS({
        	level: 2
        }))
		.pipe(gulp.dest('./css/'))
}

function script(){
	return gulp.src('./src/libs.js')
        .pipe(jsImport())
        .pipe(concat('libs.js'))
		.pipe(strip({
        	safe: true
        }))
        .pipe(uglify({
        	toplevel: true
        }))
		.pipe(gulp.dest('./js/'))
}

gulp.task('styles', styles)
gulp.task('script', script)
gulp.task('libs', gulp.parallel('styles', 'script'))
/*** end CREATE LIBS MIN  ***/                    


/*** begin DEPLOY ALL SCRIPTS ***/

/* deploy css */
function deployStyles(){
	return gulp.src('./src/all.css')
        .pipe(cssimport())
        .pipe(concat('all.min.css'))
 		.pipe(autoprefixer({
            overrideBrowserslist: ['last 5 versions'],
            cascade: false
        }))
        .pipe(stripCssComments({
        	preserve: false
        }))
        .pipe(cleanCSS({
        	level: 2
        }))
		.pipe(gulp.dest('./css'))
}

/* deploy js */
function deployJS(){
	return gulp.src('./src/all.js')
        .pipe(jsImport())
        .pipe(concat('all.min.js'))
		.pipe(strip({
        	safe: true
        }))
        .pipe(uglify({
        	toplevel: true
        }))
		.pipe(gulp.dest('./js'))
}

gulp.task('deployStyles', deployStyles)
gulp.task('deployJS', deployJS)
gulp.task('deploy', gulp.parallel('deployStyles', 'deployJS'))

/*** end DEPLOY ALL SCRIPTS ***/


/* DEFAULT TASKS */

function clean(){
	return del(['src/*']);
}

gulp.task('browser-sync', function() {
    browserSync.init({
        proxy: "site.com",
        notify: false
    })
});

gulp.task('html', function() {
    return gulp.src('./*.html')
        .pipe(browserSync.reload({ stream: true }))
});

gulp.task('css', function() { 
    return gulp.src('./src/css/*.css')
        .pipe(browserSync.reload({stream: true})) 
});

gulp.task('js', function() {
	return gulp.src('./src/custom.js')
        .pipe(jsImport())
        .pipe(concat('custom.js'))
        .pipe(gulp.dest('./js'))
        .pipe(browserSync.reload({ stream: true }))
});

gulp.task('php', function() {
	return gulp.src('./app/**/*.php')
	    .pipe(browserSync.reload({ stream: true }))
});

gulp.task('watch', function() {
    gulp.watch('./src/css/*.css', gulp.parallel('css'));
    gulp.watch('./src/js/**/*.js', gulp.parallel('js'));
    gulp.watch('./*.html', gulp.parallel('html'));
    gulp.watch('./app/**/*.php', gulp.parallel('php'));
});

gulp.task('default', gulp.parallel('html', 'css', 'js', 'php', 'browser-sync', 'watch'))            
/* END DEFAULT TASK */
