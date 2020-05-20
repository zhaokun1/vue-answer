// 引入path
let path = require('path')
// 区分开发环境 还是发布环境
if(process.env.NODE_ENV === 'production') {
    // 发布环境
    module.exports = {
        // 静态资源发布位置
        outputDir: path.join(path.join(process.cwd(), '../server/static/home')),
        // 模板资源发布位置
        indexPath: path.join(path.join(process.cwd(), '../server/views/home.html')),
        // 相对路径
        publicPath: '/static/home/'
    }
} else {
    // 请求代理对象
    let proxyObject = {
        target: 'http://localhost:3005'
    }
    // 开发环境
    module.exports = {
        // devServer配置
        devServer: {
            proxy: {
                // home数据
                '/data/home': proxyObject,
                // noticeList数据
                '/data/notice/list': proxyObject,
                // noticeDetail数据
                '/data/notice/detail': proxyObject,
                // answerDeatail数据
                '/data/answer/detail': proxyObject,
                // answerCategory数据
                '/data/answer/category': proxyObject,
                // answerQuestion数据
                '/data/answer/question': proxyObject,
                // search
                '/data/search': proxyObject,
                // user/login
                '/data/user/login': proxyObject,
                // user/login
                '/data/user/register': proxyObject,
                // user/modifyPassword
                '/data/user/modifyPassword': proxyObject,
                // user/myCard
                '/user/information': proxyObject,
                // user/modifyCard
                '/data/user/modifyUserCard': proxyObject
            }
        }
    }
}