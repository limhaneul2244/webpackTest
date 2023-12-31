const path = require('path'); // node.js 의 path 모듈을 불러옵니다. 운영체제별로 상이한 경로 문법(구분자 : / 혹은 \)를 해결해 절대 경로로 반환하는 역할을 합니다.
const webpack = require('webpack');
const childProcess = require('child_process');
require('dotenv').config();
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');


// 모듈을 밖으로 빼내는 노드 JS문법 엔트리, 아웃풋 그리고 번들링 모드설정 가능
module.exports = {
  mode: process.env.NODE_ENV === 'development' ? 'development' : 'production',

  entry: {
    main: path.resolve('./src/app.js')
  },

  output: {
    filename: 'main.js',
    path: path.resolve('./dist')
  },

  module: {
    // 로더 추가
    rules: [
      // {
      //   test: /\.js$/,
      //   use: [
      //     // 위와 일치하는 패턴의 파일이 전달될 로더를 설정합니다.
      //     path.resolve('./myLoader.js')
      //   ]
      // },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 20 * 1024 // 1kb가 1024byte 이기 때문에 20kb를 원한다면 1024에 20을 곱합니다.
          }
        },
      },
    ]
  },

  //plugin
  plugins: [
    new webpack.BannerPlugin({
      banner: `
        Commit version : ${childProcess.execSync('git rev-parse --short HEAD')}
        Committer : ${childProcess.execSync('git config user.name')}
        Commit Date : ${new Date().toLocaleString()}
        마지막 빌드 시간 : ${new Date().toLocaleString()}
      `
    }),
    new webpack.DefinePlugin({
      dev: JSON.stringify(process.env.DEV_API),
      pro: JSON.stringify(process.env.PRO_API)
    }),
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
    new CleanWebpackPlugin()
  ],

  optimization: {
    minimize: true,
    minimizer: [
      new ImageMinimizerPlugin({
        test: /\.(jpe?g|png|gif|svg)/i,
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            plugins: [
              ["imagemin-optipng", { optimizationLevel: 3 }]
            ]
          }
        }
      })
    ],
  }
}