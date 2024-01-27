// import { Request, Response } from 'express';
// const db = require('../Database/Models/index');

// export const getNewArrivals = async (req: Request, res: Response) => {
//     try {
//         const threeMonthsAgo = new Date();
//         threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

//         const newArrivals = await db.products.findAll({
//           where: {
//             createdAt: {
//               [db.Sequelize.Op.gte]: threeMonthsAgo.toISOString(),
//             },
//           },
//           include: [
//             {
//               model: db.productsImages,
//               attributes: ['image_url'],
//               limit: 1,
//             },
//           ],

//         //   raw: true, // Flatten the result to get a clean JSON response
//         });

//         return res.status(200).json(newArrivals);
//       } catch (error) {
//         console.error(error);
//         return res.status(500).json({ error: 'Internal Server Error' });
//       }
//     };

//     export const getProducts = async (req: Request, res: Response) => {
//       try {
//         const sortBy = req.query.sortBy || 'ratings'; // Default to 'popular' if sortBy is not provided

//         // Define a mapping of valid sorting options
//         const validSortOptions: Record<string, any> = {
//           'price-high': [['price', 'DESC']],
//           'price-low': [['price', 'ASC']],
//           'ratings': [[db.sequelize.fn('AVG', db.sequelize.col('reviews.rating')), 'DESC']],
//           'latest': [['createdAt', 'DESC']],
//           'popular': [[db.sequelize.fn('AVG', db.sequelize.col('reviews.rating')), 'DESC']], // Adjust as needed
//         };

//         // Check if the user's input is a valid sorting option
//         const sortOrder = validSortOptions[sortBy] || validSortOptions['ratings'];

//         const page = req.query.page ? parseInt(req.query.page, 10) : 1;
//         const pageSize = req.query.pageSize ? parseInt(req.query.pageSize, 10) : 9;
//         const result = await db.products.findAll({
//           // subQuery: false,
//           attributes: [
//             'id',
//             'name',
//             'sub_title',
//             'price',
//             'createdAt',
//             [db.sequelize.fn('AVG', db.sequelize.col('reviews.rating')), 'average_rating'],
//             [db.sequelize.fn('COUNT', db.sequelize.col('reviews.rating')), 'rating_count'],
//           ],
//           include: [
//             {
//               model: db.reviews,
//               attributes: [],
//             },
//             {
//               model: db.discounts,
//               attributes: ['percentage'],
//             },
//             {
//               model: db.productsImages,
//               attributes: ['image_url'],
//               limit: 1,
//             }
//           ],
//           group: ['id'],
//           order: sortOrder,
//           // limit: pageSize,
//           // offset: (page - 1) * pageSize,
//         });
//           // return res.status(200).json(result)
//         return res.status(200).json({
//           totalItems: result.length,
//           totalPages: Math.ceil(result.length / pageSize),
//           currentPage: page,
//           pageSize: pageSize,
//           data: result.slice((page - 1) * pageSize,((page - 1) * pageSize)+pageSize),
//         });
//         } catch (error) {
//           console.error(error);
//           return res.status(500).json({ error: 'Internal Server Error' });
//         }
//       };

//       export const getLimitProducts = async (req: Request, res: Response) => {
//         try {
//           const sortBy = req.query.sortBy || 'ratings'; // Default to 'popular' if sortBy is not provided

//           // Define a mapping of valid sorting options
//           const validSortOptions: Record<string, any> = {
//             'price-high': [['price', 'DESC']],
//             'price-low': [['price', 'ASC']],
//             'ratings': [[db.sequelize.fn('AVG', db.sequelize.col('reviews.rating')), 'DESC']],
//             'latest': [['createdAt', 'DESC']],
//             'popular': [[db.sequelize.fn('AVG', db.sequelize.col('reviews.rating')), 'DESC']], // Adjust as needed
//           };

//           // Check if the user's input is a valid sorting option
//           const sortOrder = validSortOptions[sortBy] || validSortOptions['ratings'];

