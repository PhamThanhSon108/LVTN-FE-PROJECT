import express from 'express';
import asyncHandler from 'express-async-handler';
import { protect, admin, auth } from '../middlewares/auth.middleware.js';
import userController from '../controllers/user.controller.js';

const userRouter = express.Router();

// Login
userRouter.post('/login', asyncHandler(userController.login));
// Get profile
userRouter.get('/profile', protect, asyncHandler(userController.getProfile));
// Update profile
userRouter.put('/profile', protect, asyncHandler(userController.updateProfile));
// Verify email
userRouter.patch('/auth/verify-email', asyncHandler(userController.verifyEmail));
// Register
userRouter.post('/register', asyncHandler(userController.register));
// Change password
userRouter.patch('/auth/change-password', protect, asyncHandler(userController.changePassword));
// Forgot password
userRouter.patch('/auth/forgot-password', asyncHandler(userController.forgotPassword));
// Reset password
userRouter.patch('/auth/reset-password', asyncHandler(userController.resetPassword));
// Cancel verify email
userRouter.patch('/auth/cancel-verify-email', asyncHandler(userController.cancelVerifyEmail));
// Cancel reset password
userRouter.patch('/auth/cancel-reset-password', asyncHandler(userController.cancelResetPassword));
// Get all user by admin
userRouter.get('/', protect, auth('admin'), asyncHandler(userController.getUsersByAdmin));
export default userRouter;
