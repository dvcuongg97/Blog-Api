'use strict'

const mongoose = require('mongoose'); // Erase if already required

const DOCUMENT_NAME = 'GoogleAccout'
const COLLECTION_NAME = 'GoogleAccounts'

// Declare the Schema of the Mongo model
const googleSchema = new mongoose.Schema({
    google_id: { type: String, default: '' },
    usr_name: { type: String, default: '' },
    usr_email: { type: String, required: true },
    accessToken: { type: String },
    refreshToken: { type: String }
}, {
    timestamps: true,
    collection: COLLECTION_NAME,
    versionKey: false
});

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, googleSchema);