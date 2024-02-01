import db from "../Database/Models/index";
import {Brand,ErrorResponse} from '../Interfaces/brandInterface'


export const getAllBrands = async (): Promise<Brand | ErrorResponse> => {
  try {
    const brands = await db.brands.findAll();
    return brands;
  } catch (error) {
    return { error: 'Failed to get the brands.' };
  }
};

export const getTopBrands = async (): Promise<Brand[] | ErrorResponse> => {
  try {
    const topBrands = await db.brands.findAll({
      where: {
        name: {
          [db.Sequelize.Op.in]: ["Zara", "Prada", "H&M", "Dolce & Gabbana", "Chanel", "Biba"],
        },
      },
    });

    return topBrands;
  } catch (error) {
    console.error('Error fetching top brands:', error);
    return { error: 'Failed to fetch top brands.' };
  }
};

