import React, { useState } from 'react';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { Skeleton, Typography } from '@mui/material';

export default function SliderOfProductImage({ images }) {
    const [imageIsChoose, setImageIsChoose] = useState('');
    let SkeletonOption = window.innerWidth > 540 ? [1, 2, 3, 4, 5, 6] : [1, 2];
    const [currentImage, setCurrentImage] = useState(0);
    const settings = {
        dots: false,
        infinite: true,
        speed: 800,
        slidesToShow: 6,
        slidesToScroll: 6,
        initialSlide: currentImage,
        autoplay: true,
        autoplaySpeed: 3000,
        cssEase: 'linear',
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 6,
                    slidesToScroll: 6,
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
            <div style={{ height: images?.length > 1 ? 'calc(100% - 80px)' : '100%' }}>
                <img alt="Hình ảnh sản phẩm" src={imageIsChoose || images[0]} style={{ height: '100%' }} />
            </div>
            {images?.length > 1 ? (
                <div style={{ maxHeight: '80px', overflow: 'hidden', marginTop: '4px' }} className="col-12">
                    <Slider {...settings} style={{ maxHeight: '80px' }} className="col-12">
                        {images &&
                            images?.map((image, index) => {
                                return (
                                    <div
                                        onMouseEnter={() => setImageIsChoose(image)}
                                        className="col-3"
                                        key={image}
                                        style={{ maxHeight: '80px' }}
                                    >
                                        <div
                                            style={{
                                                cursor: 'pointer',
                                                paddingLeft: '1.5px',
                                                paddingRight: '1.5px',
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                                border: imageIsChoose === image ? '2px solid red' : '',
                                            }}
                                        >
                                            <img src={image} className="col-12" alt="Hình ảnh của sản phẩm" />
                                        </div>
                                    </div>
                                );
                            })}
                    </Slider>
                </div>
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
