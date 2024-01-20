const db = require('../Database/Models/index.ts');

export const getAllCategories = async () => {
  try {
    const categories = await db.Category.findAll();
    return categories;
  } catch (error) {
    throw new Error(error as string);
  }
};
