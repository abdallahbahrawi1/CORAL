module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define(
    "Address",
    {
      full_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      street: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        validate: {
          is: {
            args: /^(\+\d{1,3}[- ]?)?\d{10}$/, 
            msg: 'Invalid phone format',
          }
        },
      },
      address_line1: {
        type: DataTypes.STRING,
      },
      address_line2: {
        type: DataTypes.STRING,
      },
      postal_code: {
        type: DataTypes.STRING,
      },
      is_default: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      timestamps: true,
    }
  );

  return Address;
};
