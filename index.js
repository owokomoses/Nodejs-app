const express = require ('express');

const app = express();
const studentRoute = require ('./routes/studentRoute');
const courseRoute = require('./routes/courseRoute');



require('dotenv').config()
require('./model/dbConnect')


app.use(express.json()); //express.json is a body passer pass values from the body to the postman
app.use(express.urlencoded({ extended: true })); //this will parse url encoded data 
app.use('/api/student', studentRoute)  //using the middleware for routes
app.use('/api/course', courseRoute);


app.listen(process.env.port || 4000, function() {
console.log('Now listening for requests on: https://localhost:4000');
});