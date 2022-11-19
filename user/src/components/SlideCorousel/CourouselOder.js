import React from 'react';
import Slider from 'react-slick';
import Rating from '../homeComponents/Rating';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listAllOrder } from '../../Redux/Actions/OrderActions';
import { useEffect, useState } from 'react';
import { Skeleton } from '@mui/material';

export default function CorouselOder() {
    const orderAllList = useSelector((state) => state.listAllOrder);
    const { products, loading } = orderAllList;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(listAllOrder());
    }, []);
    let SkeletonOption = window.innerWidth > 540 ? [1, 2, 3, 4, 5, 6] : [1, 2];
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 6,
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

    return (
        <div className="container corousel-container">
            <h2>Best seller</h2>
            <div></div>
            <div className="corousel" style={{ maxHeight: '340px' }}>
                {products?.length > 0 ? (
                    <Slider {...settings} style={{ maxHeight: '340px' }}>
                        {products &&
                            products?.map((product, index) => {
                                return (
                                    <div key={index} className="corousel-div">
                                        <Link to={`/product/${product._id}`} className="corousel-link">
                                            <img src={product.image} className="corousel-img"></img>
                                            <p className="corousel-noti">{product.name}</p>
                                            <div className="corousel-rating">
                                                <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                                            </div>
                                            <p className="corousel-price">${product.price?.toFixed(2)}</p>
                                        </Link>
                                    </div>
                                );
                            })}
                    </Slider>
                ) : (
                    <>
                        <div style={{ display: 'flex' }}>
                            {SkeletonOption.map(() => (
                                <div className="" style={{ margin: '15px 7.9px', width: '100%' }}>
                                    <Skeleton variant="rectangular" width={'100%'} height={209} />
                                    <Skeleton />
                                    <Skeleton />
                                    <Skeleton width="60%" />
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
