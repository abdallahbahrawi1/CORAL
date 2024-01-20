module.exports = (sequelize, DataTypes) => {
    const OrderRecipient = sequelize.define('OrderRecipient', {
      
        firstName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        lastName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        mobile: {
          type: DataTypes.STRING,
        },
        email: {
          type: DataTypes.STRING,
        },
        location: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },{
        timestamps: true,
    });

    return OrderRecipient;
};
