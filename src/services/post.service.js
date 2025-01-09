'use strict'

const CATEGORY = require('../models/category.model')
const POST = require('../models/post.model')
const USER = require('../models/user.model')
const { toSlug, checkExisting } = require('../helpers')
const { BadRequestError, } = require('../helpers/response/error.response')
const { Error, default: mongoose } = require('mongoose')

const HEADERS = {
    R_KEY: 'x-refresh-token',
    CLIENT_ID: 'x-client-id',
}

class PostService {

    // create :::::OK:::: 
    static async create(req) {
        // 
        const {
            author, title, content, category, tags, coverImage, description
        } = req.body

        const cateSlug = toSlug(category)
        const titleSlug = toSlug(title)

        // verify
        const categoryCheck = await CATEGORY.findOne({ cate_slug: cateSlug })
        if (!categoryCheck) throw new BadRequestError('Category Not Found')

        // const usrId = req.headers[HEADERS.CLIENT_ID]
        // await USER.findById(usrId)
        //     .then(rs => console.log(rs))
        //     .catch((err) => { throw new BadRequestError('Wrong Author Id') })

        // save post
        const newPost = new POST({
            title,
            title_slug: titleSlug,
            content,
            author,
            category,
            tags,
            coverImage,
            description
        })

        // Save the new post
        const savedPost = await newPost.save()
        if (!savedPost) throw new Error(Error.messages)
        const data = {
            title: savedPost.title,
            title_slug: savedPost.title_slug,
            author: savedPost.authorauthor,
            category: savedPost.category,
            description: savedPost.description,
        }
        // update category & user
        await Promise.all([
            CATEGORY.updateOne(
                { cate_slug: cateSlug },
                { $push: { cate_post: { $each: [savedPost._id] } } }
            ),
            USER.updateOne(
                { _id: usrId },
                { $push: { usr_post: { $each: [savedPost._id] } } }
            ),
        ]);

        return data
    }
    // update 
    static async update(req) {

        const { post, author } = req.params
        const payload = req.body

        if (!post) throw BadRequestError('Missing Input')

        const postCheck = await POST.findById(post).lean()
        if (!postCheck) throw new BadRequestError('Post Not Found')

        if (author !== payload.author) throw new BadRequestError('Wrong Author')

        const updated = await POST.findByIdAndUpdate(post, payload, { new: true }).lean()

        return updated

    }
    // post by author id
    static async authorPost({ author_id }) {

        if (!author_id) throw new BadRequestError('Missing Input')
        const userPosts = await USER.findById(author_id).populate('usr_post').select({ usr_post: 1 }).lean()

        return userPosts
    }
    // all post 
    static async allPost({ limit, page }) {

        const offset = (page - 1) * limit;

        const listPost = await POST.find()
            .skip(offset)
            .limit(limit);

        return listPost
    };
    // search
    static async searchPost({ title }) {

        let matched = []

        await POST.find({
            title: { $regex: new RegExp(title, 'i') } // 'i' for case-insensitive
        })
            .then((rs) => matched = rs)
            .catch((err) => { throw new Error(err) })

        return matched
    }
    // delete
    static async delete({ post, author }) {
        //
        await checkExisting({
            model: 'POST',
            conditions: { _id: post }
        })
        await checkExisting({
            model: 'POST',
            conditions: { author }
        })

        const result = await POST.deleteOne({
            _id: post,
            author,
        });
        return result
    }
    // like 
    static async like({ usr, post }) {
        const likesArr = await POST.findById(post).select('likes').lean();
        const rs = likesArr.likes.includes(usr); // Kiểm tra sự tồn tại của userId trong likes
        if (!rs) {
            const like = await POST.findByIdAndUpdate(
                post,
                { $addToSet: { likes: usr } },
                { new: true }
            ).populate('likes');
            return { like, Result: 'Like' };
        } else {
            const unlike = await Post.findByIdAndUpdate(
                post,
                { $pull: { likes: usr } }, // Xóa userId khỏi mảng likes
                { new: true }
            ).populate('likes');
            return { unlike, Result: 'Unlike' };
        }
    };

}

module.exports = PostService