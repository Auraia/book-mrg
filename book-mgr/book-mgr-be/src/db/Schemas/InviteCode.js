const mongoose = require('mongoose');
const { getMeta } = require('../Schemas/helpers')

const InviteCodeSchema = new mongoose.Schema({
    code: String,
    user: String,
    meta: getMeta(),
});

mongoose.model('InviteCode', InviteCodeSchema);