import db from '../../Database/Models/index';
import { Op, Sequelize } from 'sequelize';


interface ProductData {
    name: string;
    sub_title: string;
    price: number;
    stock_quantity: number;
    description: string;
    brand_id: number;
    category_id: number;
    model: string;
    discount_id?: number;
  }
  
  export const createProduct = async (productData: ProductData) => {
    try {
      const product = await db.products.create(productData);
      return product;
    } catch (error) {
      throw new Error(`Error in createProduct: ${error.message}`);
    }
  };
  
  export const updateProduct = async (productId: number, updatedData: Partial<ProductData>) => {
    try {
      const product = await db.products.findByPk(productId);
  
      if (!product) {
        throw new Error('Product not found');
      }
  
      await product.update(updatedData);
      return product;
    } catch (error) {
      throw new Error(`Error in updateProduct: ${error.message}`);
    }
  };
  
  export const getTopProductsByCountry = async (countryFilter) => {
    try {

      const query = `
      WITH cte_top_products AS (
        SELECT
          a.country,
          oi.product_id,
          SUM(oi.quantity) as total_quantity,
          ROW_NUMBER() OVER (PARTITION BY a.country ORDER BY SUM(oi.quantity) DESC) as row_num
        FROM
          orders o
          JOIN addresses a ON a.id = o.address_id
          JOIN orderitems oi ON oi.order_id = o.id
        GROUP BY
          a.country,
          oi.product_id
      )
      SELECT
        country,
        product_id,
        total_quantity
      FROM
        cte_top_products
      WHERE
        row_num <= 3
        ${countryFilter ? `AND country = :country` : ''}
      ORDER BY
        country,
        total_quantity DESC;
      `;
      
      const result = await db.sequelize.query(query, {
        type: db.sequelize.QueryTypes.SELECT,
        nest: true,
        replacements: {
          country: countryFilter,
        },
      });
      
      return result;
    } catch (error) {
      console.error(error);
      throw new Error('Internal Server Error');
    }
  };


  export const getTopCountriesForProduct = async (productId,status) => {
    try {
      const result = await db.ordersItems.findAll({
        attributes: [
          [Sequelize.fn('SUM', Sequelize.col('quantity')), 'total_quantity'],
        ],
        include: [
          {
            model: db.orders,
            as: 'Order',
            where: {
              status,
            },
            attributes: [],
            include: [
              {
                model: db.addresses,
                as: 'Address',
                attributes:  ['country'],
              },
            ],
          },
        ],
        where: {
          product_id: productId,
        },
        group: ['Order.Address.id','Order.Address.country'],
        order: [['total_quantity', 'DESC']],
        raw: true,
      });
    
      return result;
    } catch (error) {
      console.error(error);
      throw new Error('Internal Server Error');
    }
  };
  