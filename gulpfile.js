const gulp = require('gulp');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const stripCssComments = require('gulp-strip-css-comments');
const strip = require('gulp-strip-comments');
const uglify = require('gulp-uglify');
const del = require('del');

const cssFiles = [
	'./src/css/bootstrap.min.css',
	'./src/css/font-awesome.min.css',
	'./src/css/owl.carousel.css',
	'./src/css/owl.theme.default.css',
	'./src/css/animate.css',
	'./src/css/main_styles.css',
	'./src/css/responsive.css'
]; 

const jsFiles = [
	'./src/js/jquery.min.js',
	'./src/js/contactform.js',
	'./src/js/jquery.magnific-popup.js',
	'./src/js/jquery.singlePageNav.min.js',
	'./src/js/owl.carousel.js',
	'./src/js/slidebars.js',
	'./src/js/script.js'
]; 

function clean(){
	return del(['dist/*']);
}

function styles(){
	return gulp.src(cssFiles)
		.pipe(concat('all.css'))
/*		.pipe(autoprefixer({
            browsers: ['>0.1%'],
            cascade: false
        }))*/
        .pipe(stripCssComments({
        	preserve: false
        }))
        .pipe(cleanCSS({
        	level: 2
        }))
		.pipe(gulp.dest('./dist/css'))
}

function script(){
	return gulp.src(jsFiles)
		.pipe(concat('all.js'))
		.pipe(strip({
        	safe: true
        }))
        .pipe(uglify({
        	toplevel: true
        }))
		.pipe(gulp.dest('./dist/js'))
}

gulp.task('styles', styles);
gulp.task('script', script);
gulp.task('build', gulp.series(clean,
						gulp.parallel(styles, script)
					));
