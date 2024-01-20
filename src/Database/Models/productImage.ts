module.exports = (sequelize, DataTypes) => {
    const ProductImage = sequelize.define("ProductImage", {
        
        image_url: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        is_default: {
            type: DataTypes.BOOLEAN,
        },
    },{
        timestamps: true,
    });

    return ProductImage;
};
