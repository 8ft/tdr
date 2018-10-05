let path = require('path')

function resolve (dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    devServer: {
        port: 8080, // 端口号
        host: '0.0.0.0',
        open: true, //配置自动启动浏览器
    },
    chainWebpack: config => {
        config.resolve.alias
          .set('comps', resolve('src/components'))
    }
  }