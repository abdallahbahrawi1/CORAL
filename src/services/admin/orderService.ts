import { Op, Sequelize } from 'sequelize';
import db from '../../Database/Models/index';

interface OrderItemAnalyticsOptions {
  status: string; // 'completed', 'cancelled', 'processing'
  startDate?: Date;
  endDate?: Date;
  brandId?: number;
  categoryId?: number;
}



const commonSortOptions: Record<string, any> = {
  'quantity_sold_desc': [[Sequelize.literal('quantity_sold'), 'DESC']],
  'quantity_sold_asc': [[Sequelize.literal('quantity_sold'), 'ASC']],
  'order_count_desc': [[Sequelize.literal('order_count'), 'DESC']],
  'order_count_asc': [[Sequelize.literal('order_count'), 'ASC']],
  'total_sales_desc': [[Sequelize.literal('total_sales'), 'DESC']],
  'total_sales_asc': [[Sequelize.literal('total_sales'), 'ASC']],
};
export const getTotalByBrand = async (options) => {
  try {
    const { status, startDate, endDate, brandId,sortOptions } = options;
    const dateCondition = startDate && endDate ? { [Op.between]: [startDate, endDate] } : {};

    const result = await db.products.findAll({
      attributes: [
        [Sequelize.fn('SUM', Sequelize.col('OrderItems.quantity')), 'quantity_sold'],
        [Sequelize.fn('COUNT', Sequelize.col('OrderItems.id')), 'order_count'],
        [Sequelize.fn('SUM', Sequelize.literal('`OrderItems`.`price` * `OrderItems`.`quantity`')), 'total_before_discount'],
        [
          Sequelize.literal('SUM(OrderItems.price * OrderItems.quantity * (1 - Discount.percentage / 100))'),
          'total_sales',
        ]
      ],
      include: [
        {
          model: db.ordersItems,
          as: 'OrderItems',
          where: {
            ...(startDate && endDate && { createdAt: dateCondition}),
          },
          attributes: [],
          include: [
            {
              model: db.orders,
              attributes: [],
              where: {
                status,
                ...(startDate && endDate && { order_date: dateCondition})
              },
            },
          ],
        },
        {
          model: db.brands,
          as: 'Brand',
          attributes: ['name','id'],
          where: brandId ? { id: brandId } : {},
        },
        {
          model: db.discounts,
          as: 'Discount',
          attributes: [],
        },
      ],
      group: ['Product.brand_id'],
      order: commonSortOptions[sortOptions],
      raw: true,
    });

    return result;
  } catch (error) {
    throw new Error('Internal Server Error');
  }
};

export const getTotalByCategory = async (options) => {
  try {
    const { status, startDate, endDate, categoryId,sortOptions } = options;
    const dateCondition = startDate && endDate ? { [Op.between]: [startDate, endDate] } : {};

    const result = await db.products.findAll({
      attributes: [
        [Sequelize.fn('SUM', Sequelize.col('OrderItems.quantity')), 'quantity_sold'],
        [Sequelize.fn('COUNT', Sequelize.col('OrderItems.id')), 'order_count'],
        [Sequelize.fn('SUM', Sequelize.literal('`OrderItems`.`price` * `OrderItems`.`quantity`')), 'total_before_discount'],
        [
          Sequelize.literal('SUM(OrderItems.price * OrderItems.quantity * (1 - Discount.percentage / 100))'),
          'total_sales',
        ]
      ],
      include: [
        {
          model: db.ordersItems,
          as: 'OrderItems',
          where: {
            ...(startDate && endDate && { createdAt: dateCondition}),
          },
          attributes: [],
          include: [
            {
              model: db.orders,
              attributes: [],
              where: {
                status,
                ...(startDate && endDate && { order_date: dateCondition})
              },
            },
          ],
        },
        {
          model: db.categories,
          as: 'Category',
          attributes: ['name','id'],
          where: categoryId ? { id: categoryId } : {},
        },
        {
          model: db.discounts,
          as: 'Discount',
          attributes: [],
        },
      ],
      group: ['Product.category_id'],
      order: commonSortOptions[sortOptions],
      raw: true,
    });

    return result;
  } catch (error) {
    throw new Error('Internal Server Error');
  }
};




export const getOrderItemAnalytics = async (options) => {
  try {
    const { productId,status, startDate, endDate, brandId, categoryId ,sortOptions } = options;
    const dateCondition = startDate && endDate ? { [Op.between]: [startDate, endDate] } : {};

    const result = await db.products.findAll({
      attributes: [
        'id',
        'name',
        [Sequelize.fn('SUM', Sequelize.col('OrderItems.quantity')), 'quantity_sold'],
        [Sequelize.fn('COUNT', Sequelize.col('OrderItems.id')), 'order_count'],
        [Sequelize.fn('SUM', Sequelize.literal('`OrderItems`.`price` * `OrderItems`.`quantity`')), 'total_before_discount'],
        [
          Sequelize.literal('SUM(OrderItems.price * OrderItems.quantity * (1 - Discount.percentage / 100))'),
          'total_sales',
        ]
      ],
      include: [
        {
          model: db.ordersItems,
          as: 'OrderItems',
          where: {
            ...(startDate && endDate && { createdAt: dateCondition}),
          },
          attributes: [],
          include: [
            {
              model: db.orders,
              attributes: [],
              where: {
                status,
                ...(startDate && endDate && { order_date: dateCondition})
                
              },
            },
          ],
        },
        {
          model: db.brands,
          as: 'Brand',
          attributes: ['name'],
          where: brandId ? { id: brandId } : {},
        },
        {
          model: db.categories,
          as: 'Category',
          attributes: ['name'],
          where: categoryId ? { id: categoryId } : {},
        },
        {
          model: db.discounts,
          as: 'Discount',
          attributes: [],
        },
      ],
      where: {
        [Op.and]: [
          brandId ? { brand_id: brandId } : {},
          categoryId ? { category_id: categoryId } : {},
          productId ? { id: productId } : {},
        ],
      },
      
      group: ['Product.id'],
      order: commonSortOptions[sortOptions],
      raw: true,
    });

    return result;
  } catch (error) {
    console.error(error);
    throw new Error('Internal Server Error');
  }
};


