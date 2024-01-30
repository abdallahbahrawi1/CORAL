import db from '../../Database/Models/index';

export const createCategory = async (categoryData: any) => {
  return await db.categories.create(categoryData);
};

export const updateCategory = async (categoryId: number, updatedData: any) => {
  const category = await db.categories.findByPk(categoryId);
  if (!category) {
    throw new Error('Category not found');
  }
  return await category.update(updatedData);
};

export const deleteCategory = async (categoryId: number) => {
  const category = await db.categories.findByPk(categoryId);
  if (!category) {
    throw new Error('Category not found');
  }
  await category.destroy();
};