module.exports=(sequalize, Datatypes)=>{
    
    const Student = sequalize.define('stdId', {
        stdId: {
            type: Datatypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        firstname: {
            type: Datatypes.STRING,
            allowNull: false,
        },
        Lastname: {
            type: Datatypes.STRING,
            allowNull: false,
        },
        gender: {
            type: Datatypes.STRING,
            allowNull: false,
        },
    });

    return Student
}