import express from 'express';
import * as shoppingCartController from '../Controllers/shoppingCartController';

const router = express.Router();


router.get('/', shoppingCartController.getUserShoppingCart);
router.post('/add', shoppingCartController.addProductToShoppingCart);
router.delete('/remove/:product_id', shoppingCartController.removeProductFromShoppingCart);
router.put('/update', shoppingCartController.updateProductQuantityInShoppingCart);
router.delete('/clear', shoppingCartController.clearUserShoppingCart);

export default router;
