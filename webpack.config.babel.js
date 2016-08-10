import webpack from 'webpack';
import { PRODUCTION } from './src/utils/env';

export default {
  entry: [
    'webpack/hot/only-dev-server',
    './src/index.js',
  ],
  output: {
    path: './dist',
    publicPath: '/static/',
    filename: 'bundle.js',
  },
  devtool: PRODUCTION
    ? 'cheap-module-source-map'
    : 'cheap-module-eval-source-map',
  devServer: {
    port: 3000,
    hot: true,
    inline: true,
  },
  resolve: {
    packageAlias: 'browser',
  },
  node: {
    net: 'empty',
    tls: 'empty',
    dns: 'empty',
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint',
      },
    ],
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'react-hot!babel',
      },
      {
        test: /\.scss$/,
        loader: 'style!css?sourceMap!sass?sourceMap',
      },
    ],
    eslint: {
      configFile: './.eslintrc.json',
    },
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
};
