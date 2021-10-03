const {Op} = require('sequelize')
const User = require('../database/models/User')

module.exports = {
    async listReports(req, res) {
        // Encontrar todos os usuários que tem email que termina com @teste.com
        // Desses usuários eu quero buscar todos que moram na rua "Rua A"
        // Desses usuários eu quero buscar as tecnologias que começam com React
        
        const users = await User.findAll({
            attributes: ['name', 'email'],
            where: {
                email: {
                    [Op.like]: '%@teste.com' // iLike = insensitive case
                }
            },
            include: [
                {
                    association: 'addresses', 
                    where: {
                        street: 'Rua A'
                    }
                },
                {
                    association: 'techs',
                    required: false, // Mesmo que esses usuários com o email e endereço selecionado não usem tecnologias que começam com React, eles aparecem, pois com o "required: false", o match de dados no "where: {...}" não é obrigatório
                    where: {
                        name: {
                            [Op.like]: 'React%'
                        }
                    }
                }
            ]
        })

        return res.json(users)
    }
}