const Tech = require('../database/models/Tech')
const User = require('../database/models/User')

module.exports = {
    async listTechs(req, res) {
        const user_id = req.params.user_id

        const user = await User.findByPk(user_id, {
            include: {
                association: 'techs',
                attributes: ['name'],
                through: {
                    attributes: [] // Não mostra nenhum dado da tabela de relacionamento "user_techs"
                }
            }
        })

        return res.json(user.techs)
    },

    async addTech(req, res) {
        const user_id = req.params.user_id
        const {name} = req.body

        const user = await User.findByPk(user_id)

        if(!user) {
            return res.status(404).json({message: 'User not found.'})
        }

        const [tech] = await Tech.findOrCreate({
            where: {name}
        })

        /* addTech é um dos métodos criados automaticamente pelo Sequelize
        quando se tem relacionamentos de MUITOS para MUITOS (Muitos usuários para uma tecnologias)
        e muitas tecnologias para um usuário)  */
        await user.addTech(tech);

        return res.json(tech)
    },

    async removeTech(req, res) {
        const user_id = req.params.user_id
        const {name} = req.body

        const user = await User.findByPk(user_id)

        if(!user) {
            return res.status(404).json({message: 'User not found.'})
        }

        const tech = await Tech.findOne({
            where: {name}
        })

        await user.removeTech(tech);

        return res.json()
    }
}