const User = require('../database/models/User')

module.exports = {
    async listUsers(req, res) {
        const users = await User.findAll()

        return res.json(users)
    },

    async addUser(req, res) {
        const {name, email} = req.body

        const user = await User.create({
            name,
            email
        })

        return res.json(user)
    }
}