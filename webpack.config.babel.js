import webpack from 'webpack';

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
  devtool: 'cheap-module-eval-source-map',
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
