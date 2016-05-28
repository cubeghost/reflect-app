var webpack = require('webpack');
var node_externals = require('webpack-node-externals');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');

module.exports = {
  target: 'node',
  externals: [ node_externals({
      whitelist: ['webpack/hot/dev-server']
    }) ],
  entry: {
    app: ['webpack/hot/dev-server', './src/app.js', './style/style.scss']
  },
  output: {
    path: __dirname + '/build',
    filename: 'bundle.js',
    publicPath: 'http://localhost:8080/build/'
  },
  devServer: {
    contentBase: './build',
    publicPath: 'http://localhost:8080/build/'
  },
  module: {
   loaders: [
      { // js
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: __dirname + '/node_modules/**/*',
        query: {
          presets: ['react']
        }
      },
      { // scss
        test: /\.scss$/,
        loader: 'style-loader!css-loader!postcss-loader!sass-loader'
      }
   ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()//,
    //new ExtractTextPlugin('style.css')
  ],
  postcss: function() {
    return [autoprefixer];
  }
};
