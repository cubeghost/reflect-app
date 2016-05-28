var webpack = require('webpack');
var node_externals = require('webpack-node-externals');

module.exports = {
  target: 'node',
  externals: [ node_externals({
      whitelist: ['webpack/hot/dev-server']
    }) ],
  entry: {
    app: ['webpack/hot/dev-server', './src/app.js']
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
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: __dirname + '/node_modules/**/*',
        query: {
          presets: ['react']
        }
      }
   ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};
