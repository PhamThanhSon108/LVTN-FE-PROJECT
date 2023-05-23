import React from 'react';
import Slider from 'react-slick';
import Rating from '../homeComponents/Rating';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ListProductAll } from '../../Redux/Actions/productActions';
import { useEffect } from 'react';
import { Card, CardContent, CardMedia, Skeleton, Typography } from '@mui/material';
import Product from '../Product/Product';

export default function NewProductRecommend() {
    const allProduct = useSelector((state) => state.productAll);
    const { products, loading } = allProduct;

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(ListProductAll());
    }, []);
    const SkeletonOption = window.innerWidth > 540 ? [1, 2, 3, 4, 5, 6] : [1, 2];
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
            <div className="divider-custom">

                <Typography color="primary" fontWeight={600}>
                    Sản phẩm mới
                </Typography>
            </div>
            <div style={{ maxHeight: '316px', overflow: 'hidden' }}>

                {!loading ? (
                    <Slider
                        className="col-12"
                        {...settings}

                        style={{ maxHeight: '316px', backgroundColor: 'transparent', overflow: 'hidden' }}

                    >
                        {products?.map((product, index) => (
                            <div className="col-lg-2 col-md-3 col-sm-6  mb-3" key={product._id}>
                                <div className="col-12" style={{ paddingLeft: '4px', paddingRight: '4px' }}>
                                    <Product findSimilar={false} key={product?._id} product={product} />
                                </div>
                            </div>
                        ))}
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
