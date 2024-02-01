import db from '../../Database/Models/index';

export const createBrand = async (brandData: any) => {
  return await db.brands.create(brandData);
};

export const updateBrand = async (brandId: number, updatedData: any) => {
  const brand = await db.brands.findByPk(brandId);
  if (!brand) {
    throw new Error('Brand not found');
  }
  return await brand.update(updatedData);
};

