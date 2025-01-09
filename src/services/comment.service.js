'use strict'

const COMMENT = require('../models/comment.model')
const POST = require('../models/post.model');
const { BadRequestError } = require('../helpers/response/error.response');

class CommentService {

    // create
    static async create({
        cmt_text,
        cmt_author,
        cmt_post,
        cmt_parent }) {

        await POST.findById(cmt_post)
            .then((rs) => console.log("rs", rs))
            .catch(err => { throw new BadRequestError('Post Not Found') })

        // cmt replies
        if (cmt_parent) {
            await COMMENT.findByIdAndUpdate(cmt_parent, { $push: { cmt_replies: saved_cmt._id } })
                .then((rs) => console.log(rs))
                .catch(err => console.log(err));
        }

        const newC = new COMMENT({
            cmt_text,
            cmt_author,
            cmt_post,
            cmt_parent
        })

        const saved_cmt = await newC.save()

        await POST.findByIdAndUpdate(cmt_post, { $push: { comments: saved_cmt._id } })
            .then((rs) => console.log(rs))
            .catch(err => console.log(err));

        const populatedCmt = await COMMENT.findById(saved_cmt._id).populate('cmt_author', 'usr_name').populate({
            path: 'cmt_replies',
            populate: { path: 'cmt_author', select: 'usr_name' }, // Populate replies' authors
        });

        return populatedCmt
    }

    // get
    static async fetch({ cmt_post }) {

        const comments = await Comment.find({ cmt_post, parentComment: null })
            .populate('cmt_author', 'usr_name')
            .populate({
                path: 'cmt_replies',
                populate: { path: 'cmt_author', select: 'usr_name' }, // Populate replies' authors
            })
            .sort({ createdAt: -1 }); // Sort by creation date (newest first)

        return comments
    }

    // update
    static async edit(req) {

        const {
            cmt_post,
            cmt_id,
            cmt_author,
            cmt_replies
        } = req.params
        const { text } = req.body

        const matched = await COMMENT.findById(cmt_post)
        if (!matched) throw new BadRequestError('Post Not Found')

        if (cmt_id === matched.cmt_parent && cmt_author === matched.cmt_author) {
            await COMMENT.findByIdAndUpdate()
        } else {
            throw new BadRequestError('Invalid Author')
        }

        const edited_cmt = await COMMENT.findByIdAndUpdate(cmt_id, text)
        return edited_cmt
    }


    static async del() {
        const {
            cmt_post,
            cmt_author,
            cmt_id,
            cmt_replies
        } = req.params

        const matched = await COMMENT.findById(cmt_post)
        if (!matched) throw new BadRequestError('Post Not Found')

        if (cmt_id === matched.cmt_parent && cmt_author === matched.cmt_author) {
            await COMMENT.findByIdAndDelete(cmt_id)
        } else {
            throw new BadRequestError('Invalid Author')
        }

        const edited_cmt = await COMMENT.findByIdAndDelete(cmt_replies)
        return edited_cmt
    }

}

module.exports = CommentService

