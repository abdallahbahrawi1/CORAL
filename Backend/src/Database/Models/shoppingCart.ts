module.exports = (sequelize, DataTypes) => {
    const ShoppingCart = sequelize.define("ShoppingCart", {
     
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: {
                  min: 1, 
                  msg: ' quantity must be at least 1', 
                },
              },
        },
    },{
        timestamps: true,


    });

    return ShoppingCart;
};
