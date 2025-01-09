'use strict'

const { ref } = require('joi');
const mongoose = require('mongoose'); // Erase if already required

const DOCUMENT_NAME = 'Auth'
const COLLECTION_NAME = 'Auths'

// Declare the Schema of the Mongo model
const authSchema = new mongoose.Schema({
    usr_id: { type: mongoose.Types.ObjectId, ref: 'User' },
    usr_email: { type: String, required: true },
    role: {
        type: String,
        enum: ['READER', 'AUTHOR', 'ADMIND'],
        default: 'READER'
    },
    token: { type: String, required: true },
    email_token: { type: String, required: true },
    email_verify: {
        type: String,
        enum: ['NOT', 'DONE'],
        default: 'NOT'
    }
}, {
    timestamps: true,
    collection: COLLECTION_NAME,
    versionKey: false
});

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, authSchema);