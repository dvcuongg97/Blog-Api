'use strict'

const mongoose = require('mongoose'); // Erase if already required

const DOCUMENT_NAME = 'Category'
const COLLECTION_NAME = 'Categories'

// Declare the Schema of the Mongo model
const CategorySchema = new mongoose.Schema({
    cate_name: { type: String, required: true, unique: true },
    cate_slug: { type: String, required: true },
    cate_post: [{ type: mongoose.Types.ObjectId, ref: 'Post' }],
}, {
    timestamps: true,
    collection: COLLECTION_NAME,
    versionKey: false
});

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, CategorySchema);