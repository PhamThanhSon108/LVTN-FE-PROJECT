import React, { Fragment } from 'react';
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
    const { data } = sliderList;
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
            <div class="slider-container " style={{ maxHeight: '252px', overflow: 'hidden', objectFit: 'cover' }}>
                <Fragment>
                    {data?.sliders?.length > 0 ? (
                        <Slider
                            style={{ maxHeight: '252px', overflow: 'hidden', objectFit: 'cover' }}
                            {...settings}
                            className="slider-left-container"
                        >
                            {data?.sliders?.map((value, index) => {
                                return (
                                    <div key={index} className="slider-left-wrap d-flex align-items-center ">
                                        <img alt="Banner 01" src={value.image}></img>
                                    </div>
                                );
                            })}
                        </Slider>
                    ) : (
                        <Skeleton variant="rectangular" width={'70%'} height={'252px'} />
                    )}
                    {data?.banners?.length > 0 ? (
                        <div className="slider-right-wrap">
                            <img
                                style={{ objectFit: 'cover' }}
                                className="slider-image"
                                alt="Banner 02"
                                src={data?.banners?.[0]?.image}
                            ></img>
                            <img
                                style={{ objectFit: 'cover', height: '100%' }}
                                className="slider-image"
                                alt="Banner 03"
                                src={data?.banners?.[1]?.image}
                            ></img>
                        </div>
                    ) : (
                        <div
                            style={{
                                width: '30%',
                                marginLeft: 6,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                height: '100%',
                            }}
                        >
                            <Skeleton variant="rectangular" width={'100%'} height={'124px'} />
                            <Skeleton variant="rectangular" width={'100%'} height={'124px'} />
                        </div>
                    )}
                </Fragment>
            </div>
        </div>
    );
}
