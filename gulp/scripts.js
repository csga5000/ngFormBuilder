var livereload = require('gulp-livereload');

module.exports = function(gulp, plugins, bundle) {
  return function() {
    bundle = bundle || plugins.browserify({
      entries: './src/ngFormBuilder-full.js',
      debug: false,
      standalone: 'formio-builder'
    });

    return bundle
      .bundle()
      .pipe(plugins.source('ngFormBuilder-full.js'))
      .pipe(plugins.replace('<%=version%>', plugins.packageJson.version))
      .pipe(plugins.derequire())
      .pipe(gulp.dest('dist/'))
      .pipe(plugins.rename('ngFormBuilder-full.min.js'))
      .pipe(plugins.streamify(plugins.uglify({preserveComments: 'license'})))
      .pipe(gulp.dest('dist/'))
      .pipe(livereload())
      .on('error', function(err) {
        console.log(err);
        this.emit('end');
      });
  };
};
