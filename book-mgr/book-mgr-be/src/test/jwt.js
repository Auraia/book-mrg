var jwt = require('jsonwebtoken');
var token = jwt.sign({
    account: 'a.cc.com',
    _id: '123'
}, 'aaa');
console.log(token);

jwt.verify(token, 'aaa', (err, payload) => {
    console.log(err, payload)
})