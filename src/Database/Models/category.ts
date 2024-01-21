module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define("Category", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        icon: {
            type: DataTypes.STRING,
        },
        image: {
            type: DataTypes.STRING,
        },
        image_mobile:{
            type: DataTypes.STRING,
        },
    },{
        timestamps: true,
    });

    return Category;
};
