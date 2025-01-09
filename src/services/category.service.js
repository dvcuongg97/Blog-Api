'use strict'

const CATEGORY = require('../models/category.model')
const { BadRequestError } = require('../helpers/response/error.response')
const { toSlug } = require('../helpers')
/*
    post: [{ type: mongoose.Types.ObjectId, ref: 'Post', required: true }],
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
*/

class CategoryServices {

    // create new
    static async newCategory({ cate_name }) {
        // 
        if (!cate_name) throw BadRequestError('Missing Input')

        const cateSlug = toSlug(cate_name)

        const newCategory = new CATEGORY({ cate_name, cate_slug: cateSlug })
        await newCategory.save()

        return newCategory
    }

    // get by name
    static async getCategoryByName({ cate_slug }) {

        if (!cate_slug) throw BadRequestError('Missing Input')
        const result = await CATEGORY.findOne({ cate_slug })
        if (!result) throw BadRequestError('Category Not Found')

        return result
    }

    // get
    static async getAllCategory() {
        const rs = await CATEGORY.find()
        return rs
    }

    static async deleteCategory({ cate_name }) {

        if (!cate_name) throw BadRequestError('Missing Input')
        const cate_slug = toSlug(cate_name)
        const result = await CATEGORY.findOneAndDelete({ cate_slug })
        if (!result) throw BadRequestError('Something Went Wrong')

        return result
    }
}

module.exports = CategoryServices