//           const page = req.query.page ? parseInt(req.query.page, 10) : 1;
//           const pageSize = req.query.pageSize ? parseInt(req.query.pageSize, 10) : 9;
//           const result = await db.products.findAll({
//             // subQuery: false,
//             attributes: [
//               'id',
//               'name',
//               'sub_title',
//               'price',
//               'stock_quantity',
//               'createdAt',
//               [db.sequelize.fn('AVG', db.sequelize.col('reviews.rating')), 'average_rating'],
//               [db.sequelize.fn('COUNT', db.sequelize.col('reviews.rating')), 'rating_count'],
//             ],
//             include: [
//               {
//                 model: db.reviews,
//                 attributes: [],
//               },
//               {
//                 model: db.discounts,
//                 attributes: ['percentage'],
//               },
//               {
//                 model: db.productsImages,
//                 attributes: ['image_url'],
//                 limit: 1,

//               }
//             ],
//             where: {
//               stock_quantity: {
//                 [db.Sequelize.Op.lte]: 20, // Filter where quantity is 20 or less
//               },
//             },
//             group: ['id'],
//             order: sortOrder,
//             // limit: pageSize,
//             // offset: (page - 1) * pageSize,
//           });
//             // return res.status(200).json(result)
//           return res.status(200).json({
//             totalItems: result.length,
//             totalPages: Math.ceil(result.length / pageSize),
//             currentPage: page,
//             pageSize: pageSize,
//             data: result.slice((page - 1) * pageSize,((page - 1) * pageSize)+pageSize),
//           });
//           } catch (error) {
//             console.error(error);
//             return res.status(500).json({ error: 'Internal Server Error' });
//           }
//         };

//         export const getDiscountPlusProducts = async (req: Request, res: Response) => {
//           try {
//             const sortBy = req.query.sortBy || 'ratings'; // Default to 'popular' if sortBy is not provided

//             // Define a mapping of valid sorting options
//             const validSortOptions: Record<string, any> = {
//               'price-high': [['price', 'DESC']],
//               'price-low': [['price', 'ASC']],
//               'ratings': [[db.sequelize.fn('AVG', db.sequelize.col('reviews.rating')), 'DESC']],
//               'latest': [['createdAt', 'DESC']],
//               'popular': [[db.sequelize.fn('AVG', db.sequelize.col('reviews.rating')), 'DESC']], // Adjust as needed
//             };

//             // Check if the user's input is a valid sorting option
//             const sortOrder = validSortOptions[sortBy] || validSortOptions['ratings'];

//             const page = req.query.page ? parseInt(req.query.page, 10) : 1;
//             const pageSize = req.query.pageSize ? parseInt(req.query.pageSize, 10) : 9;
//             const result = await db.products.findAll({
//               // subQuery: false,
//               attributes: [
//                 'id',
//                 'name',
//                 'sub_title',
//                 'price',
//                 'stock_quantity',
//                 'createdAt',
//                 [db.sequelize.fn('AVG', db.sequelize.col('reviews.rating')), 'average_rating'],
//                 [db.sequelize.fn('COUNT', db.sequelize.col('reviews.rating')), 'rating_count'],
//               ],
//               include: [
//                 {
//                   model: db.reviews,
//                   attributes: [],
//                 },
//                 {
//                   model: db.discounts,
//                   attributes: ['percentage'],
//                   where: {
//                     percentage: {
//                       [db.Sequelize.Op.gte]: 15, // Filter where quantity is 20 or less
//                     },
//                   },
//                 },
//                 {
//                   model: db.productsImages,
//                   attributes: ['image_url'],
//                   limit: 1,

//                 }
//               ],

//               group: ['id'],
//               order: sortOrder,
//               // limit: pageSize,
//               // offset: (page - 1) * pageSize,
//             });
//               // return res.status(200).json(result)
//             return res.status(200).json({
//               totalItems: result.length,
//               totalPages: Math.ceil(result.length / pageSize),
//               currentPage: page,
//               pageSize: pageSize,
//               data: result.slice((page - 1) * pageSize,((page - 1) * pageSize)+pageSize),
//             });
//             } catch (error) {
//               console.error(error);
//               return res.status(500).json({ error: 'Internal Server Error' });
//             }
//           };

//           export const getPopularProducts = async (req: Request, res: Response) => {
//             try {
//               const sortBy = req.query.sortBy || 'ratings'; // Default to 'popular' if sortBy is not provided

