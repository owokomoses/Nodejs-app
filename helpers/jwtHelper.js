const createHttpError = require('http-errors');
const JWT = require('jsonwebtoken');
// const username = require('../model/registrationModel')

module.exports = {
    signAccessToken: (UserId) => {
        return new Promise((resolve, reject) => {
            //  if (UserId === undefined) {
            //     reject(createHttpError.BadRequest('UserId is required'));
            //     return;
            // }
            const payload = {UserId: UserId}
            const secret = process.env.ACCESS_TOKEN_SECRET
            const options = {
                expiresIn: '10m',
                issuer: 'Ihatelgbtq.com',
                audience: UserId.toString(),
                
            }
            JWT.sign(payload, secret, options, (err, token) => {
                if (err) {
                    console.log(err.message);
                    reject(createHttpError.InternalServerError());
                }
                resolve(token);
            })
        })
    },

    verifyAccessToken: (req, res, next) => {
        if (req.headers['authorization']) return next(createHttpError.Unauthorized())
        const authheader = req.headers['authorization']
        const bearerToken = authheader.split('')
        const token = bearerToken[1]
        JWT.verify(token.process.env.ACCESS_TOKEN_SECRET, (err, payload) => { 
            if (err) {
                if (err.name === 'JsonWebTokenError') {
                    return next(createHttpError.Unauthorized())
                } else {
                    return next(createHttpError.Unauthorized(err.message))
                }
            }
            req.payload = payload
            next()
        })
    },

    signRefreshToken:(UserId) => {
        return new Promise((resolve, reject) => {
            const payload = {}
            const secret = process.env.REFRESH_TOKEN_SECRET;
            const options = {
                expiresIn: '1y',
                issuer: "Ihatelgbtq.com",
                audience: UserId.toString(),
            }
            JWT.sign(payload, secret, options, (error, token) => {
                if(error) {
                    console.log(error.message)
                    reject(createError.InternalServerError())
                }
                resolve(token);
            })
        })
    },

    verifyRefreshToken:(refreshToken) => {
        return new Promise((resolve, reject) => {
            JWT.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, payload) => {
                if(err) return reject(createError.Unauthorized())
                const userId = payload.aud
            resolve(userId.toString())
            })
        })
    },

}