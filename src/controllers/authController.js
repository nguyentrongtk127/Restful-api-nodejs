const {token} = require('../services')
module.exports = {
    auth: async (req, res, next)  => {
        try {

            let accessToken = req.headers['x-access-token'] || req.headers['authorization'];
            if(!accessToken) {
                return res.status(403).json('Must provide access token!')
            }
            if (accessToken.startsWith('Bearer ')) {
                accessToken = accessToken.slice(7, accessToken.length);
            }
            const decode = await token.verify(accessToken)
            req.user = decode.data;
            next()
        } catch(err) {
            return res.status(500).json(err)
        }

    }
}