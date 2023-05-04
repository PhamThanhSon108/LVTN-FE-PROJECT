import React, { useEffect } from 'react';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';

import { Avatar, Card } from '@mui/material';

import './styles.scss';
import { useDispatch, useSelector } from 'react-redux';
import { ListCategory } from '~/Redux/Actions/categoryActions';
export default function CategorySlider() {
    const dispatch = useDispatch();
    const lcategories = useSelector((state) => state.CategoryList);
    const { categories } = lcategories;
    useEffect(() => {
        dispatch(ListCategory());
    }, [dispatch]);

    return (
        <div>
            {categories?.map((category, index) => {
                return (
                    <Card key={category._id}>
                        <Link to={`search?category=${category._id}`} className="corousel-link">
                            <div className="slider-img-wrap">
                                <Avatar
                                    sx={{ width: 56, height: 56 }}
                                    sizes="large"
                                    src={category?.image}
                                    alt={category?.name}
                                />
                            </div>
                            <div className="slider-body-wrap">
                                <p>{category.name}</p>
                            </div>
                        </Link>
                    </Card>
                );
            })}
        </div>
    );
}
