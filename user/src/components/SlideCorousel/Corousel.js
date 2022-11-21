import React from 'react';
import Slider from 'react-slick';
import Rating from '../homeComponents/Rating';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ListProductAll } from '../../Redux/Actions/ProductActions';
import { useEffect, useState } from 'react';
import { Box, Card, CardContent, CardMedia, Divider, Skeleton, Typography } from '@mui/material';
import { width } from '@mui/material/node_modules/@mui/system';

export default function Corousel() {
    const allProduct = useSelector((state) => state.productAll);
    const { products, loading } = allProduct;

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(ListProductAll());
    }, []);
    const SkeletonOption = window.innerWidth > 540 ? [1, 2, 3, 4, 5, 6] : [1, 2];

    // const products = [
    //     {
    //       id: 1,
    //       image: 'https://m.media-amazon.com/images/I/711+-K5DG0L._AC_UL480_FMwebp_QL65_.jpg',
    //       name: 'Amazon'
    //     },
    //     {
    //       id: 2,
    //       image: 'https://m.media-amazon.com/images/I/61Ju0tiHWML._AC_UL480_FMwebp_QL65_.jpg',
    //       name: 'Amazon Essentials'
    //     },
    //     {
    //       id: 3,
    //       name: 'Amazon 1',
    //       image: 'https://m.media-amazon.com/images/I/711+-K5DG0L._AC_UL480_FMwebp_QL65_.jpg'
    //     },
    //     {
    //       id: 4,
    //       image: 'https://m.media-amazon.com/images/I/61Ju0tiHWML._AC_UL480_FMwebp_QL65_.jpg',
    //       name: 'Amazon 2'
    //     },
    //     {
    //       id: 5,
    //       image: 'https://m.media-amazon.com/images/I/711+-K5DG0L._AC_UL480_FMwebp_QL65_.jpg',
    //       name: 'Amazon 3'
    //     },
    //     {
    //       id: 6,
    //       image: 'https://m.media-amazon.com/images/I/61Ju0tiHWML._AC_UL480_FMwebp_QL65_.jpg',
    //       name: 'Amazon 4'
    //     },
    //     {
    //       id: 7,
    //       image: 'https://m.media-amazon.com/images/I/61Ju0tiHWML._AC_UL480_FMwebp_QL65_.jpg',
    //       name: 'Amazon 5'
    //     },
    //     {
    //       id: 8,
    //       name: 'Amazon 6',
    //       image: 'https://m.media-amazon.com/images/I/711+-K5DG0L._AC_UL480_FMwebp_QL65_.jpg'
    //     },
    //     {
    //       id: 9,
    //       image: 'https://m.media-amazon.com/images/I/61Ju0tiHWML._AC_UL480_FMwebp_QL65_.jpg',
    //       name: 'Amazon 7'
    //     },
    //     {
    //       id: 10,
    //       image: 'https://m.media-amazon.com/images/I/711+-K5DG0L._AC_UL480_FMwebp_QL65_.jpg',
    //       name: 'Amazon 8'
    //     },
    //     {
    //       id: 11,
    //       image: 'https://m.media-amazon.com/images/I/61Ju0tiHWML._AC_UL480_FMwebp_QL65_.jpg',
    //       name: 'Amazon 9'
    //     },
    //     {
    //       id: 12,
    //       image: 'https://m.media-amazon.com/images/I/61Ju0tiHWML._AC_UL480_FMwebp_QL65_.jpg',
    //       name: 'Amazon  10'
    //     }
    // ]

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
        <div className="container" style={{ marginTop: '20px' }}>
            <Divider
                light
                textAlign="center"
                variant="fullWidth"
                children={
                    <h4 style={{ textAlign: 'center', marginBottom: 12, color: 'rgb(238, 77, 45)' }}>NEW PRODUCTS</h4>
                }
            />

            <div></div>
            <div className="corousel" style={{ maxHeight: '340px' }}>
                {products?.length > 0 ? (
                    <Slider {...settings} style={{ maxHeight: '340px' }}>
                        {products?.map((product, index) => {
                            return (
                                // <div key={index} className="corousel-div overflow-hidden ">
                                //     <Link to={`/product/${product._id}`} className="corousel-link">
                                //         <img src={product.image} className="corousel-img "></img>
                                //         <p className="corousel-noti">{product.name}</p>
                                //         <div className="corousel-rating">
                                //             <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                                //         </div>
                                //         <p className="corousel-price">${product.price.toFixed(2)}</p>
                                //     </Link>
                                // </div>

                                <Card className="col-sm-4 product-card">
                                    <Link to={`/product/${product._id}`} className="corousel-link">
                                        <CardMedia
                                            component="img"
                                            height="180"
                                            image={product?.image}
                                            className="corousel-img"
                                        />
                                        <CardContent>
                                            <Typography
                                                gutterBottom
                                                variant="h8"
                                                component="div"
                                                className="corousel-noti"
                                            >
                                                {product.name}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                <div className="corousel-rating">
                                                    <Rating
                                                        value={product.rating}
                                                        text={`${product.numReviews} reviews`}
                                                    />
                                                </div>
                                                <p className="corousel-price">${product.price?.toFixed(2)}</p>
                                            </Typography>
                                        </CardContent>
                                    </Link>
                                </Card>
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
