module.exports = (sequelize, DataTypes) => {
  const OrderItem = sequelize.define(
    "OrderItem",
    {
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          isFloat: {
            args: [0.1],
            msg: "Price must be a positive number",
          },
        },
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            min: 1,
            msg: " quantity must be at least 1",
          },
        },
      },
    },
    {
      timestamps: true,
    }
  );

  return OrderItem;
};
