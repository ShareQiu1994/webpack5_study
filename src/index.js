/*
 * @version: 1.0.0
 * @Author: liubofang<421419567@qq.com>
 * @Date: 2020-12-06 21:03:16
 * @LastEditTime: 2020-12-12 20:51:59
 */

// index 入口文件
/*
  开发环境 webpack ./src/index.js -o ./build --mode=development
  生产环境 webpack ./src/index.js -o ./build --mode=production  (生产环境会压缩JS代码 并去除注释) 【默认为生产环境】

  结论

  1.只用webpack 能处理ES6模块化和Commonjs加载的文件(ES6模块区别于Commonjs)
  2.webpack 默认只能支持 js/json资源  其他资源均不支持
  如果需要webpack支持加载其他资源(如 css、image、mp4) 需要使用各种loader

*/

import data from './data/data.json'
import './css/index.css' // 需要css-loader style-loader
import './css/index.scss' // 同上
// import '@babel/polyfill' // JS兼容IE处理 该模式会打包所有兼容性规则 因此体积较大 可以使用core-js去按需使用polyfill规则减少体积
import './iconfont/iconfont.css' // 字体图标

const add = (x, y) => {
  return x + y
}

console.log(add(10, 25))
console.log(data)

const test = new Promise((resolve, reject) => {
  // eslint-disable-next-line no-constant-condition
  if (true) {
    resolve(true)
  } else {
    reject(new Error('getInfo: roles must be a non-null array !'))
  }
})
console.log(test)

//  eslint-disable-next-line
alert(222222221142122222)
