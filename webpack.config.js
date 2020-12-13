/*
 * @version: 1.0.0
 * @Author: liubofang<421419567@qq.com>
 * @Date: 2020-12-06 21:57:02
 * @LastEditTime: 2020-12-12 21:01:16
 */
// 所有构件工具都是基于nodejs平台的~模块化默认采用Commonjs  （默认不支持ES6,需要区分与src里面的文件)[需要支持ES6需要配置type:module]

// process.env.NODE_ENV = 'development' // 设置为开发环境 【仅查看不同环境的编译效果】
// postcss-env 兼容配置可查看 https://github.com/browserslist/browserslist

// webpack配置文件 指示webpack如何执行 (当你运行webpack指令时，会加载里面的配置)
const { resolve } = require('path') // resolve绝对路径  join相对路径
const HtmlWebpackPlugin = require('html-webpack-plugin') // 引入webpack插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin') // 引入webpack插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // css 提取单独文件插件
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin') // css压缩文件处理
module.exports = {
  // 入口文件
  entry: './src/index.js',
  // 输出
  output: {
    filename: 'js/build_[hash:10].js', // 打包输出文件 [目录]/[文件名]
    publicPath: '../', // 输出代码 资源路径加前缀
    path: resolve(__dirname, 'build') // 路径
  },
  // loader 配置
  module: {
    rules: [
      // 详细loader配置
      {
        test: /\.js$/,
        exclude: /node_modules/, // 排除第三方文件
        use: [
          {
            loader: 'babel-loader', // js兼容性处理 babel 需要 babel-loader @babel/core @babel/preset-env
            options: {
              // @babel/preset-env 能处理基本的JS兼容 不能处理一些高级的JS兼容 如promise 【基本】
              // @babel/polyfill  能处理一些高级的JS兼容  如promise  / @babel/polyfill直接在代码中引入使用 无需配置 弊端:体积太大 【高级兼容第一种方式】
              // core-js  解决代码引入@babel/polyfill打包体积过大问题  可以去掉引入@babel/polyfill 使用core-js去按需使用polyfill规则减少体积 【高级兼容第二种方式】
              // presets: ['@babel/preset-env'] // js预处理 预处理也可以使用根文件.babelrc去配置
            }
          },
          {
            loader: 'eslint-loader', // js语法检查Eslint 需要 eslint-loader eslint // standrad模式 需要 eslint-config-standard eslint-plugin-import eslint-plugin-node eslint-plugin-promise
            options: {
              // fix: true // 自动修复
            }
          }
        ]
      },

      {
        test: /\.css$/,
        use: [
          // use 中的执行顺序 从右到左/从下到上
          // 创建style标签 将js中的css样式资源插入进该标签,添加到header中
          // 'style-loader',

          // 如果需要单独提取CSS文件 (style-loader会把CSS打包进JS中 需要使用MiniCssExtractPlugin的loader取代style-loader)
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../' // css加载的图片路径加前缀 解决提取的CSS文件找不到图片资源问题
            }
          },
          // 将CSS文件变为commonJS的字符串加载到js中，内容为css字符串
          'css-loader',
          // postcss-loader postcss-preset-env 处理CSS兼容性问题  postcss-preset-env 可实现识别不同环境不同浏览器的兼容 【必须loader的最下面先兼容再做处理】
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'postcss-preset-env',
                    {
                      // Options
                    }
                  ]
                ]
              }
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          // use 中的执行顺序 从右到左/从下到上
          // 创建style标签 将js中的css样式资源插入进该标签,添加到header中
          // 'style-loader',

          // 如果需要单独提取CSS文件 (style-loader会把CSS打包进JS中 需要使用MiniCssExtractPlugin的loader取代style-loader)
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../' // css加载的图片路径加前缀 解决提取的CSS文件找不到图片资源问题
            }
          },
          // 将CSS文件变为commonJS的字符串加载到js中，内容为css字符串
          'css-loader',
          // 将scss文件处理为css文件
          'sass-loader',
          // postcss-loader postcss-preset-env 处理CSS兼容性问题  postcss-preset-env 可实现识别不同环境不同浏览器的兼容 【必须loader的最下面先兼容再做处理】
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'postcss-preset-env',
                    {
                      // Options
                    }
                  ]
                ]
              }
            }
          }
        ]
      },
      {
        // url-loade处理图片(css和js的图片) 这种loader默认处理不了html中加载的图片(需要html-loader)
        test: /\.(jpg|jpeg|png|gif)$/,
        loader: 'url-loader', // 只需要一个loader这么写就行了  需要url-loader/file-loader两个包
        options: {
          limit: 8 * 1024, // 图片限制大小，图片不超过8kb就进行base64处理
          name: '[hash:10].[ext]', // 重命名
          outputPath: 'images' // 指定图片打包到哪个目录下
        }
      },
      {
        // html-loade处理图片(html的img标签图片)
        test: /\.html$/,
        loader: 'html-loader' // 只需要一个loader这么写就行了  需要html-loader
      },
      {
        // file-loader  (处理字体图标)
        test: /\.(eot|svg|ttf|woff)$/, // 排除css/js/html资源
        loader: 'file-loader', //  不需要编译直接拿过来就能加载的资源 也有使用file-loader 如字体图标
        options: {
          name: '[hash:10].[ext]', //  重命名
          outputPath: 'iconfont' // 指定图片打包到哪个目录下
        }
      }
    ]
  },
  // plguins 配置
  plugins: [
    // html-webpack-plugin  功能:默认会创建一个html文件，会自动引入打包输出的所有资源(CSS/JS)
    new HtmlWebpackPlugin({
      template: resolve(__dirname, 'src/index.html'), // 以index.html 为结构模板 并自动引入打包输出的所有资源(CSS/JS)
      minify: { // 压缩html代码
        collapseWhitespace: true, // 移除空格
        removeComments: true // 溢出注释
      }
    }),
    // clean-webpack-plugin 功能: 每次编译自动清空dist文件夹的所有文件
    new CleanWebpackPlugin(),
    // 将CSS 单独提取出来  需要使用MiniCssExtractPlugin的loader
    new MiniCssExtractPlugin({
      filename: 'css/build_[hash:10].css' // 指定图片打包到哪个目录下 并重命名
    }),
    // 压缩CSS
    new OptimizeCssAssetsWebpackPlugin()
  ],
  // 模式  development/production  【设置为production为自动压缩代JS码】
  mode: 'development',

  /* 开发服务器 devserver  热部署(自动编译自动打开刷新浏览器) */
  // 特点: 只会在内存中编译打包，不会有任何输出
  // 启动指令为 : webpack-dev-server    需要 webpack-dev-server 这个依赖 (如果只是本地依赖安装  npx webpack-dev-server启动命令)
  devServer: {
    contentBase: resolve(__dirname, 'build'), //  contentbase代表html页面所在的相对目录
    compress: true, // 启动gzip压缩
    open: true, // 自动打开浏览器
    port: 8443 // 端口号
  }
}
