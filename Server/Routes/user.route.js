import express from 'express';
import asyncHandler from 'express-async-handler';
import { protect, admin } from '../middlewares/auth.middleware.js';
import generateToken from '../utils/generateToken.js';
import userController from '../controllers/user.controller.js';

const userRouter = express.Router();

// LOGIN
userRouter.post('/login', asyncHandler(userController.login));
// PROFILE
userRouter.get('/profile', protect, asyncHandler(userController.getProfile));
// UPDATE PROFILE
userRouter.put('/profile', protect, asyncHandler(userController.updateProfile));
userRouter.get('/auth/verify-email', asyncHandler(userController.verifyEmail));
// REGISTER
userRouter.post('/register', asyncHandler(userController.register));
// GET ALL USER ADMIN
userRouter.get('/', protect, admin, asyncHandler(userController.getUsersByAdmin));

export default userRouter;
