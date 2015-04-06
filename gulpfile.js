var
	gulp = require('gulp'),
	typograf = require('gulp-typograf'),
	run = require('gulp-run');

gulp.task('yaspeller', function () {
	run('node node_modules/yaspeller/bin/yaspeller ./').exec();
});

gulp.task('typograf', function () {
	gulp.src('./**/*_ru.md')
		.pipe(typograf({lang: 'ru'}))
		.pipe(gulp.dest('./'));
});

gulp.task('watch', function () {
	gulp.watch('./**/*_ru.md', ['typograf']);
});

gulp.task('default', ['typograf', 'watch']);
