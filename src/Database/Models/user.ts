module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
      
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: 'username',
            validate: {
            len: [3, 50]
            },
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: 'email',
            validate: {
                isEmail: true,
                len: [5, 254]
            },
        
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8, 254]
                },
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        profile_image: {
            type: DataTypes.STRING,
        },
        mobile: {
            type: DataTypes.STRING,
            validate: {
                is: {
                  args: /^(\+\d{1,3}[- ]?)?\d{10}$/, // Accepts "50559-5895" or "50559"
                  msg: 'Invalid phone format. Use "XXXXX-XXXX" or "XXXXX" format.',
                },
                len: {
                  args: [5, 15], // Minimum length 5, maximum length 15
                  msg: 'Phone must be between 5 and 15 characters.',
                },
              },
        },
        birth_date: {
            type: DataTypes.DATE,
        },
    },{
        timestamps: true,
    });

    return User;
};
