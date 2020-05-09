/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const UnminifiedWebpackPlugin = require('unminified-webpack-plugin');

//  devtool: 'inline-source-map',
module.exports = {
  mode: 'production',
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
  plugins: [new UnminifiedWebpackPlugin()],
};
