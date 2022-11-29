const auth = require('./auth');
const inviteCode = require('../routers/Invite-code/index')
module.exports = (app) => {
    app.use(auth.routes())
    app.use(inviteCode.routes())
}