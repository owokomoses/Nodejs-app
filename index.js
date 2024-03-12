const express = require ('express');
const studentRoute = require('./routes/studentRoutes')
app.use('/api/vendor',studentRoute)
app.listen(process.env.port || 4000, function(){
    console.log('Now listening for requests on:http://localhost:4000');
}); 