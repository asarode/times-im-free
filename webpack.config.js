var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: [
    './src'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      exclude: /node_modules/,
      include: path.join(__dirname, 'src')
    }]
  },
  resolve: {
    modulesDirectories: ['node_modules'],
    extenstions: ['', '.js', '.jsx']
  }
}
