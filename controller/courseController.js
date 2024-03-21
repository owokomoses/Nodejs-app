const db = require("../model/dbConnect")
const Courses = db.courses; 

module.exports = {
    addCourse: async (req, res, next) => {
        try {
            let info = {
                coursename: req.body.coursename,
            }
            
            
    const addCourse = await Courses.create(info)
    res.status(200).send(addCourse)
    }catch (error) {next(error)}
    },

    getAllCourses: async (req, res, next) => {
        try {
            let getAllCourses= await Courses.findAll({})
            res.status(200).send(getAllCourses)
        } catch (error) { 
            next(error)
        }
    },

    getCourse: async (req, res, next) => {
        try {
            let id = req.params.id
            let getCourse = await Courses.findOne({ where: { course_id: id } })

            if (!Courses) {
                throw (createError(404, "Course not found"))
            }
            res.status(200).send(getCourse)
        } catch (error) {
            next(error)
        }
    },

    updateCourse: async (req, res, next) => {
        try {
            let id = req.params.id

            const updateCourse = await Courses.update(req.body, { where: { course_id: id } })
            if (!Courses) {
                throw (createError(404, "Course not found"))
            }
            res.status(200).send(updateCourse)
        } catch (error) {
            next(error)
    
        }
    },

}