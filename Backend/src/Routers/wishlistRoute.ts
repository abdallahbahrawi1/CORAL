import express from 'express';
import {getUserWishlist,removeProductFromWishlist,addProductToWishlist,toggleProductInWishlist,DeleteUserWishlist} from '../Controllers/wishlistController';
const router = express.Router();



router.post('/toggle/',toggleProductInWishlist ),
router.post('/product',addProductToWishlist),
router.delete('/product/:product_id',removeProductFromWishlist),
router.get('/',getUserWishlist );
router.delete('/',DeleteUserWishlist );



export default router