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
        type: DataTypes.STRING,
      },
      expiry_date: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: true,
    }
  );

  return Discount;
};
