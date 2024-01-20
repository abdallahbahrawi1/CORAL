module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define("Order", {
        order_number: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isValidOrderNumber(value) {
                    if (!/^#\d{9}$/.test(value)) {
                        throw new Error('Order number must start with # and have 9 digits.');
                    }
                },
            },
        },
      
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: {
                    args: [['completed', 'cancelled', 'processing']],
                    msg: 'Status must be one of "completed", "cancelled", or "processing".',
                },
            },
        },
        payment_method: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
      
        timestamps: true,
        createdAt: ' order_date', 
        updatedAt: ' order_updated', 

    });

    return Order;
};
