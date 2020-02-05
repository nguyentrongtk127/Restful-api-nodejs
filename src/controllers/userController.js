const { users } = require('../models')
const {token} = require('../services')
const bcrypt = require("bcrypt");
module.exports = {
    register: async (req, res) => {
        try {
            req.body.password= bcrypt.hashSync(req.body.password, 10);
            await users.create(req.body)
            return res.json('Register success!')
        } catch (err) {
            return res.status(500).json(err)
        }
    },
    login: async (req, res)  => {
        try {
            const {username, password} = req.body
            data = await users.findOne({username})
            if (data && bcrypt.compareSync(password,data.password)) {
                const accessToken = token.sign({username, id: data._id})
                return res.json({token: accessToken})
            }
            return res.json('Username or password is incorrect!')
        } catch (err) {
            return res.status(500).json(err)
        }
    },
    getProfile: async (req, res) => {
        try {
            const {id} = req.user
            const data = await users.findById(id)
            return res.json(data)
        } catch (err) {
            return res.status(500).json(err)
        }
    },
}