'use strict';

const
	gulp = require('gulp'),
	typograf = require('gulp-typograf'),
	markdown = require('gulp-markdown-it'),
	replace = require('gulp-replace'),
	run = require('gulp-run');

function error() {
	return (err) => {
		console.error(err.message);
	};
}

gulp.task('yaspeller', (cb) => {
	run('yaspeller ./').exec()
		.on('error', error())
		.on('finish', cb);
});

gulp.task('typograf', (cb) => {
	gulp.src('./*.md')
		.pipe(markdown({options: {highlight: (str, lang) => `<source lang="${lang || 'js'}">${str}</source>`}}))
		.on('error', error())
		.pipe(replace(/<pre><code\s*.*?>|<\/code><\/pre>/g, ''))
		.pipe(typograf({lang: 'ru'}))
		.on('error', error())
		.pipe(gulp.dest('./'))
		.on('end', cb);
});

gulp.task('watch', () => gulp.watch('./*.md', ['yaspeller', 'typograf']));
gulp.task('default', ['yaspeller', 'typograf', 'watch']);
