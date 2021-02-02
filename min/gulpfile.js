var gulp         = require('gulp'),
    browserSync  = require('browser-sync');

gulp.task('browser-sync', function() {
    browserSync({ 
        server: { 
            baseDir: './' 
        },
        notify: false
    });
});

gulp.task('css', function() { 
	return gulp.src('./*.css')
		.pipe(browserSync.reload({stream: true})) 
});

gulp.task('code', function() {
	return gulp.src('./*.html')
	.pipe(browserSync.reload({ stream: true }))
});

gulp.task('watch', function() {
	gulp.watch('./*.css', gulp.parallel('css'));
    gulp.watch('./*.html', gulp.parallel('code'));
});

gulp.task('default', gulp.parallel('css', 'code', 'browser-sync', 'watch'));

 