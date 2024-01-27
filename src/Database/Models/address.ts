module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define(
    "Address",
    {
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      last_name: {
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
            args: /^(\d+-?\d+)$/, // Accepts "50559-5895" or "50559"
            msg: 'Invalid phone format. Use "XXXXX-XXXX" or "XXXXX" format.',
          },
          len: {
            args: [5, 15], // Minimum length 5, maximum length 15
            msg: "Phone must be between 5 and 15 characters.",
          },
        },
      },
      address_line1: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address_line2: {
        type: DataTypes.STRING,
      },
      postal_code: {
        type: DataTypes.STRING,
        allowNull: false,
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