//               // Define a mapping of valid sorting options
//               const validSortOptions: Record<string, any> = {
//                 'price-high': [['price', 'DESC']],
//                 'price-low': [['price', 'ASC']],
//                 'ratings': [[db.sequelize.fn('AVG', db.sequelize.col('reviews.rating')), 'DESC']],
//                 'latest': [['createdAt', 'DESC']],
//                 'popular': [[db.sequelize.fn('AVG', db.sequelize.col('reviews.rating')), 'DESC']], // Adjust as needed
//               };

//               // Check if the user's input is a valid sorting option
//               const sortOrder = validSortOptions[sortBy] || validSortOptions['ratings'];

//               const page = req.query.page ? parseInt(req.query.page, 10) : 1;
//               const pageSize = req.query.pageSize ? parseInt(req.query.pageSize, 10) : 9;
//               const result = await db.products.findAll({
//                 // subQuery: false,
//                 attributes: [
//                   'id',
//                   'name',
//                   'sub_title',
//                   'price',
//                   'stock_quantity',
//                   'createdAt',
//                   [db.sequelize.fn('AVG', db.sequelize.col('reviews.rating')), 'average_rating'],
//                   [db.sequelize.fn('COUNT', db.sequelize.col('reviews.rating')), 'rating_count'],
//                 ],

//                 include: [
//                   {
//                     model: db.reviews,
//                     attributes: [],

//                   },
//                   {
//                     model: db.discounts,
//                     attributes: ['percentage'],

//                   },
//                   {
//                     model: db.productsImages,
//                     attributes: ['image_url'],
//                     limit: 1,

//                   }
//                 ],

//                 group: ['id'],
//                 having: db.sequelize.where(db.sequelize.fn('AVG', db.sequelize.col('reviews.rating')), '>', 4.5),
//                 order: sortOrder,
//                 // limit: pageSize,
//                 // offset: (page - 1) * pageSize,
//               });
//                 // return res.status(200).json(result)
//               return res.status(200).json({
//                 totalItems: result.length,
//                 totalPages: Math.ceil(result.length / pageSize),
//                 currentPage: page,
//                 pageSize: pageSize,
//                 data: result.slice((page - 1) * pageSize,((page - 1) * pageSize)+pageSize),
//               });
//               } catch (error) {
//                 console.error(error);
//                 return res.status(500).json({ error: 'Internal Server Error' });
//               }
//             };

// export const getProducts = async (req: Request, res: Response) => {
//   try {
//     const page = req.query.page ? parseInt(req.query.page, 10) : 1;
//     const pageSize = req.query.pageSize ? parseInt(req.query.pageSize, 10) : 9;
//     const result = await db.products.findAll({
//       // subQuery: false,
//       attributes: [
//         'id',
//         'name',
//         'sub_title',
//         'price',
//         [db.sequelize.fn('AVG', db.sequelize.col('reviews.rating')), 'average_rating'],
//         [db.sequelize.fn('COUNT', db.sequelize.col('reviews.rating')), 'rating_count'],
//       ],
//       include: [
//         {
//           model: db.reviews,
//           attributes: [],
//         },
//         {
//           model: db.discounts,
//           attributes: ['percentage'],
//         },
//         {
//           model: db.productsImages,
//           attributes: ['image_url'],
//           limit: 1,
//         }
//       ],
//       group: ['id'],
//       order: [[db.sequelize.fn('AVG', db.sequelize.col('reviews.rating')), 'DESC']],
//       // limit: pageSize,
//       // offset: (page - 1) * pageSize,
//     });
//       // return res.status(200).json(result)
//     return res.status(200).json({
//       totalItems: result.length,
//       totalPages: Math.ceil(result.length / pageSize),
//       currentPage: page,
//       pageSize: pageSize,
//       data: result.slice((page - 1) * pageSize,((page - 1) * pageSize)+pageSize),
//     });
//     } catch (error) {
//       console.error(error);
//       return res.status(500).json({ error: 'Internal Server Error' });
//     }
//   };
// export const getProducts = async (req: Request, res: Response) => {
//   try {
//     const page = req.query.page ? parseInt(req.query.page, 10) : 1;
//     const pageSize = req.query.pageSize ? parseInt(req.query.pageSize, 10) : 9;
//     const result = await db.products.findAll({
//       attributes: [
//         'id',
//         'name',
//         'sub_title',
//         'price',
//         [db.sequelize.fn('AVG', db.sequelize.col('reviews.rating')), 'average_rating'],
//         [db.sequelize.fn('COUNT', db.sequelize.col('reviews.rating')), 'rating_count'],
//       ],
//       include: [
//         {
//           model: db.reviews,
//           attributes: [],
//         },
//         {
//           model: db.discounts,
//           attributes: ['percentage'],
//         },

