const { comments, articles } = require('../models')

module.exports = {
    getComments: async (req, res) => {
        try {
            let { article_id, page, size } = req.body
            page = Number(page);
            size = Number(size);
            if (!Number.isInteger(page) || page < 1) {
                page = 1;
            }
            if (!Number.isInteger(size) || size < 1) {
                size = 10;
            }
            const [data, total_count] = await Promise.all(
                [
                    comments.find({article_id})
                    .skip((page - 1) * size)
                    .limit(size),
                    comments.countDocuments({article_id})
                ]
            )
            const result = {
                page,
                count: data.length,
                total_pages: Math.ceil(data.length / size),
                total_count,
                data
            }
            return res.json(result)
        } catch (err) {
            return res.status(500).json(err)
        }
    },
    createComment: async (req, res) => {
        try {
            const { id } = req.user
            const { article_id } = req.body
            const comment = { ...req.body, user_id: id }
            const article = await articles.findById(article_id)
            if (article) {
                const data = await comments.create(comment)
                return res.json(data)
            }
            return res.status(404).json('Article not exist!')
        } catch (err) {
            return res.status(500).json(err)
        }
    },
    updateComment: async (req, res) => {
        try {
            const { id } = req.user
            const { _id } = req.body
            const comment = await comments.update({ _id, user_id: id }, res.body)
            return res.json(comment)
        } catch (err) {
            return res.status(500).json(err)
        }
    },
    deleteComment: async (req, res) => {
        try {
            const { id } = req.user
            const { _id } = req.params;
            await articles.deleteOne({ _id, user_id: id })
            return res.json('Article is deleted')
        } catch (err) {
            return res.status(500).json(err)
        }
    }
}