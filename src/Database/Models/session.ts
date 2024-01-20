
module.exports = (sequelize, DataTypes) => {
    const Session = sequelize.define("Session", {
        session_key: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        expiry_date: {
            type: DataTypes.STRING,
        },
    }, {
        timestamps: true,
        hooks: {
            beforeCreate: (session, options) => {
                // Set expiry_date to 6 hours after createdAt
                const sixHoursLater = new Date(session.createdAt);
                sixHoursLater.setHours(sixHoursLater.getHours() + 6);
                
                // Format the date as a string
                session.expiry_date = sixHoursLater.toISOString();
            },
        },
    });

    return Session;
};