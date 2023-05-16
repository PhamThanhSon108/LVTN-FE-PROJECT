import React, { useState } from 'react';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { Skeleton, Typography } from '@mui/material';

export default function SliderOfProductImage({ images }) {
    let SkeletonOption = window.innerWidth > 540 ? [1, 2, 3, 4, 5, 6] : [1, 2];
    const [currentImage, setCurrentImage] = useState(0);
    const settings = {
        dots: false,
        infinite: true,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: currentImage,
        autoplay: true,
        autoplaySpeed: 3000,
        cssEase: 'linear',
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false,
                    initialSlide: 0,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
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
        <div style={{ maxHeight: '100%', overflow: 'hidden' }} className="col-12">
            {images?.length > 0 ? (
                <Slider {...settings} style={{ maxHeight: '340px' }}>
                    {images &&
                        images?.map((image, index) => {
                            return (
                                <div className="col-12" key={image}>
                                    <img className="col-12" src={image} alt="Hình ảnh của sản phẩm" />
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
    );
}
