import db from '../../Database/Models/index';

export const createDiscount = async (discountData: any) => {
  const discount = await db.discounts.create(discountData);
  return discount;
};

export const updateDiscount = async (discountId: number, updatedData: any) => {
  const discount = await db.discounts.findByPk(discountId);

  if (!discount) {
    throw new Error('Discount not found');
  }

  await discount.update(updatedData);
  return discount;
};

export const deleteDiscount = async (discountId: number) => {
  const discount = await db.discounts.findByPk(discountId);

  if (!discount) {
    throw new Error('Discount not found');
  }

  await discount.destroy();
};

// export const applyDiscount = async (discountId: number, productId?: number, categoryId?: number, brandId?: number) => {
//   const discount = await db.discounts.findByPk(discountId);

//   if (!discount) {
//     throw new Error('Discount not found');
//   }

//   // If productId is provided, apply discount to a specific product
//   if (productId) {
//     const product = await db.products.findByPk(productId);

//     if (!product) {
//       throw new Error('Product not found');
//     }

//     await product.setDiscount(discount);
//   }

//   // If categoryId is provided, apply discount to all products in the category
//   if (categoryId) {
//     const productsInCategory = await db.products.findAll({
//       where: { category_id: categoryId },
//     });

//     await Promise.all(productsInCategory.map(product => product.setDiscount(discount)));
//   }

//   // If brandId is provided, apply discount to all products in the brand
//   if (brandId) {
//     const productsInBrand = await db.products.findAll({
//       where: { brand_id: brandId },
//     });

//     await Promise.all(productsInBrand.map(product => product.setDiscount(discount)));
//   }

//   return discount;
// };
export const applyDiscount = async (
    discountId: number,
    productId?: number,
    categoryId?: number,
    brandId?: number
  )=> {
    try {
      const discount = await db.discounts.findByPk(discountId);
  
      if (!discount) {
        throw { code: 404, message: 'Discount not found' };
      }
  
      // If productId is provided, apply discount to a specific product
      if (productId) {
        const product = await db.products.findByPk(productId);
  
        if (!product) {
          throw { code: 404, message: 'Product not found' };
        }
  
        await product.setDiscount(discount);
      }
  
      // If both categoryId and brandId are provided, apply discount to products in both category and brand
      if (categoryId && brandId) {
        const productsInCategoryAndBrand = await db.products.findAll({
          where: { category_id: categoryId, brand_id: brandId },
        });
  
        await Promise.all(productsInCategoryAndBrand.map(product => product.setDiscount(discount)));
      } else {
        // If categoryId is provided, apply discount to all products in the category
        if (categoryId) {
          const productsInCategory = await db.products.findAll({
            where: { category_id: categoryId },
          });
  
          await Promise.all(productsInCategory.map(product => product.setDiscount(discount)));
        }
  
        // If brandId is provided, apply discount to all products in the brand
        if (brandId) {
          const productsInBrand = await db.products.findAll({
            where: { brand_id: brandId },
          });
  
          await Promise.all(productsInBrand.map(product => product.setDiscount(discount)));
        }
      }
  
      return discount;
    } catch (error: any) {
      if (error.code) {
        throw { code: error.code, message: error.message };
      } else {
        throw { code: 500, message: 'Internal Server Error' };
      }
    }
  };
  