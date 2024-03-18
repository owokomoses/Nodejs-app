const db = require('../Model/dbConnect');
const Students = db.students;
module.exports = {
  addStudent :async(req, res, next) =>{ //req = request and res = response
    try {
    let info = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        gender: req.body.gender
    }

    const addStudent = await Students.create(info)
    res.status(200).send(addStudent)
    }catch (error) {next(error)}
},
};