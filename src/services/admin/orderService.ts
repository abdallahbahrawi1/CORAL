import { Op, Sequelize } from 'sequelize';
import db from '../../Database/Models/index';

interface OrderItemAnalyticsOptions {
  status: string; // 'completed', 'cancelled', 'processing'
  startDate?: Date;
  endDate?: Date;
  brandId?: number;
  categoryId?: number;
}

// export const getOrderItemAnalytics = async (options: OrderItemAnalyticsOptions) => {
//   try {
//     const { status, startDate, endDate, brandId, categoryId } = options;

//     const result = await db.orders.findAll({
//       attributes: [
//         [Sequelize.col('OrderItems.product_id'), 'product_id'],
//         [Sequelize.fn('SUM', Sequelize.col('OrderItems.quantity')), 'total_quantity'],
//         [Sequelize.fn('COUNT', Sequelize.col('OrderItems.id')), 'order_count'],
//         [Sequelize.fn('SUM', Sequelize.literal('`OrderItems`.`price` * `OrderItems`.`quantity`')), 'total_amount'],
//         [
//           Sequelize.fn(
//             'SUM',
//             Sequelize.literal(
//               '`OrderItems`.`price` * `OrderItems`.`quantity` * (1 - `OrderItems`.`Product`.`Discount`.`percentage` / 100)'
//             )
//           ),
//           'discounted_amount',
//         ]
//       ],
//       include: [
//         {
//           model: db.ordersItems,
//           as: 'OrderItems',
//           attributes: [],
//           include: [
//             {
//               model: db.products,
//               as: 'Product',
//               attributes: [],
            
//                   where: brandId ? { brand_id: brandId } : {},
//                   include: [
//                     {
//                       model: db.brands,
//                       as: 'Brand',
//                       attributes: ['name'],
//                       // where: brandId ? { id: brandId } : {},
//                     },
//                     {
//                       model: db.discounts,
//                       as: 'Discount',
//                       attributes: [],
//                     }
//                   ]
//             },
            
//               ],
//             },
//           ],

//       where: {
//         status,
//       },
//       group: ['OrderItems.product_id'],
//       order: [[Sequelize.literal('total_quantity'), 'DESC']],
//       raw: true,
//     });

//     return result;
//   } catch (error) {
//     console.error(error);
//     throw new Error('Internal Server Error');
//   }
// };



// export const getOrderItemAnalytics = async (options: OrderItemAnalyticsOptions) => {
//   try {
//     const { status, startDate, endDate, brandId, categoryId } = options;
//     const dateCondition = startDate && endDate ? { [Op.between]: [startDate, endDate] } : {};

//     const result = await db.products.findAll({
//       attributes: [
//         ['id', 'product_id'],
//         [Sequelize.fn('SUM', Sequelize.col('OrderItems.quantity')), 'total_quantity_sold'],
//         [Sequelize.fn('COUNT', Sequelize.col('OrderItems.id')), 'order_count'],
//         [Sequelize.fn('SUM', Sequelize.literal('`OrderItems`.`price` * `OrderItems`.`quantity`')), 'total_amount_before_discount'],
//         [
//           Sequelize.literal('SUM(OrderItems.price * OrderItems.quantity * (1 - Discount.percentage / 100))'),
//           'amount_after_discount',
//         ]
//       ],
//       include: [
//         {
//           model: db.ordersItems,
//           as: 'OrderItems',
//           where: {
//             ...(startDate && endDate && { createdAt: dateCondition}),
//           },
//           attributes: [],
//           include: [
//             {
//               model: db.orders,
//               attributes: [],
//               where: {
//                 status,
//                 ...(startDate && endDate && { order_date: dateCondition})
                
//               },
//             },
//           ],
//         },
//         {
//           model: db.brands,
//           as: 'Brand',
//           attributes: ['name'],
//           where: brandId ? { id: brandId } : {},
//         },
//         {
//           model: db.categories,
//           as: 'Category',
//           attributes: ['name'],
//           where: categoryId ? { id: categoryId } : {},
//         },
//         {
//           model: db.discounts,
//           as: 'Discount',
//           attributes: [],
//         },
//       ],
      
//       group: ['Product.id'],
//       order: [[Sequelize.literal('amount_after_discount'), 'DESC']],
//       raw: true,
//     });

//     return result;
//   } catch (error) {
//     console.error(error);
//     throw new Error('Internal Server Error');
//   }
// };

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
    console.error(error);
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
    console.error(error);
    throw new Error('Internal Server Error');
  }
};
// export const getOrderItemAnalytics = async (options: OrderItemAnalyticsOptions) => {
//   try {
//     const { status, startDate, endDate, brandId, categoryId, productId, sortOptions } = options;

//     const result = await db.orders.findAll({
//       attributes: [
//         [Sequelize.col('OrderItems.product_id'), 'product_id'],
//         [Sequelize.fn('SUM', Sequelize.col('OrderItems.quantity')), 'total_quantity'],
//         [Sequelize.fn('COUNT', Sequelize.col('OrderItems.id')), 'order_count'],
//         [Sequelize.fn('SUM', Sequelize.literal('`OrderItems`.`price` * `OrderItems`.`quantity`')), 'total_amount'],
//         [
//           Sequelize.fn(
//             'SUM',
//             Sequelize.literal(
//               '`OrderItems`.`price` * `OrderItems`.`quantity` * (1 - `OrderItems`.`Product`.`Discount`.`percentage` / 100)'
//             )
//           ),
//           'discounted_amount',
//         ]
//       ],
//       include: [
//         {
//           model: db.ordersItems,
//           as: 'OrderItems',
//           attributes: [],
//           include: [
//             {
//               model: db.products,
//               as: 'Product',
//               attributes: [],
//               where: {
//                 [Op.and]: [
//                   brandId ? { brand_id: brandId } : {},
//                   categoryId ? { category_id: categoryId } : {},
//                   productId ? { id: productId } : {},
//                 ],
//               },
//               include: [
//                 {
//                   model: db.brands,
//                   as: 'Brand',
//                   attributes: ['name'],
//                 },
//                 {
//                   model: db.discounts,
//                   as: 'Discount',
//                   attributes: [],
//                 }
//               ]
//             },
//           ],
//         },
//       ],
//       where: {
//         status,
//         ...(startDate && endDate && { order_date: dateCondition }),
//       },
//       group: ['OrderItems.product_id'],
//       order: getSortOrder(sortOptions),
//       raw: true,
//     });

//     return result;
//   } catch (error) {
//     console.error(error);
//     throw new Error('Internal Server Error');
//   }
// };

// const getSortOrder = (sortOptions) => {
//   switch (sortOptions) {
//     case 'total_quantity_desc':
//       return [[Sequelize.literal('total_quantity'), 'DESC']];
//     case 'total_quantity_asc':
//       return [[Sequelize.literal('total_quantity'), 'ASC']];
//     case 'order_count_desc':
//       return [[Sequelize.literal('order_count'), 'DESC']];
//     case 'order_count_asc':
//       return [[Sequelize.literal('order_count'), 'ASC']];
//     case 'discounted_amount_desc':
//       return [[Sequelize.literal('discounted_amount'), 'DESC']];
//     case 'discounted_amount_asc':
//       return [[Sequelize.literal('discounted_amount'), 'ASC']];
//     default:
//       return [];
//   }
// };




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