module.exports = {
  entry: './sample/index.js',
  output: {
    filename: 'index.js',
    path: './sample/',
    publicPath: '/bundle/'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel-loader']
      }
    ]
  },
  devServer: {
    contentBase: './sample/',
    inline: true,
    port: 3000
  }
};