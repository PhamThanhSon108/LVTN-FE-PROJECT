import express from 'express';
import asyncHandler from 'express-async-handler';
import { admin, protect } from '../middlewares/auth.middleware.js';
import sliderController from '../controllers/slider.controller.js';

const sliderRouter = express.Router();

sliderRouter.get('/', asyncHandler(sliderController.getSliders));

sliderRouter.delete('/:id', protect, admin, asyncHandler(sliderController.deleteSliderByAdmin));

sliderRouter.post('/', protect, admin, asyncHandler(sliderController.createSliderByAdmin));

export default sliderRouter;