//       ],
//       group: ['id'],
//       order: [[db.sequelize.fn('AVG', db.sequelize.col('reviews.rating')), 'DESC']],
//     });
//       return res.start(200).json(result)

//     } catch (error) {
//       console.error(error);
//       return res.status(500).json({ error: 'Internal Server Error' });
//     }
//   };

// export const getProducts = async (req: Request, res: Response) => {
//   try {
//     const result = await db.products.findAll({
//       subQuery: false,
//       attributes: [
//         'id',
//         'name',
//         'sub_title',
//         'price',
//         [db.sequelize.fn('AVG', db.sequelize.col('reviews.rating')), 'average_rating'],
//         [db.sequelize.fn('COUNT', db.sequelize.col('reviews.rating')), 'rating_count'],
//       ],
//       include: [
//         {
//           model: db.reviews,
//           attributes: [],
//         },

//       ],
//       group: ['id'],
//       order: [[db.sequelize.fn('AVG', db.sequelize.col('reviews.rating')), 'DESC']],
//       limit:2

//     },);

//     return res.status(200).json(result);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: 'Internal Server Error' });
//   }
// };
// import { Request, Response } from 'express';
// import db from '../Database/Models/index';

// interface ProductQueryOptions {
//   attributes: string[];
//   include: any[];
//   where?: any;
//   group?: string[];
//   order?: any;
// }

// const something =async (req)=>{
//   const sortBy = req.query.sortBy || 'ratings';
//   const sortOrder = commonSortOptions[sortBy] || commonSortOptions['ratings'];

//   const page = parseInt(req.query.page, 10) || 1;
//   const pageSize = parseInt(req.query.pageSize, 10) || 9;
//   return (sortBy,sortOrder,page,pageSize)
// }


// const handleRequest = async (req: Request, res: Response, options: ProductQueryOptions) => {
//   try {
  

//     const result = await db.products.findAll({
//       subQuery: false,
//       ...options,
//       attributes: [...commonAttributes, ...(options.attributes || [])],
//       include: [...commonInclude, ...(options.include || [])],
//       order: sortOrder
//     });

//     return res.status(200).json({
//       totalItems: result.length,
//       totalPages: Math.ceil(result.length / pageSize),
//       currentPage: page,
//       pageSize: pageSize,
//       data: result.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize)
//     });
//   } catch (error) {
//     return res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

// export const getNewArrivals = async (req: Request, res: Response) => {
//   const threeMonthsAgo = new Date();
//   threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
//   pageOptions = something(req)
//   await handleRequest(req, res, {
//     where: {
//       createdAt: {
//         [db.Sequelize.Op.gte]: threeMonthsAgo.toISOString()
//       }
//     },
//     group: ['id'],
//     attributes: [],
//     include: []
//   });
// };

// export const getProducts = async (req: Request, res: Response) => {
//   await handleRequest(req, res, {
//     group: ['id'],
//     attributes: [],
//     include: []
//   });
// };

// export const getLimitProducts = async (req: Request, res: Response) => {
//   await handleRequest(req, res, {
//     where: {
//       stock_quantity: {
//         [db.Sequelize.Op.lte]: 20
//       }
//     },
//     group: ['id'],
//     attributes: [],
//     include: []
//   });
// };

// export const getDiscountPlusProducts = async (req: Request, res: Response) => {
//   await handleRequest(req, res, {
//     include: [
//       {
//         model: db.discounts,
//         attributes: ['percentage'],
//         where: {
//           percentage: {
//             [db.Sequelize.Op.gte]: 15
//           }
//         }
//       }
//     ],
//     group: ['id'],
//     attributes: []
//   });
// };

