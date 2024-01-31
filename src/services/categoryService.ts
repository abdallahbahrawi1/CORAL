import db from '../Database/Models/index';
import {Category,ErrorResponse} from '../Interfaces/categoryInterface'

export const getAllCategories = async (): Promise<Category[] | ErrorResponse> => {
    try {
      const categories = await db.categories.findAll();
      return categories;
    } catch (error) {
      console.error('Error fetching all categories:', error);
      return { error: 'Failed to fetch all categories.' };
    }
  };

export const getHandpickedCategories = async (): Promise<Category[] | ErrorResponse> => {
    try {
        const categories = await db.categories.findAll({
        where: {
            name: {
            [db.Sequelize.Op.in]: ['Personal Care', 'Handbags', 'Wrist Watches', 'Sunglasses'],
            },
        },
        });
        return categories;
    } catch (error) {
        console.error('Error fetching handpicked categories:', error);
        return { error: 'Failed to fetch handpicked categories.' };
    }
};

export const getTopCategories = async (): Promise<Category[] | ErrorResponse> => {
    try {
      const categories = await db.categories.findAll({
        where: {
          name: {
            [db.Sequelize.Op.in]: ['Skincare', 'Jewelry', 'Handbags', 'Watches', 'Eye Wear'],
          },
        },
      });
      return categories;
    } catch (error) {
      console.error('Error fetching top categories:', error);
      return { error: 'Failed to fetch top categories.' };
    }
};

export const getMobileCategories = async (): Promise<Category[] | ErrorResponse> => {
    try {
      const categories = await db.categories.findAll({
        where: {
          name: {
            [db.Sequelize.Op.in]: ['Skincare', 'Fragrance', 'Handbags', 'Eye Wear', 'Apparels'],
          },
        },
      });
      return categories;
    } catch (error) {
      console.error('Error fetching mobile categories:', error);
      return { error: 'Failed to fetch mobile categories.' };
    }
};