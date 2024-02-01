import db from '../Database/Models/index';
import { Op } from 'sequelize';
import {ProductQueryOptions,ProductDetails,SuggestionResult,Product,PaginatedProductList} from '../Interfaces/productInterface'


const commonAttributes = [
  'id',
  'name',
  'sub_title',
  'price',
  'stock_quantity',
  'createdAt',
  [db.sequelize.fn('AVG', db.sequelize.col('Reviews.rating')), 'average_rating'],
  [db.sequelize.fn('COUNT', db.sequelize.col('Reviews.rating')), 'rating_count'],
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
  {
    model: db.brands,
    attributes: ['id','name'],
  },
  {
    model: db.categories,
    attributes: ['id','name'],
  }
];

const commonSortOptions: Record<string, any> = {
  'price-high': [['price', 'DESC']],
  'price-low': [['price', 'ASC']],
  'ratings': [[db.sequelize.fn('AVG', db.sequelize.col('Reviews.rating')), 'DESC']],
  'latest': [['createdAt', 'DESC']],
  'popular': [[db.sequelize.fn('AVG', db.sequelize.col('Reviews.rating')), 'DESC']],
};

export const Sequelize = db.Sequelize;

const handleRequest = async (options: ProductQueryOptions,searchInput?:string) => {
  try {
    const sortBy = options.sortBy || 'ratings';
    const sortOrder = commonSortOptions[sortBy] || commonSortOptions['ratings'];
    const whereConditions: any = {}; 
    if (searchInput) {
      // Include both product name and brand name in the search conditions
      whereConditions[Op.or] = [
        {
          name: {
            [Op.like]: `%${searchInput}%`,
          },
        },
        {
          '$Brand.name$': {
            [Op.like]: `%${searchInput}%`,
          },
        },
      ];
    }
    if (options.brandId) {
      whereConditions.brand_id = options.brandId;
    }

    if (options.categoryId) {
      whereConditions.category_id = options.categoryId;
    }
    const mergedWhereConditions = { ...options.where, ...whereConditions };

    const result = await db.products.findAll({
      subQuery: false,
      ...options,
      where: mergedWhereConditions,
      attributes: [...commonAttributes, ...(options.attributes || [])],
      include: [...commonInclude, ...(options.include || [])],
      order: sortOrder,
    });
    return {
      totalItems: result.length as number ,
      totalPages: Math.ceil(result.length / options.pageSize as number) as number,
      currentPage: options.page as number,
      pageSize: options.pageSize as number,
      data: result.slice((options.page - 1) * options.pageSize, (options.page - 1) * options.pageSize + options.pageSize),
    };
  } catch (error) {
    throw new Error('Internal Server Error');
  }
};

export const getNewArrivals = async (options: ProductQueryOptions): Promise<PaginatedProductList> => {
  try {
    const result = await handleRequest(options);
    return result;
  } catch (error) {
    throw new Error('Internal Server Error');
  }
};

export const getProducts = async (options: ProductQueryOptions): Promise<PaginatedProductList> => {
  try {
    const result = await handleRequest(options);
    return result;
  } catch (error) {
    throw new Error('Internal Server Error');
  }
};

export const getLimitProducts = async (options: ProductQueryOptions): Promise<PaginatedProductList> => {
  try {
    const result = await handleRequest(options);
    return result;
  } catch (error) {
    throw new Error('Internal Server Error');
  }
};

export const getDiscountPlusProducts = async (options: ProductQueryOptions): Promise<PaginatedProductList> => {
  try {
    const include = [
      {
        model: db.discounts,
        attributes: ['percentage'],
        where: {
          percentage: {
            [Sequelize.Op.gte]: 15,
          },
        },
      },
    ];

    const result = await handleRequest({ ...options, include });
    return result;
  } catch (error) {
    throw new Error('Internal Server Error');
  }
};

