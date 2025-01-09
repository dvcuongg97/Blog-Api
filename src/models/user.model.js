'use strict'

const { ref } = require('joi');
const mongoose = require('mongoose'); // Erase if already required

const DOCUMENT_NAME = 'User'
const COLLECTION_NAME = 'Users'

// Declare the Schema of the Mongo model
const userSchema = new mongoose.Schema({
    usr_name: { type: String, },
    usr_password: { type: String, required: true },
    usr_email: { type: String, required: true },
    usr_phone: { type: String, default: '' },
    usr_sex: { type: String, default: '' },
    usr_avatar: { type: String, default: '' },
    usr_bio: { type: String, default: '' },
    usr_date_of_birth: { type: Date, default: null },
    usr_status: { type: String, default: 'pending', enum: ['pending', 'actives', 'block'] },
    usr_post: [{ type: mongoose.Types.ObjectId, ref: 'Post' }],
}, {
    timestamps: true,
    collection: COLLECTION_NAME,
    versionKey: false
});

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, userSchema);