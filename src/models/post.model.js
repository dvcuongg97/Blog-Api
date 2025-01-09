'use strict'

const mongoose = require('mongoose'); // Erase if already required

const DOCUMENT_NAME = 'Post'
const COLLECTION_NAME = 'Posts'

// Declare the Schema of the Mongo model
const PostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    title_slug: { type: String, required: true },
    content: { type: String, required: true },
    description: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    category: { type: String, required: true },
    tags: [{ type: String, default: '' }],
    coverImage: { type: String, default: null },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
}, {
    timestamps: true,
    collection: COLLECTION_NAME,
    versionKey: false
});

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, PostSchema);