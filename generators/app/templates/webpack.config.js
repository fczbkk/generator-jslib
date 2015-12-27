module.exports = {

  entry: './src/index.js',

  output: {
    path: './temp/lib/',
    filename: 'index.js',
    library: 'MyLib',
    libraryTarget: 'umd'
  },

  module: {

    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      }
    ]

  }

};
