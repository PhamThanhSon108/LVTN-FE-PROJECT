import express from 'express';
import asyncHandler from 'express-async-handler';
import { admin, protect } from '../middlewares/auth.middleware.js';
import categoryController from '../controllers/category.controller.js';

const categoryRouter = express.Router();

categoryRouter.get(
    '/',
    // protect,
    asyncHandler(categoryController.getCategories),
);
categoryRouter.delete(
    '/:id',
    // admin,
    // protect,
    asyncHandler(categoryController.deleteCategory),
);

categoryRouter.post('/', protect, asyncHandler(categoryController.createCategory));
categoryRouter.put('/', protect, asyncHandler(categoryController.updateCategory));

export default categoryRouter;
