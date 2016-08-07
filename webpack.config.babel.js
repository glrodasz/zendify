export default {
  entry: './src/index.js',
  output: {
    filename: 'dist/bundle.js',
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
        loader: 'style!css!sass',
      },
    ],
    eslint: {
      configFile: './.eslintrc.json',
    },
  },
};
