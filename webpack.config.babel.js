export default {
  entry: './app/index.js',
  output: {
    filename: 'public/bundle.js'
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint',
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015', 'stage-0']
        }
      },
      {
        test: /\.scss$/,
        loader: 'style!css!sass'
      }
    ],
    eslint: {
      configFile: './.eslintrc.json',
      emitWarning: true
    }
  }
}
