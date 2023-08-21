const mongoose = require('mongoose');

const User = new mongoose.Schema({
    emile: {type: String, required: true},
    password: {type: String, required: true},
    userUnique: {type: String, required: true},
    postID: {type: String, required: true},
    status: {type: String, required: true}
})

module.exports = mongoose.model('User', User)