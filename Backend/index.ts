import express from 'express';
import usersRoute from './src/Routers/usersRoute';
import addressesRoute from './src/Routers/addressesRoute';
import reviewsRoute from './src/Routers/reviewsRoute';
import productRoute from './src/Routers/productRoute';
import categoryRoute from './src/Routers/categoryRoute';
import brandRoute from './src/Routers/brandRoute';
import searchRoute from './src/Routers/searchRoute';
import wishlistRoute from './src/Routers/wishlistRoute';
import ordersRoute from './src/Routers/ordersRoute';
import shoppingCartRoute from './src/Routers/shoppingCartRoute';
import adminRoutes from './src/Routers/adminRoutes';
import {checkAdmin} from './src/Middlewares/checkAdmin';

import {checkSessionKey} from './src/Middlewares/checkSession';

import cors from 'cors';
const app = express();

const port = process.env.PORT || 3000;
app.use(cors());

app.use(express.json())
app.use('/Uploads', express.static('./Uploads'));
app.use('/Images',express.static('./src/Images'))
app.use('/users', usersRoute);
app.use('/addresses',checkSessionKey,addressesRoute);
app.use('/reviews',checkSessionKey,reviewsRoute);
app.use('/products', productRoute);
app.use('/category', categoryRoute);
app.use('/brand', brandRoute);
app.use('/search', searchRoute);
app.use('/wishlist',checkSessionKey, wishlistRoute);
app.use('/orders',checkSessionKey, ordersRoute);
app.use('/shopping-cart',checkSessionKey, shoppingCartRoute);
app.use('/admin',checkAdmin,adminRoutes);





app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


