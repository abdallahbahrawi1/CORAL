import db from "../Database/Models/index";
import {Brand,ErrorResponse} from '../Interfaces/brandInterface'
export const getAllBrands = async (): Promise<Brand | ErrorResponse> => {
  return await db.brands.findAll();
};

export const getTopBrands = async (): Promise<Brand | ErrorResponse> => {
  return await db.brands.findAll({
    where: {
      name: {
        [db.Sequelize.Op.in]: [
          "Zara",
          "Prada",
          "H&M",
          "Dolce & Gabbana",
          "Chanel",
          "Biba",
        ],
      },
    },
  });
};
