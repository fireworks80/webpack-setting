const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  module: {
    rules: [
      {
        // 로컬의 <img src="image.png"> 작업시 require('./image.png')로 추가 시켜준다
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true }
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      // template에 있는 index.html 을 dist/index.html로 생성한다
      // dist/에 생성될때 bundle될 js파일은 자동으로 삽입 된다.
      template: './src/index.html',
      filename: 'index.html'
    })
  ]
};