// export const getPopularProducts = async (req: Request, res: Response) => {
//   await handleRequest(req, res, {
//     group: ['id'],
//     having: db.sequelize.where(db.sequelize.fn('AVG', db.sequelize.col('reviews.rating')), '>', 4.5)
//   });
// };



// export const getTrendyProducts = async (req: Request, res: Response) => {
//   await handleRequest(req, res, {
//     attributes: [db.sequelize.fn('COUNT', db.sequelize.col('orderitems.product_id')),'buy_count'],
//     include: [
//       {
//         model: db.ordersItems,
//         attributes: []
//       }
//     ],
//     group: ['id']
//   });
// };
// export const getTrendyProducts = async (req: Request, res: Response) => {
//   await handleRequest(req, res, {
//     attributes: [
//       'id',
//       [db.sequelize.fn('COUNT', db.sequelize.col('orderitems.product_id')), 'count']
//     ],
//     include: [
//       {
//         model: db.ordersItems,
//         attributes: [],
//         group: ['orderitems.product_id'],
//       }
//     ],
//     group: ['id'],
    
//   });
// };
// export const getTrendyProducts = async (req: Request, res: Response) => {
//  try{const sortBy = req.query.sortBy || 'ratings'; // Default to 'popular' if sortBy is not provided

// //  const result = await db.ordersItems.findAll({
// //   attributes: [
// //     'product_id',
// //     [db.sequelize.fn('COUNT', db.sequelize.col('*')), 'count'],
// //     [db.sequelize.fn('SUM', db.sequelize.col('quantity')), 'total_quantity']
// //   ],
// //   group: ['product_id'],
// //   order: [[db.sequelize.literal('count'), 'DESC']]
// // });
// const result = await db.products.findAll({
//   attributes: [
//     'id',
//     'name',
//     [db.sequelize.fn('COUNT', db.sequelize.col('orderitems.product_id')), 'count']
//   ],
//   include: [
//     {
//       model: db.ordersItems,
//       attributes: [],
//       required: true,
//       where: {
//         product_id: db.sequelize.col('product_id')
//       }
//     }
//   ],
//   group: ['id'],
//   order: [[db.sequelize.literal('count'), 'DESC']]
// });
//   res.status(200).json(result)
//  }
//   catch (error) {
//    console.error(error);
//    return res.status(500).json({ error: 'Internal Server Error' });
//  }}

//  import * as productService from '../Services/productService';
//  import { Request, Response } from 'express';
// import db from '../Database/Models/index';

// interface ProductQueryOptions {
//   attributes?: string[];
//   include?:any[];
//   where?: any;
//   group?: string[];
//   order?: any;
//   having?:any;
// }

// const commonAttributes = [
//   'id',
//   'name',
//   'sub_title',
//   'price',
//   'createdAt',
//   [db.sequelize.fn('AVG', db.sequelize.col('Reviews.rating')), 'average_rating'],
//   [db.sequelize.fn('COUNT', db.sequelize.col('Reviews.rating')), 'rating_count'],
//   [db.sequelize.fn('SUM', db.sequelize.col('OrderItems.quantity')),'sold_count'],
// ];

// const commonInclude = [
//   {
//     model: db.reviews,
//     attributes: [],
//   },
//   {
//     model: db.discounts,
//     attributes: ['percentage'],
//   },
//   {
//     model: db.productsImages,
//     attributes: ['image_url'],
//     limit: 1,
//   },
//   {
//     model: db.ordersItems,
//     attributes: [
//       // ... other attributes
//       'id', // Add other non-aggregated columns here
//       'product_id',
//       // ... other attributes
//     ],
//     group: ['id', 'product_id', 'Product.id', 'Product.name', 'Product.sub_title', 'Product.price', 'Product.createdAt', 'Discount.id', 'Discount.percentage'],
//   },
// ];

// const commonSortOptions: Record<string, any> = {
//   'price-high': [['price', 'DESC']],
//   'price-low': [['price', 'ASC']],
//   'ratings': [[db.sequelize.fn('AVG', db.sequelize.col('Reviews.rating')), 'DESC']],
//   'latest': [['createdAt', 'DESC']],
//   'popular': [[db.sequelize.fn('SUM', db.sequelize.col('OrderItems.quantity')), 'DESC']],
// };

