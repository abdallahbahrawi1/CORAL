import db from '../../Database/Models/index';
import { Op } from 'sequelize';


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
  
  export const deleteProduct = async (productId: number) => {
    try {
      const product = await db.products.findByPk(productId);
  
      if (!product) {
        throw new Error('Product not found');
      }
  
      await product.destroy();
      return { message: 'Product deleted successfully' };
    } catch (error) {
      throw new Error(`Error in deleteProduct: ${error.message}`);
    }
  };

  