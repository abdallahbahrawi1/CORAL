import db from '../Database/Models/index';





export const getProductDetails = async (requested_id) => {
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
          [db.sequelize.fn('AVG', db.sequelize.col('reviews.rating')), 'average_rating'],
          [db.sequelize.fn('COUNT', db.sequelize.col('reviews.rating')), 'rating_count']
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
            attributes: ['name']
          },
          {
            model: db.categories,
            attributes: ['name']
          }
        ],
        where: {
          id: requested_id
        },
        group: ['id']
      });
      const reviews = await db.reviews.findAll({
        where: {
          product_id: requested_id
        }
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
    } catch (error) {
        if (error.code) {
            throw { code: error.code, message: error.message };
          } else {
            throw { code: 500, message: 'Internal Server Error' };
          }
      }
  };
  