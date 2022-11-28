    //每个文件都是一个模块
    //引入koa
    const Koa = require('koa');
    const bodyParser = require('koa-bodyparser')

    const { connect } = require('./src/db');
    const registerRoutes = require('./src/routers/index');
    const cors = require('@koa/cors')
    const app = new Koa();

    connect()
        .then(() => {
            app.use(cors());
            //先处理数据
            app.use(bodyParser());
            // app.use(koaBody());
            registerRoutes(app);
            app.listen(3000, () => {
                console.log('启动成功')
            })
        })
        .catch(() => {});