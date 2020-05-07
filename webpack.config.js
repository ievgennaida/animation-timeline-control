/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
let UnminifiedWebpackPlugin = require('unminified-webpack-plugin');

//  devtool: 'inline-source-map',
module.exports = {
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts'],
  },
  output: {
    filename: 'animation-timeline.min.js',
    libraryTarget: 'umd',
    library: 'timelineModule',
    // eslint-disable-next-line no-undef
    path: path.resolve(__dirname, 'lib'),
  },
  plugins: [new UnminifiedWebpackPlugin()],
};
