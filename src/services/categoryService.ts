import db from '../Database/Models/index';
import {Category,ErrorResponse} from '../Interfaces/categoryInterface'

export const getAllCategories = async (): Promise<Category | ErrorResponse> => {
    return await db.categories.findAll();
};

export const getHandpickedCategories = async (): Promise<Category | ErrorResponse> => {
    return await db.categories.findAll({
        where: {
            name: {
                [db.Sequelize.Op.in]: ['Personal Care', 'Handbags', 'Wrist Watches', 'Sunglasses']
            }
        }
    });
};

export const getTopCategories = async (): Promise<Category | ErrorResponse> => {
    return await db.categories.findAll({
        where: {
            name: {
                [db.Sequelize.Op.in]: ['Skincare', 'Jewelry', 'Handbags','Watches', 'Eye Wear']
            }
        }
    });
};

export const getMobileCategories = async (): Promise<Category | ErrorResponse> => {
    return await db.categories.findAll({
        where: {
            name: {
                [db.Sequelize.Op.in]: ['Skincare', 'Fragrance', 'Handbags', 'Eye Wear', 'Apparels']
            }
        }
    });
};
