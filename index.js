const express = require('express');
const app = express();
const studentRoute = require('./routes/studentRoute');
const courseRoute = require('./routes/courseRoute');
const registrationRoute = require('./routes/registrationRoute');
const createHttpError = require('http-errors');

require('./model/dbConnect')
require("dotenv").config();


app.use(express.json());
app.use(express.urlencoded({ extended: true }))


app.use('/api/student', studentRoute);
//app.use('/api/students', studentRoute);
app.use('/api/course', courseRoute);
//app.use('/api/courses', courseRoute);
app.use('/api/registration', registrationRoute);
//app.use('/api/registrations', registrationRoute);


app.use((err, req, res, next) => {
    if (err.status === 401) {
        res.status(401).send({
            error: {
                status: 401,
                message: 'Unauthorized invalid username/password'
            }
        })
    } else {
        res.status(err.status || 500).send({
            error: {
                status: err.status || 500,
                message: err.message || 'Internal Server Error'
            }
        });
    }
});

// not found middleware.
app.use(async(req, res, next)=> {
    next(createHttpError.NotFound())
})
