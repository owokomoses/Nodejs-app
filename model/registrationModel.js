module.exports = (sequelize, DataTypes) => {
    const Registration = sequelize.define('registrations', {
        registration_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            //  validate: {
            //     len: [6, 100] // Validate length of password
            // }
        }
    })


    return Registration
}