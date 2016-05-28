var gulp = require('gulp');
var uglify = require('gulp-uglify');
var gutil = require('gulp-util');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var webpack_config = require('./webpack.config.js');
var stream = require('webpack-stream');

var config = {
  path: {
    js: './src/**/*'
  },
  dest: {
    js: './build/'
  }
}

gulp.task('webpack', [], function() {
  return gulp.src(config.path.js)
    .pipe(stream(webpack_config))
    //.pipe(uglify())
    .pipe(gulp.dest(config.dest.js));
});

gulp.task('webpack-dev-server', function(callback) {
  // modify some webpack config options
  var dev_config = Object.create(webpack_config);
  dev_config.devtool = 'eval';
  dev_config.debug = true;

  // start a webpack-dev-server
  new WebpackDevServer(webpack(dev_config), {
    publicPath: dev_config.output.publicPath,
    stats: {
      colors: true
    }
  }).listen(8080, 'localhost', function(err) {
    if (err) throw new gutil.PluginError('webpack-dev-server', err);
    gutil.log('[webpack-dev-server]', 'http://localhost:8080/webpack-dev-server/index.html');
  });
});

gulp.task('watch', function() {
  gulp.watch(config.path.js, ['webpack']);
});

gulp.task('dev', ['webpack-dev-server', 'watch']);
