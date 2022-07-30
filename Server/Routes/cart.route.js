import express from 'express';
import asyncHandler from 'express-async-handler';
import { protect } from '../middlewares/auth.middleware.js';
import cartController from '../controllers/cart.controller.js';

const cartRouter = express.Router();

cartRouter.post('/delete', asyncHandler(cartController.removeItemFromCart));
cartRouter.get('/:id', asyncHandler(cartController.getCart));
cartRouter.delete('/:id', protect, asyncHandler(cartController.clearCart));
cartRouter.post('/', protect, asyncHandler(cartController.addToCart));

export default cartRouter;
