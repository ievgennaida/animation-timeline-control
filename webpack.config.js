/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const webpack = require('webpack'); //to access built-in plugins

const sourceMapPlugin = new webpack.SourceMapDevToolPlugin({
  filename: 'sourcemaps/[file].map',
  fileContext: 'public',
});
//  devtool: 'inline-source-map',
module.exports = [
  {
    mode: 'production',
    name: 'minimized-prod',
    entry: {
      'animation-timeline': './src/animation-timeline.ts',
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'babel-loader',
          exclude: [/node_modules/, /lib/],
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts'],
    },
    output: {
      filename: '[name].min.js',
      libraryTarget: 'umd',
      library: 'timelineModule',
      // eslint-disable-next-line no-undef
      path: path.resolve(__dirname, 'lib'),
    },
  },
  {
    // Development unminimized file
    mode: 'production',
    name: 'unminimized',
    entry: {
      'animation-timeline': './src/animation-timeline.ts',
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'babel-loader',
          exclude: [/node_modules/, /lib/],
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts'],
    },
    optimization: {
      minimize: false,
    },
    output: {
      filename: '[name].js',
      libraryTarget: 'umd',
      library: 'timelineModule',
      // eslint-disable-next-line no-undef
      path: path.resolve(__dirname, 'lib'),
    },
    // Add source maps for the dev instance
    plugins: [sourceMapPlugin],
  },
];
