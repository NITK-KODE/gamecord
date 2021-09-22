const mongoose = require('mongoose');

const csgoSchema = new mongoose.Schema({
    steamId: {
        type: String,
        required: true,
        unique: true,
    },
    lastMatchCode: {
        type: String,
        required: true,
        default: "",
    },
    authCode: {
        type: String,
        required: true,
        default: "",
    },
});

const csgoModel = mongoose.model('CSGO', csgoSchema, 'csgo');
module.exports = csgoModel;
