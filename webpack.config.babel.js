import path from 'path';
import webpack from 'webpack';
import { PRODUCTION } from './src/utils/env';

const entry = () => (
  PRODUCTION
    ? ['./src/index.js']
    : [
      'webpack/hot/only-dev-server',
      './src/index.js',
    ]
);

const plugins = () => (
  PRODUCTION
    ? [
      new webpack.optimize.OccurenceOrderPlugin(),
      //TODO: Problems with Joi. new webpack.optimize.UglifyJsPlugin(),
    ]
    : [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
    ]
);

const devtool = () => (
  PRODUCTION
    ? 'cheap-module-source-map'
    : 'cheap-module-eval-source-map'
);

const scssLoader = () => (
  PRODUCTION
    ? 'style!css!sass'
    : 'style!css?sourceMap!sass?sourceMap'
);

export default {
  entry: entry(),
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: 'bundle.js',
  },
  devtool: devtool(),
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
        loader: scssLoader(),
      },
    ],
    eslint: {
      configFile: './.eslintrc.json',
    },
  },
  plugins: plugins(),
};
