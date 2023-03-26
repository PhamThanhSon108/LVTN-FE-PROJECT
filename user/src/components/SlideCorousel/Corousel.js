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

export default function Corousel() {
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
                <span>New products</span>
            </div>
            <div style={{ maxHeight: '340px' }}>
                {products?.length > 0 ? (
                    <Slider className="new-product-recomment" {...settings} style={{ maxHeight: '340px' }}>
                        {products?.map((product, index) => {
                            return (
                                <Card className="col-sm-2 product-card">
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
