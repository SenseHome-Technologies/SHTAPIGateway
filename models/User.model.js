const User = sequelize.define('User', {
    userid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    userpassword: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    nif: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    nationality: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    phoneNumber: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    userrole: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    phoneToken: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    userPhoto: {
        type: DataTypes.STRING(255),
        allowNull: true,
    }
}, {
    tableName: 'users',
    timestamps: false
});

module.exports = User;
