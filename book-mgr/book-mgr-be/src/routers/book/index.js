const Router = require('@koa/router');
const mongoose = require('mongoose');


const { getBody } = require('../../helpers/utils')

const Book = mongoose.model('Book');

const router = new Router({
    prefix: '/book',
});

router.post('/add', async(ctx) => {
    const {
        name,
        price,
        author,
        publishDate,
        classify

    } = getBody(ctx);
    const book = new Book({
        name,
        price,
        author,
        publishDate,
        classify
    });
    const res = await book.save();
    ctx.body = {
        data: res,
        code: 1,
        msg: '添加成功'

    };
});

router.get('/list', async(ctx) => {
    const {
        page = 1,
            size = 10,
            keyword = ''
    } = ctx.query;
    //1 20
    //2 20
    //3 40 

    const query = {};
    if (keyword) {
        query.name = keyword;
    }
    const list = await Book
        .find(query)
        //实现分页效果
        .skip((page - 1) * size)
        .limit(size)
        .exec();

    const total = await Book.countDocuments();
    ctx.body = {
        data: {
            list,
            total,
            page,
            size,
        },
        code: 1,
        msg: '获取列表成功'
    };
    router.delete('/:id', async(ctx) => {
        const { id, } = ctx.params;
    })
    const delMsg = await Book.deleteOne({
        _id: id,
    })
    ctx.body = {
        data: delMsg,
        msg: '删除成功',
        code: 1,
    }
});

module.exports = router;