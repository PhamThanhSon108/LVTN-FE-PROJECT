import React, { useEffect } from 'react';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';

import { Box, Card, CardContent, CardMedia, Divider, Skeleton, Typography } from '@mui/material';

import './styles.scss';
import { useDispatch, useSelector } from 'react-redux';
import { ListCategory } from '~/Redux/Actions/categoryActions';
export default function CategorySlider() {
    const dispatch = useDispatch();
    const lcategories = useSelector((state) => state.CategoryList);
    const { categories } = lcategories;
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 10,
        slidesToScroll: 10,
        initialSlide: 0,

        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    infinite: true,
                    dots: false,
                    initialSlide: 0,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 0,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 0,
                },
            },
        ],
    };
    useEffect(() => {
        dispatch(ListCategory());
    }, [dispatch]);

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center' }} className={'row'}>
                {
                    <Slider style={{ width: '80%', height: '135.5px', padding: 0 }} {...settings}>
                        {categories?.map((category, index) => {
                            return (
                                <Card className="col-sm-2 product-card-custom">
                                    <Link to={`search?category=${category._id}`} className="corousel-link">
                                        <div className="slider-img-wrap">
                                            <img
                                                src={
                                                    'https://res.cloudinary.com/nocompanyforsure/image/upload/v1673800868/kbqpd6rohhxp1cbpmegr.png'
                                                }
                                            />
                                        </div>
                                        <div className="slider-body-wrap">
                                            <p>{category.name}</p>
                                        </div>
                                    </Link>
                                </Card>
                            );
                        })}
                    </Slider>
                }
            </div>
        </>
    );
}
