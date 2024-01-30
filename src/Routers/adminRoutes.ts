import express from 'express';
// import adminBrandRoute from './adminBrandRoute';  // Import your admin-specific route files
// import adminCategoryRoute from './adminCategoryRoute';
import adminRoute from './admin/adminRoute';
import userRoute from './admin/userRoute';
import productRoute from './admin/productRoute';
import brandRoute from './admin/brandRoute';
import categoryRoute from './admin/categoryRoute';
import discountRoute from './admin/discountRoute';
import orderRoute from './admin/orderRoute';

// Import other admin route files as needed

const router = express.Router();

// Middleware specific to admin routes (if any)
// router.use(adminMiddleware);

// Admin-specific routes
// router.use('/brand', adminBrandRoute);
// router.use('/category', adminCategoryRoute);
router.use('/users', userRoute);
router.use('/brands', brandRoute);
router.use('/category', categoryRoute);
router.use('/products', productRoute);
router.use('/discounts', discountRoute);
router.use('/orders', orderRoute);

router.use('/', adminRoute);
// Add other admin routes as needed

export default router;