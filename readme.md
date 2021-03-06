#webpack

## 설정하기

````
npm i -D webpack webpack-cli
````

## folder
```
/
|-src/
|--index.html
|-package.json
````

````
# package.json

"scripts": {
  "build": "webpack"
}

# cli

npm run build

/
|-dist/
|--main.js # /dist 와 main.js가 생성됨
|-src/
|--index.js
|--bro.js
|--index.html
|-package.json

# bro.js function을 index.js에서 import해 옴, index.html에서
# localhost로 index.html을 열면 chrome 개발자 도구에서 확인
# console 탭에서 'Uncaught SyntaxError: Unexpected token {'오류 발생
# index.html의 script파일을 dist/ main.js (webpack으로 번들링 된 파일)로 src를 변경해줘야 함
# html파일은 작업 파일이므로 html파일도 완성되면 dist/로 생성해주는  html-webpack-plugin
# <img src="image.png"> 작업시 require('./image.png') 이런식으로 포함시켜주는 html-load 추가
````

````
# cli
npm i -D html-loader html-webpack-plugin
````

## webpack 설정파일
````
webpack.config.js

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
````

## webpack dev server
- 파일 작업시 live-reloading된다.
- 자동으로 번들링은 되지 않음
````
# cli
npm i -D webpack-dev-server

# package.json

"script": {
  "start:dev": "webpack-dev-server --open"
}

#cli
npm run start:dev
````

## babel setting
````
# cli
npm i @babel/core @babel/preset-env babel-loader
````

````
# webpack.config.js
module: {
  rules: [
    {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
  ]
}


````

##  scss 설정
````
# cli
# - style-loader // js로부터 style node를 생성
# - sass-loader // sass -> css 로 컴파일
# - node-sass
# - css-loader // CommonJS로 css translates
# - mini-css-extract-plugin 설치 (css파일을 외부로 따로 분리)
# 설치

# webpack.config.js
module: {
  rules: [
    {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
  ]
},
 plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].css',
      chunkFilename: '[id].css'
    })
  ]