export const getTrendyProducts = async (options: ProductQueryOptions): Promise<PaginatedProductList> => {
  try { const result = await db.products.findAll({
    attributes: [
      'id',
      'name',
      'sub_title',
      'price',
      [Sequelize.fn('SUM', Sequelize.col('OrderItems.quantity')), 'quantity_sold'],
      [Sequelize.fn('COUNT', Sequelize.col('OrderItems.id')), 'order_count'],
      [db.sequelize.fn('AVG', db.sequelize.col('Reviews.rating')), 'average_rating'],
      [db.sequelize.fn('COUNT', db.sequelize.col('Reviews.rating')), 'rating_count'],
    ],
    include: [
      {
        model: db.ordersItems,
        as: 'OrderItems',
        attributes:[]
      },
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
    ],
    group: ['Product.id'],

  })
    return result;
  } catch (error) {
    throw new Error('Internal Server Error');
  }
};

export const getPopularProducts = async (options: ProductQueryOptions): Promise<PaginatedProductList> => {
  try {
    const result = await handleRequest(options);
    return result;
  } catch (error) {
    throw new Error('Internal Server Error');
  }
};

export const handPickedProducts = async (options: ProductQueryOptions): Promise<PaginatedProductList> => {
  try {
    const result = await handleRequest(options);
    return result;
  } catch (error) {
    throw new Error('Internal Server Error');
  }
};

export const getSearchResults  = async (options: ProductQueryOptions,searchInput): Promise<PaginatedProductList> => {
  try {
    const result = await handleRequest(options,searchInput);
    return result;
  } catch (error) {
    throw new Error('Internal Server Error');
  }
};

export const getSuggestions  = async (searchInput):Promise<SuggestionResult> => {
  try {
    const products = await db.products.findAll({
      attributes: ['name'],
      where: {
        [db.Sequelize.Op.or]: [
          { name: { [db.Sequelize.Op.like]: `${searchInput}%` } },  // Match at the start
          { name: { [db.Sequelize.Op.like]: `% ${searchInput}%` } } // Match after a space
        ]
      }
    });
    
    const brands = await db.brands.findAll({
      attributes: ['name'],
      where: {
        [db.Sequelize.Op.or]: [
          { name: { [db.Sequelize.Op.like]: `${searchInput}%` } },  // Match at the start
          { name: { [db.Sequelize.Op.like]: `% ${searchInput}%` } } // Match after a space
        ]
      }
    });
    return { products, brands };
  
  } catch (error) {
    throw new Error('Internal Server Error');
  }}
export const getProductDetails = async (requested_id):Promise<ProductDetails> => {
    try {
      const details = await db.products.findOne({
        attributes: [
          'id',
          'name',
          'sub_title',
          'model',
          'price',
          'stock_quantity',
          'description',
          [db.sequelize.fn('AVG', db.sequelize.col('Reviews.rating')), 'average_rating'],
          [db.sequelize.fn('COUNT', db.sequelize.col('Reviews.rating')), 'rating_count']
        ],
        include: [
          {
            model: db.reviews,
            attributes: []
          },
          {
            model: db.discounts,
            attributes: ['percentage']
          },
          {
            model: db.brands,
            attributes: ['name','id']
          },
          {
            model: db.categories,
            attributes: ['name','id']
          },
        
        ],
        where: {
          id: requested_id
        },
        group: ['id']
      });
      const reviews = await db.reviews.findAll({
        where: {
          product_id: requested_id
        },
        include:[
          {
            model: db.users,
            attributes: ['username']
          }
        ]
      });
      const images = await db.productsImages.findAll({
        where: {
          product_id: requested_id
        }
      });
      const related_products = await db.products.findAll({
        where: {
          id: {
            [db.Sequelize.Op.not]: requested_id 
          }
        },
        include: [
          {
            model: db.reviews,
            attributes: []
          },
          {
            model: db.discounts,
            attributes: ['percentage']
          },
          {
            model: db.productsImages,
            attributes: ['image_url']
          },
          {
            model: db.brands,
            attributes: ['name']
          },
          {
            model: db.categories,
            attributes: ['name'],
            where: {
              name: details.Category.name
            }
          }
        ]
      });
      return ({ details,reviews,images,related_products });
    } catch (error:any) {
        if (error.code) {
            throw { code: error.code, message: error.message };
          } else {
            throw { code: 500, message: 'Internal Server Error' };
          }
      }
  };
  