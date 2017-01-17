const path = require('path')

module.exports = {
  entry: [
    'babel-polyfill',
    path.join(__dirname, 'src', 'ui')
  ],
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'ui.js'
  },
  devtool: 'cheap-module-source-map',
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        query: {
          presets: ['stage-0', 'latest', 'react'],
          plugins: ['transform-class-properties'],
          cacheDirectory: true
        },
        include: [
          path.join(__dirname, 'src'),
        ]
      },
    ]
  }
}
