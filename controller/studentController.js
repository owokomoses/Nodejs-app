const db = require('../model/dbConnect');
const Students = db.students;
module.exports = {
  addStudent :async(req, res, next) =>{ //req = request from client and res = response from the server
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

  // get students in database by id
getStudent: async (req, res, next) => {
    try {
        let id = req.params.id
        let Student = await Students.findOne({ where: { student_id: id } })

        if (!Students) {
            throw (createError(404, "Student not found"))
        }
        res.status(200).send(Student)
    } catch (error) {
        next(error)
    }
},

//update sudent data in database using put method
updateStudent: async (req, res, next) => { 
    try {
        let id = req.params.id

        const updateStudent = await Students.update(req.body, { where: { student_id: id } })
        if (!Students) {
            throw (createError(404, "Student not found"))
        }
        res.status(200).send(updateStudent)
    } catch (error) {
        next(error)

    }
}
};