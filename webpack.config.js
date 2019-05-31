const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

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
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        // assets의 이미지들을 난독화 한다
        // 이것이 없으면 이미지 사용시 에러남
        test: /\.(png|jpg|gif)/,
        use: {
          loader: 'file-loader',
          options: {
            outputPath: 'imgs', // dist/imgs/ 이미지들이 들어감
            publicPath: '../imgs' // 번들링 후 css background-image 경로설정
          }
        }
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader, // css로 컴파일된 파일을 외부로 분리
            options: {
              hmr: process.env.NODE_ENV === 'development',
              reloadAll: true
            }
          },
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      // template에 있는 index.html 을 dist/index.html로 생성한다
      // dist/에 생성될때 bundle될 js파일은 자동으로 삽입 된다.
      template: './src/index.html',
      filename: 'index.html'
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: './css/[name].min.css', // sass extract 된 파일 경로 설정
      chunkFilename: '[id].css'
    }),
    new OptimizeCSSAssetsPlugin() // css minimize
  ],
  mode: 'development'
};
