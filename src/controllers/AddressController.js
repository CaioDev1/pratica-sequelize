const Address = require('../database/models/Address')
const User = require('../database/models/User')

module.exports = {
    async listAddress(req, res) {
        const user_id = req.params.user_id

        const user = await User.findByPk(user_id, {
            include: {association: 'addresses'}
        })

        return res.json(user.addresses)
    },

    async addAddress(req, res) {
        const {zipcode, street, number} = req.body
        const user_id = req.params.user_id

        const user = await User.findByPk(user_id)

        if(!user) {
            return res.status(404).json({message: 'User not found.'})
        }

        const address = await Address.create({
            zipcode,
            street,
            number,
            user_id
        })
        console.log(address)

        return res.json(address)
    }
}