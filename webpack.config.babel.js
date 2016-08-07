/* eslint-disable */
import webpack from 'webpack';

export default {
  entry: [
    'webpack/hot/only-dev-server',
    './src/index.js',
  ],
  output: {
    path: './dist',
    publicPath: '/dist/',
    filename: 'bundle.js',
  },
  devServer: {
    port: 3000,
    hot: true,
    inline: true,
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
        loader: 'babel',
        query: {
          presets: ['react', 'es2015', 'stage-0'],
        },
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loader: 'style!css?sourceMap!sass',
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
