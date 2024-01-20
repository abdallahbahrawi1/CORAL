module.exports = (sequelize, DataTypes) => {
    const Wishlist = sequelize.define("Wishlist", {
        
          comment: {
            type: DataTypes.STRING,
          },
        
    }, {
        timestamps: true,
        createdAt: 'date_added', 
        updatedAt: 'date_updated', 

    });

    return Wishlist;
};
