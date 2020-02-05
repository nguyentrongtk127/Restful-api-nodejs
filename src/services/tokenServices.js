const jwt = require('jsonwebtoken');
const config = require('../../config')
module.exports = {
    sign: (data) => {
        return jwt.sign({
            data
        }, config.jwtSecret, { expiresIn: '24h' });
    },
    verify: (token) => {
        return new Promise((resolve, reject) => {
            jwt.verify(token, config.jwtSecret, (err, decoded) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(decoded)
                }
            });
        })
    }
}