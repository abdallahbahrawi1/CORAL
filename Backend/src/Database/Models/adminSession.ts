module.exports = (sequelize, DataTypes) => {
    const adminSession = sequelize.define("adminSession", {
        session_key: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: 'session_key',
        },
        expiry_date: {
            type: DataTypes.DATE,
        },
    }, {
        timestamps: true,
        hooks: {
            beforeCreate: (session) => {
                const minutesLater = new Date(session.createdAt);
                minutesLater.setMinutes(minutesLater.getMinutes() + 20);
                 session.expiry_date = minutesLater;
              },
        },
    });

    return adminSession;
};