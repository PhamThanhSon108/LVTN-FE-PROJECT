import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import YAML from 'yamljs';
import swaggerUiExpress from 'swagger-ui-express';
import connectDatabase from './config/db.config.js';
import ImportData from './DataImport.js';
import productRouter from './routes/product.route.js';
import { errorHandler, notFound } from './middlewares/error.middleware.js';
import userRouter from './routes/user.route.js';
import orderRouter from './routes/order.route.js';
import sliderRouter from './routes/slider.route.js';
import cartRouter from './routes/cart.route.js';
import categoryRouter from './routes/category.route.js';
import multer from 'multer';
import path from 'path';
import Upload from './Routes/Upload.js';
import { appendFileSync } from 'fs';

dotenv.config();
connectDatabase();
const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

//swagger
const swaggerDocument = YAML.load('./config/swagger.config.yaml');
app.use(
    '/fashionshopswagger',
    swaggerUiExpress.serve,
    swaggerUiExpress.setup(swaggerDocument, {
        swaggerOptions: {
            docExpansion: 'none',
        },
    }),
);
// API
app.use('/api/carts', cartRouter);
app.use('/api/sliders', sliderRouter);
app.use('/api/import', ImportData);
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);
app.use('/api/categories', categoryRouter);
app.get('/api/config/paypal', (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID);
});
app.use('/api/upload-profile-pic', Upload);

// ERROR HANDLER
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 1000;

app.listen(PORT, console.log(`server run in port ${PORT}`));
