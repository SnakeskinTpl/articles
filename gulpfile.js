'use strict';

const
	gulp = require('gulp'),
	typograf = require('gulp-typograf'),
	run = require('gulp-run');

gulp.task('yaspeller', () =>
	run('node node_modules/yaspeller/bin/yaspeller ./').exec());

gulp.task('typograf', () => {
	gulp.src('./**/*_ru.md')
		.pipe(typograf({lang: 'ru'}))
		.pipe(gulp.dest('./'));
});

gulp.task('watch', () => gulp.watch('./**/*_ru.md', ['typograf']));
gulp.task('default', ['typograf', 'watch']);
