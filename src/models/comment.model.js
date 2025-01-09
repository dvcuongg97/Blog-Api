'use strict'

const mongoose = require('mongoose'); // Erase if already required

const DOCUMENT_NAME = 'Comment'
const COLLECTION_NAME = 'Comments'

// Declare the Schema of the Mongo model
const CommentSchema = new mongoose.Schema({
    cmt_text: { type: String, required: true },
    cmt_author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    cmt_post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
    cmt_parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment', default: null },
    cmt_replies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
}, {
    timestamps: true,
    collection: COLLECTION_NAME,
    versionKey: false
});

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, CommentSchema);