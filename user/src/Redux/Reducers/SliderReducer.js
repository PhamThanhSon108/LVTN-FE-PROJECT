import React from 'react';
import { SLIDER_FAIL, SLIDER_REQUEST, SLIDER_SUCCESS } from '../Constants/SliderConstants';

export const Sliderload = (
    state = { data: { sliders: [], banners: [] }, isloading: false, isSuccess: false },
    action,
) => {
    switch (action.type) {
        case SLIDER_REQUEST:
            return { loading: true, data: [] };
        case SLIDER_SUCCESS:
            return {
                loading: false,
                data: action.payload?.data,
            };
        case SLIDER_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