// const handleRequest = async (req: Request, res: Response, options: ProductQueryOptions) => {
//   try {
//     const sortBy = req.query.sortBy || 'ratings';
//     const sortOrder = commonSortOptions[sortBy] || commonSortOptions['ratings'];

//     const page = parseInt(req.query.page, 10) || 1;
//     const pageSize = parseInt(req.query.pageSize, 10) || 9;

//     const result = await db.products.findAll({
//       subQuery: false,
//       ...options,
//       attributes: [...commonAttributes, ...(options.attributes || [])],
//       include: [...commonInclude, ...(options.include || [])],
//       order: sortOrder,
//     });

//     return res.status(200).json({
//       totalItems: result.length,
//       totalPages: Math.ceil(result.length / pageSize),
//       currentPage: page,
//       pageSize: pageSize,
//       data: result.slice((page - 1) * pageSize,((page - 1) * pageSize)+pageSize),
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

// export const getNewArrivals = async (req: Request, res: Response) => {
//   const threeMonthsAgo = new Date();
//   threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

//   await handleRequest(req, res, {
//     where: {
//       createdAt: {
//         [db.Sequelize.Op.gte]: threeMonthsAgo.toISOString(),
//       },
//     },
//     group: ['id'],
//     attributes: [],
//     include: []
//   });
// };

// export const getProducts = async (req: Request, res: Response) => {
//   await handleRequest(req, res, {
//     group: ['id'],
//     attributes: [],
//     include: []
//   });
// };

// export const getLimitProducts = async (req: Request, res: Response) => {
//   await handleRequest(req, res, {
//     where: {
//       stock_quantity: {
//         [db.Sequelize.Op.lte]: 20,
//       },
//     },
//     group: ['id'],
//     attributes: [],
//     include: []
//   });
// };

// export const getDiscountPlusProducts = async (req: Request, res: Response) => {
//   await handleRequest(req, res, {
//     include: [
//       {
//         model: db.discounts,
//         attributes: ['percentage'],
//         where: {
//           percentage: {
//             [db.Sequelize.Op.gte]: 15,
//           },
//         },
//       },
//     ],
//     group: ['id'],
//     attributes: []
//   });
// };

// export const getPopularProducts = async (req: Request, res: Response) => {
//   await handleRequest(req, res, {
//     group: ['id'],
//     having: db.sequelize.where(db.sequelize.fn('AVG', db.sequelize.col('Reviews.rating')), '>', 4.5),
//   });
// };
// export const handPickedProducts = async (req: Request, res: Response) => {
//   await handleRequest(req, res, {
//     where: {
//       price: {
//         [db.Sequelize.Op.lte]: 100
//       }
//     },
//     group: ['id'],
//     having: db.sequelize.where(db.sequelize.fn('AVG', db.sequelize.col('Reviews.rating')), '>', 4.5)
//   });
// };

// export const getTrendyProducts = async (req: Request, res: Response) => {
//   await handleRequest(req, res, {
//     where: {
//       price: {
//         [db.Sequelize.Op.lte]: 100
//       }
//     },
//     group: ['id'],
//     having: db.sequelize.where(db.sequelize.fn('AVG', db.sequelize.col('Reviews.rating')), '>', 4.5)
//   });
// };


// export const getTrendyProducts = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const result = await db.products.findAll({
//       attributes: [
//         'id',
//         'name',
//         [db.Sequelize.fn('COUNT', db.Sequelize.col('orderitems.id')), 'sold'],
//        [db.sequelize.fn('AVG', db.sequelize.col('Reviews.rating')), 'DESC'],
//       ],
//       include: [
//         {
//           model: db.ordersItems,
//           attributes: [],
//         },
//         {
//           model: db.discounts,
//           attributes: ['percentage'],

//         },
//         {
//           model: db.reviews,
//           attributes: [],
//           group:['product_id']
//         },
//       ],
//       group: ['id'], 
//       order: [[db.Sequelize.fn('COUNT', db.Sequelize.col('orderitems.id')), 'DESC']],
//     });
//     res.status(200).json(result);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

