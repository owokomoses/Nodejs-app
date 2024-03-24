const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('registrations', {
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,

            //  validate: {
            //     len: [6, 100] // Validate length of password
            // }
        },
    });

    User.beforeCreate(async(registrations) => {
        try {
            const salt = await bcrypt.genSalt(16);
            const hashedPwd = await bcrypt.hash(registrations.password, salt)
            registrations.password = hashedPwd;
        } catch (error) {
            throw new Error('Error encrypting password')
        }
    })

    User.prototype.isValidPassword = async function (password) {
        try {
            return await bcrypt.compare(password, this.password)
        } catch (error) {
            throw error('Error validating password')
        }
    }

    return User
}