const db = require("../model/dbConnect")
const  registrations =db.registrations 
const {signAccessToken , signRefreshToken} = require('../helpers/jwtHelper');
const createHttpError = require("http-errors");
const {authSchema} = require('../helpers/validateSchema')
module.exports = {
    addUser: async (req, res, next) => {
        try {
            // let info = {
            //     email: req.body.email,
            //     password: req.body.password,
            // } 

            const { email, password } = await authSchema.validateAsync(req.body);
            const exists = await registrations.findOne({ where: { email} })
            if (exists) {
                throw createHttpError.Conflict('${email} has already been registered')
            }   
            const newUser = new registrations({ email, password })
            const savedUser = await newUser.save()


            // const addUser = await registrations.create(info)
            const accessToken = await signAccessToken(savedUser.user_id)
            // res.status(200).send(accessToken)

            res.send({accessToken})
        } catch (error) {
            console.log(error)
            
            if (error.isJoi === true) error.status = 422
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
    
    // loginUser: async (req, res, next) => { 
    //     try {
    //         const result = await authSchema.validateAsync(req.body);
    //         const user = await registrations.findOne({ where: { email: result.email } })

    //         if (!user) throw createHttpError.NotFound('User not registered');
    //         // watching the password

    //         const isMatch = await registrations.isValidPassword(result.password)
    //         if (!isMatch) throw createHttpError.Unauthorized('Invalid password');

    //         // if password matches , then generate token
    //         const accessToken = await signAccessToken(user_id);
    //         const refreshToken = await signRefreshToken(user_id);

    //         res.send({accessToken, refreshToken})
    //     } catch (error) {
    //         if (error.isJoi === true)
    //             return next(createHttpError.BadRequest('Invalid credentials'));
    //         next(error)
    //     }
    // }
}