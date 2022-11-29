const Router = require('@koa/router');
const mongoose = require('mongoose');
const { getBody } = require('../../helpers/utils')
const jwt = require('jsonwebtoken');

const User = mongoose.model('User');
const InviteCode = mongoose.model('InviteCode');
const router = new Router({
    prefix: '/auth',
});


router.post('/register', async(ctx) => {

    const {
        account,
        password,
        inviteCode,
    } = getBody(ctx);
    //表单校验
    if (account === '' || password === '' || inviteCode === '') {
        ctx.body = {
            code: 0,
            msg: '字段不能为空',
            data: null,
        }
        return;
    }
    //找是否有邀请码
    const findCode = await InviteCode.findOne({
        code: inviteCode,
    }).exec();
    //如果没有找到邀请码
    if ((!findCode) || findCode.user) {
        ctx.body = {
            code: 0,
            msg: '邀请码不正确',
            data: null,
        }
        return;
    }

    //去找account为传递上来的account的用户
    const findUser = await User.findOne({
        account,
    }).exec();
    //判断是否有用户
    if (findUser) {
        //如果有表示已经存在
        ctx.body = {
            code: 0,
            msg: '已存在该用户',
            data: null,
        }
        return;

    }
    //创建用户
    const user = new User({
        account,
        password

    });
    //把创建的用户同步到mongdb
    const res = await user.save();

    findCode.user = res._id;
    findCode.meta.updatedAt = new Date().getTime();
    await findCode.save();
    //响应成功
    ctx.body = {
        code: 1,
        msg: '注册成功',
        data: res,
    }
});
router.post('/login', async(ctx) => {
    const {
        account,
        password,
    } = getBody(ctx);

    if (account === '' || password === '') {
        ctx.body = {
            code: 0,
            msg: '字段不能为空',
            data: null,
        }
        return;
    }

    const one = await User.findOne({
        account,
    }).exec();

    if (!one) {
        ctx.body = {
            code: 0,
            msg: '用户名或者密码错误',
            data: null,
        }
        return;
    }
    const user = {
        account: one.account,
        _id: one._id,
    }
    if (one.password === password) {
        ctx.body = {
            code: 1,
            msg: '登录成功',
            data: {
                user,
                token: jwt.sign(user, 'manage')
            },

        }
        return;
    }
    ctx.body = {
        code: 0,
        msg: '用户名或密码错误',
        data: null,
    }
});

module.exports = router;