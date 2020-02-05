const { articles } = require('../models')

module.exports = {
    getArticles: async (req, res) => {
        try {
            let { page, size } = req.body
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
                    articles.find({})
                    .skip((page - 1) * size)
                    .limit(size),
                    articles.countDocuments()
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
    getArticle: async (req, res) => {
        try {
            const { _id } = req.params;
            const data = await articles.findById(_id)
            return res.json(data)
        } catch (err) {
            return res.status(500).json(err)
        }
    },
    createArticle: async (req, res) => {
        try {
            const { id } = req.user
            const article = { ...req.body, user_id: id }
            const data = await articles.create(article)
            return res.json(data)
        } catch (err) {
            return res.status(500).json(err)
        }
    },
    updateArticle: async (req, res) => {
        try {
            const { id } = req.user
            const { _id } = req.body
            const article = await articles.update({ _id, user_id: id }, res.body)
            return res.json(article)
        } catch (err) {
            return res.status(500).json(err)
        }
    },
    deleteArticle: async (req, res) => {
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