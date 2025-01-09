'use strict'

var slugify = require('slugify');
const { BadRequestError } = require('./response/error.response');


const toSlug = (str) => {
    return slugify(str, {
        replacement: '-',  // replace spaces with replacement character, defaults to `-`
        remove: undefined, // remove characters that match regex, defaults to `undefined`
        lower: true,      // convert to lower case, defaults to `false`
        strict: false,     // strip special characters except replacement, defaults to `false`
        locale: 'vi',      // language code of the locale to use
        trim: true         // trim leading and trailing replacement chars, defaults to `true`
    })
}


const checkExisting = async ({ model, conditions }) => {

    if (!model || !conditions) {
        throw new Error('Model and conditions are required');
    }
    const rs = await model.findOne(conditions).lean();
    if (rs) {
        throw new BadRequestError(`${conditions} Already Exists`)
    }
}


module.exports = {
    toSlug,
    checkExisting
}