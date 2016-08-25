import path from 'path';
import webpack from 'webpack';
import dotenv from 'dotenv';
import { CLIENT_PORT, SERVER_PORT } from './src/common/config/port';
import PRODUCTION from './src/common/utils/production';

// First we are trying to load the env variables with dontenv.
try { dotenv.load(); } catch (error) { console.error(error); } // eslint-disable-line

const entry = () => (
  PRODUCTION
    ? [
      './src/common/index.js',
      './client/index.js',
    ]
    : [
      'webpack/hot/only-dev-server',
      './src/common/index.js',
      './client/index.js',
    ]
);

const plugins = () => (
  PRODUCTION
    ? [
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"production"',
        __AUTH0_CLIENT_ID__: JSON.stringify(process.env.AUTH0_CLIENT_ID),
        __AUTH0_DOMAIN__: JSON.stringify(process.env.AUTH0_DOMAIN),
      }),
    ]
    : [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
      new webpack.DefinePlugin({
        __AUTH0_CLIENT_ID__: JSON.stringify(process.env.AUTH0_CLIENT_ID),
        __AUTH0_DOMAIN__: JSON.stringify(process.env.AUTH0_DOMAIN),
      }),
    ]
);

const devtool = () => (
  PRODUCTION
    ? 'cheap-module-source-map'
    : 'cheap-module-eval-source-map'
);

const jsExclude = () => (
  PRODUCTION
    ? [
      /joi-browser/,
      /react-display-name/,
      /moment/,
      /crypto/,
      /auth0-lock/,
      /immutable/,
      /underscore/,
    ]
    : /node_modules/
);


export default {
  entry: entry(),
  output: {
    path: path.join(__dirname, 'public'),
    publicPath: `http://0.0.0.0:${CLIENT_PORT}/public/`,
    filename: 'bundle.js',
  },
  devtool: devtool(),
  devServer: {
    port: CLIENT_PORT,
    hot: true,
    inline: true,
    proxy: {
      '*': `http://localhost:${SERVER_PORT}`,
    },
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
        exclude: jsExclude(),
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
  plugins: plugins(),
};
