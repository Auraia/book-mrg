const auth = require('./auth');
const inviteCode = require('../routers/Invite-code/index')
const book = require('../routers/book/index')

module.exports = (app) => {
    app.use(auth.routes())
    app.use(inviteCode.routes())
    app.use(book.routes())
}