// export const getTrendyProducts = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const result = await db.products.findAll({
//       attributes: [
//         'id',
//         'name',
//         [db.Sequelize.fn('COUNT', db.Sequelize.col('orderitems.id')), 'sold'],
//       ],
//       include: [
//         {
//           model: db.ordersItems,
//           attributes: [],
//         },
//         {
//           model: db.discounts,
//           attributes: ['percentage'],
//         },
//       ],
//       group: ['id'], 
//       order: [[db.Sequelize.fn('COUNT', db.Sequelize.col('orderitems.id')), 'DESC']],
//     });
//     res.status(200).json(result);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

// export const getTrendyProducts = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const result = await db.products.findAll({
//       attributes: [
//         [db.Sequelize.fn('COUNT', db.Sequelize.col('orderitems.id')), 'count'],
//         'id',
//         [db.Sequelize.fn('AVG', db.Sequelize.col('reviews.rating')), 'average_rating']
//       ],
//       include: [
//         {
//           model: db.ordersItems,
//           attributes: [],
//           duplicating: false,
//           required: true,
//           group: ['product_id'],
//           order: [[db.Sequelize.fn('COUNT', db.Sequelize.col('orderitems.id')), 'DESC']]
//         },
//         {
//           model: db.reviews,
//           attributes: [],
//           duplicating: false,
//           required: true,
//           group: ['product_id'],
//           order: [[db.Sequelize.fn('AVG', db.Sequelize.col('reviews.rating')), 'DESC']]
//         }
//       ],
//       group: ['Product.id'],
//       order: [
//         [db.Sequelize.fn('COUNT', db.Sequelize.col('orderitems.id')), 'DESC'],
//         [db.Sequelize.fn('AVG', db.Sequelize.col('reviews.rating')), 'DESC']
//       ],
//       raw: true
//     });
//     res.status(200).json(result);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };
import { Request, Response } from 'express';
import * as productService from '../Services/productService';
import {ProductQueryOptions} from '../Interfaces/productInterface'

