'use strict'

require('dotenv').config()

const mongoose = require('mongoose');
const MONGO_PORT = process.env.MONGO_URI
const _POOLSIZE = process.env._POOLSIZE

const mongoConnect = mongoose.connect(MONGO_PORT, { maxPoolSize: _POOLSIZE })
    .then(() => console.log('✅ Đã kết nối MongoDB'))
    .catch(err => console.error('❌ Lỗi kết nối MongoDB:', err));

module.exports = mongoConnect