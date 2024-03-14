const dbConfig = require('../config/dbConfig');
const {Sequelize , DataTypes} = require('sequelize')

const sequalize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
        host: dbConfig.HOST,
        dialect:dbConfig.dialect,
        operatorAlianses: false,
    });

sequalize
    .authenticate()
    .then(()=> {
        console.log('Database connection successful...')
})
    .catch((err) =>{
        console.log('Error' + err);
});

const db = {};

db.Sequelize = Sequelize;
db.sequalize = sequalize;

db.student = require("./studentModel")(sequalize,DataTypes)

module.exports = db;


