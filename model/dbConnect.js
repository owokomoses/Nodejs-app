const dbConfig = require("../config/dbConfig");
const {Sequelize, DataTypes} = require("sequelize");

// define the model

const sequelize = new Sequelize( 
dbConfig.DB,
dbConfig.USER,
dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false, //if error in the code will overwrite
});

sequelize
.authenticate()
.then(() => console.log('Connection has been established successfully.'))
.catch((err) => console.error('Unable to connect to the database:', err));

const db = {}; //empty object

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.students =  require("./studentModel")(sequelize, DataTypes);
db.course =  require("./courseModel")(sequelize, DataTypes);
db.sequelize.sync({force: false})
.then(()=>{
    console.log("re-sync done")
    })

module.exports = db;


