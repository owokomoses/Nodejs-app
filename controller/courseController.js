const db = require('../Model/dbConnect');
const course = db.course;
module.exports = {
  addCourse :async(req, res, next) =>{ //req = request and res = response
    try {
    let info = {
        courseName: req.body.courseName,
    }

    const addCourse = await course.create(info)
    res.status(200).send(addCourse)
    }catch (error) {next(error)}
},
};