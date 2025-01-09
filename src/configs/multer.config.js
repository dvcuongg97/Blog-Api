'use strict'

const multer = require("multer")

const multerDisk = multer({
    //
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './src/uploads')
        },
        filename: function (req, file, cb) {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            cb(null, file.fieldname + '-' + uniqueSuffix)
        }
    })
})

const singleUpload = multerDisk.single('file')

module.exports = { singleUpload }