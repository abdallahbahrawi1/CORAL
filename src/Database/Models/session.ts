
module.exports = (sequelize, DataTypes) => {
    const Session = sequelize.define("Session", {
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
                minutesLater.setMinutes(minutesLater.getMinutes() + 500);
                 session.expiry_date = minutesLater;

              },
        },
    });

    return Session;
};
