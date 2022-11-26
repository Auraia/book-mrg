const mongoose = require('mongoose');
//给哪个数据库的
//哪个集合
//添加文档

//Model 可以理解成是根据Schema生成的一套方法，这套方法用来操作集合和集合下的问的文档


const UserSchema = new mongoose.Schema({
    nickname: String,
    password: String,
    age: Number,
});


const UserModal = mongoose.model('User', UserSchema);
const connect = () => {
        //连接数据库
        mongoose.connect('mongodb://127.0.0.1:27017/manage');
        //当数据库被打开的时候 做一些事情
        mongoose.connection.on('open', () => {
            console.log('连接成功')
                //创建文档
            const user = new UserModal({
                nickname: '张三',
                password: '123456',
                age: 12,
            });
            user.age = 20
                //保存 同步到save
            user.save();
        })
    }
    //调用
connect();