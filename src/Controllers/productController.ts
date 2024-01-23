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
    import { Request, Response } from 'express';
const db = require('../Database/Models/index');

interface ProductQueryOptions {
  attributes: string[];
  include: any[];
  where?: any;
  group?: string[];
  order?: any;
}

const commonAttributes = [
  'id',
  'name',
  'sub_title',
  'price',
  'createdAt',
  [db.sequelize.fn('AVG', db.sequelize.col('reviews.rating')), 'average_rating'],
  [db.sequelize.fn('COUNT', db.sequelize.col('reviews.rating')), 'rating_count'],
];

const commonInclude = [
  {
    model: db.reviews,
    attributes: [],
  },
  {
    model: db.discounts,
    attributes: ['percentage'],
  },
  {
    model: db.productsImages,
    attributes: ['image_url'],
    limit: 1,
  },
];

const commonSortOptions: Record<string, any> = {
  'price-high': [['price', 'DESC']],
  'price-low': [['price', 'ASC']],
  'ratings': [[db.sequelize.fn('AVG', db.sequelize.col('reviews.rating')), 'DESC']],
  'latest': [['createdAt', 'DESC']],
  'popular': [[db.sequelize.fn('AVG', db.sequelize.col('reviews.rating')), 'DESC']],
};

const handleRequest = async (req: Request, res: Response, options: ProductQueryOptions) => {
  try {
    const sortBy = req.query.sortBy || 'ratings';
    const sortOrder = commonSortOptions[sortBy] || commonSortOptions['ratings'];

    const page = parseInt(req.query.page, 10) || 1;
    const pageSize = parseInt(req.query.pageSize, 10) || 9;

    const result = await db.products.findAll({
      subQuery: false,
      ...options,
      attributes: [...commonAttributes, ...(options.attributes || [])],
      include: [...commonInclude, ...(options.include || [])],
      order: sortOrder,
    });

    return res.status(200).json({
      totalItems: result.length,
      totalPages: Math.ceil(result.length / pageSize),
      currentPage: page,
      pageSize: pageSize,
      data: result.slice((page - 1) * pageSize,((page - 1) * pageSize)+pageSize),
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getNewArrivals = async (req: Request, res: Response) => {
  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

  await handleRequest(req, res, {
    where: {
      createdAt: {
        [db.Sequelize.Op.gte]: threeMonthsAgo.toISOString(),
      },
    },
    group: ['id'],
    attributes: [],
    include: []
  });
};

export const getProducts = async (req: Request, res: Response) => {
  await handleRequest(req, res, {
    group: ['id'],
    attributes: [],
    include: []
  });
};

export const getLimitProducts = async (req: Request, res: Response) => {
  await handleRequest(req, res, {
    where: {
      stock_quantity: {
        [db.Sequelize.Op.lte]: 20,
      },
    },
    group: ['id'],
    attributes: [],
    include: []
  });
};

export const getDiscountPlusProducts = async (req: Request, res: Response) => {
  await handleRequest(req, res, {
    include: [
      {
        model: db.discounts,
        attributes: ['percentage'],
        where: {
          percentage: {
            [db.Sequelize.Op.gte]: 15,
          },
        },
      },
    ],
    group: ['id'],
    attributes: []
  });
};

export const getPopularProducts = async (req: Request, res: Response) => {
  await handleRequest(req, res, {
    group: ['id'],
    having: db.sequelize.where(db.sequelize.fn('AVG', db.sequelize.col('reviews.rating')), '>', 4.5),
  });
};



    