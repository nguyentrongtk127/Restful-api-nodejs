const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const subscriberSchema = Schema({
    comment: {
        type: String,
        required: true
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'users' 
    },
    article_id: {
        type: Schema.Types.ObjectId,
        ref: 'articles'
    },
})
module.exports = mongoose.model('comments', subscriberSchema)