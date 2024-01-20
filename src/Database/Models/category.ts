module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define("Category", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
    },{
        timestamps: true,
    });

    return Category;
};
