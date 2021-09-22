const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    discordID: {
        type: String,
        required: true,
        unique: true,
    },
    regGames: {
        type: [String],
        required: true,
        default: [],
    },
    regPlatforms: {
        type: [String],
        required: true,
        default: [],
    },
    level: {
        type: Number,
        required: true,
        default: 0,
    },
    steam: {
        type: String,
    },
    ubisoft: {
        type: String,
    },
    epicgames: {
        type: String,
    },
    itchio: {
        type: String,
    },
});

const userModel = mongoose.model('User', userSchema, 'users');
module.exports = userModel;
