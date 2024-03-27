module.exports = (sequelize, DataTypes) => {
    const Admin = sequelize.define("Admin", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: 'username',
          },
          password: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: 'email',
            validate: {
              isEmail: true,
            },
          },
          fullName: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          role: {
            type: DataTypes.STRING,
            allowNull: false,
          },
    }, {
        timestamps: true,
        hooks: {
            beforeCreate: (session) => {
                const minutesLater = new Date(session.createdAt);
                minutesLater.setMinutes(minutesLater.getMinutes() + 60);
                 session.expiry_date = minutesLater;
              },
        },
    });

    return Admin;
};