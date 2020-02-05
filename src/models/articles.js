const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const subscriberSchema = Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true,
        unique: true
    },
    comments: {
        type: Number,
        required: false,
        default: 0
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'users' 
    },
})
module.exports = mongoose.model('articles', subscriberSchema)