export const generateOptions = (req: Request) => {
  return {
    sortBy: req.query.sortBy || 'ratings',
    page: parseInt(req.query.page as string, 10) || 1,
    pageSize: parseInt(req.query.pageSize as string, 10) || 9,
    brandId : req.query.brandId as string | undefined,
    categoryId : req.query.categoryId as string | undefined,
  };
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    const options = {
      group: ['id'],
      attributes: [],
      include: [],
      ...generateOptions(req), // Merge common options
    };

    const result = await productService.getProducts(options as ProductQueryOptions);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getNewArrivals = async (req: Request, res: Response) => {
  try {
    const options = {
      where: {
        createdAt: {
          [productService.Sequelize.Op.gte]: new Date(new Date().setMonth(new Date().getMonth() - 3)),
        },
      },
      group: ['id'],
      attributes: [],
      include: [],
      ...generateOptions(req), // Merge common options
    };

    const result = await productService.getNewArrivals(options as ProductQueryOptions);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getLimitProducts = async (req: Request, res: Response) => {
  try {
    const options = {
      where: {
        stock_quantity: {
          [productService.Sequelize.Op.lte]: 20,
        },
      },
      group: ['id'],
      attributes: [],
      include: [],
      ...generateOptions(req), // Merge common options
    };

    const result = await productService.getLimitProducts(options as ProductQueryOptions);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getDiscountPlusProducts = async (req: Request, res: Response) => {
  try {
    const options = {
      group: ['id'],
      attributes: [],
      include: [],
      ...generateOptions(req)
    };

    const result = await productService.getDiscountPlusProducts(options as ProductQueryOptions);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getPopularProducts = async (req: Request, res: Response) => {
  try {
    const options = {
      group: ['id'],
      having: productService.Sequelize.where(productService.Sequelize.fn('AVG', productService.Sequelize.col('Reviews.rating')), '>', 4.5),
      ...generateOptions(req), // Merge common options
    };

    const result = await productService.getPopularProducts(options as ProductQueryOptions);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const handPickedProducts = async (req: Request, res: Response) => {
  try {
    const options = {
      where: {
        price: {
          [productService.Sequelize.Op.lte]: 100,
        },
      },
      group: ['id'],
      having: productService.Sequelize.where(productService.Sequelize.fn('AVG', productService.Sequelize.col('Reviews.rating')), '>', 4.5),
      ...generateOptions(req), // Merge common 
    };

    const result = await productService.handPickedProducts(options as ProductQueryOptions);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


export const getProductDetails = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await productService.getProductDetails(req.params.product_id);
    res.status(200).json(product);
  } catch (error: any) {
    const statusCode = error.code || 500;
    res.status(statusCode).json({ error: error.message });
  }
};

import db from '../Database/Models/index'
// export const getTrendyProducts = async (req: Request, res: Response) => { 
//   const result:any = await db.ordersItems.findAll({

//   try {

//    attributes: [
//      'product_id',
//      [db.sequelize.fn('COUNT', db.sequelize.col('*')), 'count'],
//      [db.sequelize.fn('SUM', db.sequelize.col('quantity')), 'total_quantity']
//    ],include: [
//           {
//             model: db.reviews,
//             attributes: ['id','name','price',
//                     [db.Sequelize.fn('AVG', db.Sequelize.col('reviews.rating')), 'average_rating']],
//             include:[
//             {
//               model: db.reviews,
//               attributes: [],
//             },
//             {
//               model: db.discounts,
//               attributes: ['percentage'],
//             },
//             {
//               model: db.productsImages,
//               attributes: ['image_url'],
//             },
            
//           ],group: ['id'],}
//         ],
//    group: ['product_id'],
//    order: [[db.sequelize.literal('count'), 'DESC']]
// });

//    res.status(200).json(result)
//   }catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: 'Internal Server Error' });
//   }}

// export const getTrendyProducts = async (req: Request, res: Response) => {
//   try {
//     const options = {
//       group: ['id'],
//       attributes: [],
//       include: [],
//       ...generateOptions(req), // Merge common options
//     };

//     const result = await productService.getProducts(options);

// const productIds = result.data.map(product => product.id);

// const result2 = await db.ordersItems.findAll({
//   attributes: [
//     'product_id',
//     [db.sequelize.fn('COUNT', db.sequelize.col('*')), 'count'],
//     [db.sequelize.fn('SUM', db.sequelize.col('quantity')), 'total_quantity']
//   ],
//   where: {
//     product_id: {
//       [db.Sequelize.Op.in]: productIds
//     }
//   },
//   group: ['product_id']
// });

// const mappedResult = result.data.map(product => {
//   const correspondingResult2 = result2.find(r => r.product_id === product.id) || {
//     count: 0,
//     total_quantity: 0
//   };

//   return {
//     ...product,
//     result2: correspondingResult2
//   };
// });

// const finalResult = {
//   totalItems: result.totalItems,
//   totalPages: result.totalPages,
//   currentPage: result.currentPage,
//   pageSize: result.pageSize,
//   data: mappedResult
// };
// console.log(finalResult)
// res.status(200).json(finalResult);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: 'Internal Server Error' });
//   }
// };
export const getTrendyProducts = async (req: Request, res: Response) => {
  try {
    const options = {
      group: ['id'],
      attributes: [],
      include: [],
      ...generateOptions(req), // Merge common options
    };

    const result = await productService.getProducts(options as ProductQueryOptions);

    const productIds = result.data.map(product => product.id);

    const result2 = await db.ordersItems.findAll({
      attributes: [
        'product_id',
        [db.sequelize.fn('COUNT', db.sequelize.col('*')), 'count'],
        [db.sequelize.fn('SUM', db.sequelize.col('quantity')), 'total_quantity']
      ],
      where: {
        product_id: {
          [db.Sequelize.Op.in]: productIds
        }
      },
      group: ['product_id']
    });

    const mappedResult = result.data.map(product => {
      const correspondingResult2 = result2.find(r => r.product_id === product.id) || {
        count: 0,
        total_quantity: 0
      };

      return {
        id: product.id,
        name: product.name,
        // Include only necessary properties from result2
        result2: {
          count: correspondingResult2.count,
          total_quantity: correspondingResult2.total_quantity
        }
      };
    });

    const finalResult = {
      totalItems: result.totalItems,
      totalPages: result.totalPages,
      currentPage: result.currentPage,
      pageSize: result.pageSize,
      data: mappedResult
    };

    console.log(finalResult);
    res.status(200).json(finalResult);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};