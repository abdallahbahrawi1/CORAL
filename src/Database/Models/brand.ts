module.exports = (sequelize, DataTypes) => {
    const Brand = sequelize.define("Brand", {
       
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: 'name',
        },
        logo: {
            type: DataTypes.STRING,
        },
    },{
        timestamps: true,
    });

    return Brand;
};
