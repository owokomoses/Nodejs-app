const db = require("../model/dbConnect")
const  registrations=db.registrations 

module.exports = {
    addUser: async (req, res, next) => {
        try {
            let info = {
                username: req.body.username,
                password: req.body.password,
            }

            const addUser = await
                registrations.create(info)
            res.status(200).send(addUser)
        } catch (error) {
            next(error)
        }
    },

    getAllUsers: async (req, res, next) => {
        try {
            let getAllUsers = await registrations.findAll({})
            res.status(200).send(getAllUsers)
        } catch (error) {
            next(error)
        }
    },

    getUser: async (req, res, next) => {
        try {
            let id = req.params.id
            let getUser = await registrations.findOne({ where: { registration_id: id } })

            if (!registrations) {
                throw (createError(404, "User not found"))
            }
            res.status(200).send(getUser)
        } catch (error) {
            next(error)
        }
    },

    updateUser: async (req, res, next) => {
        try {
            let id = req.params.id

            const updateUser = await registrations.update(req.body, { where: { registration_id: id } })
            if (!registrations) {
                throw (createError(404, "Student not found"))
            }
            res.status(200).send(updateUser)
        } catch (error) {
            next(error)
    
        }
    },
    
}