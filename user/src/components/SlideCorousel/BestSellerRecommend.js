import React from 'react';
import Slider from 'react-slick';
import Rating from '../homeComponents/Rating';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { useEffect, useState } from 'react';

import Product from '../Product/Product';
import { Skeleton, Typography } from '@mui/material';
import { getBestSellerProducts } from '~/Redux/Actions/orderActions';

export default function BestSellerRecommend() {
    const orderAllList = useSelector((state) => state.bestSellerProduct);
    const { products, loading } = orderAllList;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getBestSellerProducts());
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
        <div style={{ marginTop: '20px' }}>
            <div className="row divider-custom">
                <Typography color="primary" fontWeight={600}>
                    Sản phẩm bán chạy
                </Typography>
            </div>

            <div style={{ maxHeight: '316px', overflow: 'hidden' }} className="corousel">
                {products?.length > 0 ? (
                    <Slider {...settings} style={{ maxHeight: '340px' }}>
                        {products &&
                            products?.map((product, index) => {
                                return (
                                    <div className="col-lg-2 col-md-3 col-sm-6  mb-3" key={product._id}>
                                        <div className="col-12" style={{ paddingLeft: '4px', paddingRight: '4px' }}>
                                            <Product key={product?._id} product={product} />
                                        </div>
                                    </div>
                                );
                            })}
                    </Slider>
                ) : (
                    <>
                        <div style={{ display: 'flex' }}>
                            {SkeletonOption.map((key) => (
                                <div className="" key={key} style={{ margin: '15px 7.9px', width: '100%' }}>
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
