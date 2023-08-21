const mongoose = require('mongoose');

const Post = new mongoose.Schema({
    userUnique: {type: String, required: true},
    postID: {type: String, required: true},
    posts: {type: Array, default: []}
})

module.exports = mongoose.model('Post', Post)