import express from 'express';
import asyncHandler from 'express-async-handler';
import { admin, protect, auth } from '../middlewares/auth.middleware.js';
import productController from '../controllers/product.controller.js';
const productRouter = express.Router();

// GET ALL PRODUCT
productRouter.get('/ProductAll', asyncHandler(productController.getAllProducts));
// ADMIN GET ALL PRODUCT WITHOUT SEARCH AND PEGINATION
productRouter.get('/admin', protect, admin, asyncHandler(productController.getAllProductsByAdmin));
// PRODUCT REVIEW
productRouter.post('/:id/review', protect, asyncHandler(productController.reviewProduct));
// GET SINGLE PRODUCT
productRouter.get('/:id', asyncHandler(productController.getProduct));
// DELETE PRODUCT
productRouter.delete('/:id', protect, admin, asyncHandler(productController.deleteProductByAdmin));
// UPDATE PRODUCT
productRouter.put('/:id', protect, admin, asyncHandler(productController.updateProductByAdmin));
// CREATE PRODUCT
productRouter.post('/', protect, admin, asyncHandler(productController.createProductByAdmin));
// GET PRODUCT
productRouter.get('/', auth('user'), asyncHandler(productController.getProducts));
export default productRouter;
