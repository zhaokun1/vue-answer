// 引入express
let express = require('express');
// 引入path
let path = require('path');
let root = process.cwd();
// 引入fs
let fs = require('fs');
// 引入ejs
let ejs = require('ejs');
// 引入http ,https
let http = require('http');
let https = require('https');

let app = new express();

// 更改拓展名
app.engine('.html', ejs.__express);

// 静态化
app.use('/static/', express.static(path.join(process.cwd(), './static')))

// 登录
app.post('/data/user/login', (req, res) => res.json({code: 0, msg: "获取我的数据成功", nickname: "kaisa " }))
// 注册
app.post('/data/user/register', (req, res) => res.json({ code: 0, msg: "注册成功", nickname: "kaisa" }))
// 修改密码
app.post('/data/user/modifyPassword', (req, res) => res.json({ code: 0, msg: '修改成功' }))
// 修改个人信息
app.post('/data/user/modifyUserCard', (req, res) => res.json({ code: 0, msg: '修改成功' }))

// 配置mock数据
app.use('/data/', (req, res, next) => {
    let arr = req.url.split('?');
    arr[0] += '.json';
    req.url = arr.join('?');
    // console.log(req.url);
    next();
}, express.static('./static/data'))

// 路由
app.get('/', (req, res) => {
    res.render('home.html')
})

// 定义端口号
let httpPort = 3005;
let httpsPort = 3006;

// 秘钥
let key = fs.readFileSync(path.join(root, './ssl/private.pem'));
let cert = fs.readFileSync(path.join(root, './ssl/file.crt'));

// 监听
http.createServer(app)
    .listen(httpPort, res=> console.log('http is listen at ' + httpPort));
https.createServer({ key, cert }, app)
.listen(httpsPort, res => console.log('https is listen at ' + httpsPort))
