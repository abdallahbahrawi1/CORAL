module.exports = (sequelize, DataTypes) => {
  const Discount = sequelize.define(
    "Discount",
    {
      percentage: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 0,
          max: 100,
        },
      },

      start_date: {
        type: DataTypes.DATE,
      },
      expiry_date: {
        type: DataTypes.DATE,
      },
    },
    {
      timestamps: true,
    }
  );

  return Discount;
};
