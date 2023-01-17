import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ListSlider } from '../Redux/Actions/sliderAction';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Skeleton } from '@mui/material';
import './styles.scss';

export default function Sliders() {
    const sliderList = useSelector((state) => state.sliderLoad);
    const { slider } = sliderList;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(ListSlider());
    }, []);
    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 1000,
        autoplaySpeed: 4000,
        cssEase: 'linear',
    };
    return (
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '15px' }}>
            <div class=" slider-container ">
                {slider?.length === 0 ? (
                    <Skeleton variant="rectangular" width={'100%'} height={'25vh'} />
                ) : (
                    <>
                        <Slider {...settings} className="slider-left-container">
                            {slider?.map((value, index) => {
                                return (
                                    <div key={index} className="slider-left-wrap d-flex align-items-center ">
                                        <img src={value.url}></img>
                                    </div>
                                );
                            })}
                        </Slider>
                        <div className="slider-right-wrap">
                            <img className="slider-image" src={slider[0]?.url}></img>
                            <img className="slider-image" src={slider[3]?.url}></img>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
