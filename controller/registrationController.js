const db = require('../model/dbConnect');
const createError = require('http-errors');
const { authSchema } = require('../helpers/validateSchema');
const { signAccessToken } = require('../helpers/jwtHelper');
const { invalid } = require('joi');

const User = db.users;

module.exports = {
addUser: async (req, res, next) => {
    try {
    const { email, password } = await authSchema.validateAsync(req.body);
    const exists = await User.findOne({ where: { email } });
    if (exists) {
        throw createError.Conflict(`${email} has already been registered`);
    }
    const newUser = new User({ email, password });
    const savedUser = await newUser.save();

      const accessToken = await signAccessToken(savedUser.id); // Assuming ID is accessible directly
    res.status(200).send({ accessToken });
    } catch (error) {
    console.log(error);
    if (error.isJoi === true) error.status = 422
    next(error)
    next(error)
    }
},
getAllUsers: async (req, res, next) => {
    try {
    const users = await User.findAll({});
    res.status(200).send(users);
    } catch (error) {
    next(error);
    }
},

  //function to hash password before saving

loginUser: async (req, res, next) => {
    try {
        const  result = await authSchema.validateAsync(req.body);
        const user = await User.findOne({where:{email :result.email}});
        
        if(!user)
            throw createError.NotFound("user not registered");
            //matching the password
            const isMatch = await user.isValidPassword(result.password);
            if (!isMatch) throw createError.Unauthorized('Invalid Email or Password');

            //if password matches then generate token
            const accessToken = await signAccessToken(user.id);
            const refreshToken = await signRefreshToken(user.id);
            res.send({ accessToken, refreshToken})
    } catch  (error) {
        if(error.isJoi === true)
        return next(createError.BadRequest('invalid Email or  Password'));
    next(error);
    }
    
},
};