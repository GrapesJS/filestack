var path = require('path');
var webpack = require('webpack');
var pkg = require('./package.json');
var name = 'grapesjs-plugin-filestack';
var env = process.env.WEBPACK_ENV;
var plugins = [];

if(env !== 'dev'){
  plugins.push(new webpack.optimize.UglifyJsPlugin({ compressor: { warnings: false } }));
  plugins.push(new webpack.BannerPlugin(pkg.name + ' - ' + pkg.version));
}

module.exports = {
  entry: './src/main',
  output: {
      filename: './dist/' + name + '.min.js',
      library: name,
      libraryTarget: 'umd',
  },
  module: {
    preLoaders: [
        { test: /\.json$/, loader: 'json'},
    ],
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        include: /src/,
        query: {
          presets: ['es2015']
        }
      },
    ],
  },
  plugins: plugins
};
