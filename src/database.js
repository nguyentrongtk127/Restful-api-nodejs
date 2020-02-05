const mongoose = require("mongoose")

module.exports = {
    connect() {
        return new Promise((resolve, reject) => {
            mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true })
            const db = mongoose.connection
            db.on('error', (error) => reject(error))
            db.once('open', () => resolve(db))
        })
    }
}
