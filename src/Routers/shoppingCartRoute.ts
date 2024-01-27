import express from 'express';
import * as shoppingCartController from '../Controllers/shoppingCartController';

const router = express.Router();

// Get user's shopping cart
router.get('/', shoppingCartController.getUserShoppingCart);

// Add product to shopping cart
router.post('/add', shoppingCartController.addProductToShoppingCart);

// Remove product from shopping cart
router.delete('/remove/:product_id', shoppingCartController.removeProductFromShoppingCart);

// Update product quantity in shopping cart
router.put('/update', shoppingCartController.updateProductQuantityInShoppingCart);

// Clear user's shopping cart
router.delete('/clear', shoppingCartController.clearUserShoppingCart);

export default router;
