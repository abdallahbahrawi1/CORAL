module.exports = (sequelize, DataTypes) => {
    const Review = sequelize.define("Review", {
        
        rating: {
            type: DataTypes.INTEGER,
            allowNull: true, 
                validate: {
                    isInt: {
                    msg: "Rating must be an integer.",
                    },
                    min: {
                    args: [1],
                    msg: "Rating must be at least 1.",
                    },
                    max: {
                    args: [5],
                    msg: "Rating must be at most 5.",
                    },
                },

        },
        comment: {
            type: DataTypes.STRING,
        },
       
    }, {
       
        timestamps: true,
        createdAt: 'date_posted', 
        updatedAt: 'date_updated', 

    });

    return Review;
};
