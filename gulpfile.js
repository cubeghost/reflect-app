var gulp = require('gulp');
var uglify = require('gulp-uglify');
var gutil = require('gulp-util');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var webpack_config = require('./webpack.config.js');
var stream = require('webpack-stream');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

var config = {
  path: {
    js: './src/**/*',
    scss: './style/**/*'
  },
  dest: {
    js: './build/',
    css: './build/'
  }
};

var wds;

// bundle js
gulp.task('webpack', [], function() {
  return gulp.src(config.path.js)
    .pipe(stream(webpack_config))
    //.pipe(uglify())
    .pipe(gulp.dest(config.dest.js));
});

// launch webpack dev server
gulp.task('webpack-dev-server', function(callback) {
  // modify some webpack config options
  var dev_config = Object.create(webpack_config);
  dev_config.devtool = 'eval';
  dev_config.debug = true;

  // start a webpack-dev-server
  wds = new WebpackDevServer(webpack(dev_config), {
    publicPath: dev_config.output.publicPath,
    stats: {
      colors: true
    }
  }).listen(8080, 'localhost', function(err) {
    if (err) throw new gutil.PluginError('webpack-dev-server', err);
    gutil.log(gutil.colors.yellow('[webpack-dev-server]'), gutil.colors.green('reloaded'));
  });
});

// transform scss, autoprefix
gulp.task('css', function(){
  return gulp.src(config.path.scss)
  .pipe(sass({
    errLogToConsole:true
  }).on('error', sass.logError))
  .pipe(autoprefixer())
  .pipe(gulp.dest(config.dest.css))
  .on('end', function() {
    console.log(wds)
    //wds.io.sockets.emit('hot');
    gutil.log(gutil.colors.yellow('[css]'),gutil.colors.green('successfully compiled /style > /build/style.css'));
  });
});

// watch
gulp.task('watch',function() {
  gulp.watch(config.path.js, ['webpack']);
  gulp.watch(config.path.scss, ['css']);
});

gulp.task('dev', ['webpack-dev-server', 'watch']);
