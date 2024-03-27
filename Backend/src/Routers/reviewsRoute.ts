import express from 'express';
import {getAllUserReviews,postReview,updateReview,deleteReview} from '../Controllers/reviewController';
const router = express.Router();



router.post('/:product_id',postReview);
router.put('/:product_id',updateReview);
router.delete('/:product_id',deleteReview);
router.get('/',getAllUserReviews );


export default router