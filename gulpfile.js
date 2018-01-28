'use strict';

const
	gulp = require('gulp'),
	$ = require('gulp-load-plugins')();

gulp.task('yaspeller', () => $.run('yaspeller ./ --ignore-uppercase').exec().on('error', console.error));
gulp.task('typograf', () =>
	gulp.src('./*.md')
		.pipe($.plumber())
		.pipe($.markdownIt({options: {highlight: (str, lang) => `<source lang="${lang || 'js'}">${str}</source>`}}))
		.pipe($.replace(/<pre><code\s*.*?>|<\/code><\/pre>/g, ''))
		.pipe($.typograf({locale: 'ru'}))
		.pipe(gulp.dest('./'))
);

gulp.task('default', gulp.parallel(['yaspeller', 'typograf']));
gulp.task('watch', () => gulp.watch('./*.md', gulp.parallel(['yaspeller', 'typograf'])));
