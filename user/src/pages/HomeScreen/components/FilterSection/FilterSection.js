import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useHistory } from 'react-router-dom';
import isEmpty from 'validator/lib/isEmpty';

import { TreeItem, TreeView, treeItemClasses } from '@mui/lab';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { Typography, styled } from '@mui/material';
import Rating from '../Rating/Rating';
import { ListCategory } from '~/Redux/Actions/categoryActions';
import styles from './FilterSection.module.scss';

const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => ({
    color: theme.palette.text.secondary,
    [`& .${treeItemClasses.content}`]: {
        color: theme.palette.text.secondary,

        paddingRight: theme.spacing(1),
        padding: '4px 4px',

        '&.Mui-expanded': {
            fontWeight: theme.typography.fontWeightRegular,
        },
        '&:hover': {
            backgroundColor: theme.palette.action.hover,
        },
        '&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused': {
            backgroundColor: `var(--tree-view-bg-color, ${theme.palette.action.selected})`,
            color: 'var(--tree-view-color)',
        },
        [`& .${treeItemClasses.label}`]: {
            fontWeight: 'inherit',
            color: 'inherit',
        },
    },
    [`& .${treeItemClasses.group}`]: {
        marginLeft: 0,
        [`& .${treeItemClasses.content}`]: {
            paddingLeft: theme.spacing(2),
        },
    },
}));

export default function FilterSection({ setRating, setMinPrice, setCategory, setMaxPrice, rating, keyword }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const lcategories = useSelector((state) => state.CategoryList);
    const { categories } = lcategories;
    const [curentMinPrice, setCurentMinPrice] = useState('');
    const [curentMaxPrice, setCurentMaxPrice] = useState('');

    //xủ lí logic check form
    const [price, SetPrice] = useState({});
    const checkPrice = () => {
        const msg = {};
        if (isEmpty(curentMinPrice)) {
            msg.name = 'Please input your price';
        } else {
            if (curentMinPrice < 0) {
                msg.name = 'Please enter the positive value';
            } else {
                if (isNaN(curentMinPrice)) {
                    msg.name = 'Please enter the number';
                }
            }
        }
        if (isEmpty(curentMaxPrice)) {
            msg.name = 'Please input your price';
        } else {
            if (curentMaxPrice < 0) {
                msg.name = 'Please enter the positive value';
            } else {
                if (isNaN(curentMaxPrice)) {
                    msg.name = 'Please enter the number';
                } else {
                    if (Number(curentMinPrice) > Number(curentMaxPrice)) {
                        msg.name = 'MinPrice is smaller MaxPrice';
                    }
                }
            }
        }
        SetPrice(msg);
        if (Object.keys(msg).length > 0) return false;
        return true;
    };
    const ClearHandle = () => {
        history.push(`?keyword=${keyword}`);
        setCategory('');
        setRating('');
        setMaxPrice('');
        setMinPrice('');
        setCurentMaxPrice('');
        setCurentMinPrice('');
    };
    const ApplyHandler = () => {
        if (!checkPrice()) return;
        setMinPrice(curentMinPrice);
        setMaxPrice(curentMaxPrice);
    };
    useEffect(() => {
        dispatch(ListCategory());
    }, [dispatch]);
    return (
        <div className="section-div col-lg-2 col-md-3">
            <div className="Category-section">
                <div className="section-flex">
                    <Typography noWrap variant="button" color="text.secondary">
                        DANH MỤC
                    </Typography>
                </div>

                <TreeView
                    aria-label="file system navigator"
                    defaultCollapseIcon={<ArrowDropDownIcon />}
                    defaultExpandIcon={<ArrowRightIcon />}
                    sx={{ flexGrow: 1, overflowY: 'auto', mb: 2 }}
                    disabledItemsFocusable={true}
                >
                    {categories?.map((category) => (
                        <StyledTreeItemRoot
                            onClick={() => {
                                history.push(`?keyword=${keyword}?category=${category._id}`);
                                setCategory(category._id);
                            }}
                            key={category._id}
                            nodeId={category._id}
                            label={category.name}
                            sx={{ mb: '4px' }}
                        >
                            {category?.children.length > 0
                                ? category.children.map((childrenCategory) => (
                                      <StyledTreeItemRoot
                                          key={childrenCategory._id}
                                          nodeId={childrenCategory._id}
                                          label={childrenCategory.name}
                                      />
                                  ))
                                : null}
                        </StyledTreeItemRoot>
                    ))}
                </TreeView>
            </div>
            <div className="Category-search">
                <div className="section-flex">
                    <Typography noWrap variant="button" color="text.secondary">
                        LỌC
                    </Typography>
                </div>

                <div className="distance-price">
                    <Typography noWrap variant="body1" color="text.secondary">
                        Khoảng giá
                    </Typography>
                    <div className="distance-price__flex" style={{ display: 'flex', alignItems: 'center' }}>
                        <input
                            type="number"
                            placeholder="$Min"
                            onChange={(e) => setCurentMinPrice(e.target.value)}
                            value={curentMinPrice}
                            min="0"
                        ></input>
                        <label>-</label>
                        <input
                            type="number"
                            placeholder="$Max"
                            onChange={(e) => setCurentMaxPrice(e.target.value)}
                            value={curentMaxPrice}
                            min="1"
                        ></input>
                    </div>
                    <p style={{ fontSize: '14px', color: 'red' }}>{price.name}</p>
                    <button className="distance-price__submit" onClick={ApplyHandler}>
                        Áp dụng
                    </button>
                </div>
                <div className="assess-star">
                    <Typography sx={{ mt: 1 }} noWrap variant="body1" color="text.secondary">
                        Đánh giá
                    </Typography>
                    <div className="assess-star__div">
                        <div display={{ display: 'flex', alignItems: 'center' }}>
                            <input
                                type="radio"
                                style={{ display: 'none' }}
                                className="rating"
                                name="star"
                                id="five"
                                value={'5'}
                                onClick={(e) => {
                                    setRating(e.target.value);
                                }}
                            ></input>
                            <label for="five" className={rating === '5' ? 'rating-color' : ' '}>
                                <Rating value="5"></Rating>
                            </label>
                        </div>
                        <div display={{ display: 'flex', alignItems: 'center' }}>
                            <input
                                type="radio"
                                style={{ display: 'none' }}
                                className="star-none"
                                name="star"
                                id="four"
                                value={'4'}
                                onClick={(e) => {
                                    setRating(e.target.value);
                                }}
                            ></input>
                            <label for="four" className={rating === '4' ? 'rating-color' : ' '}>
                                <Rating value="4" text={'& up'}></Rating>
                            </label>
                        </div>
                        <div display={{ display: 'flex', alignItems: 'center' }}>
                            <input
                                type="radio"
                                style={{ display: 'none' }}
                                className="star-none"
                                name="star"
                                id="three"
                                value={'3'}
                                onClick={(e) => {
                                    setRating(e.target.value);
                                }}
                            ></input>
                            <label for="three" className={rating === '3' ? 'rating-color' : ' '}>
                                <Rating value="3" text={'& up'}></Rating>
                            </label>
                        </div>
                        <div display={{ display: 'flex', alignItems: 'center' }}>
                            <input
                                type="radio"
                                style={{ display: 'none' }}
                                className="star-none"
                                name="star"
                                id="two"
                                value={'2'}
                                onClick={(e) => {
                                    setRating(e.target.value);
                                }}
                            ></input>
                            <label for="two" className={rating === '2' ? 'rating-color' : ' '}>
                                <Rating value="2" text={'& up'}></Rating>
                            </label>
                        </div>
                        <div display={{ display: 'flex', alignItems: 'center' }}>
                            <input
                                type="radio"
                                style={{ display: 'none' }}
                                className="star-none"
                                name="star"
                                id="one"
                                value={'1'}
                                onClick={(e) => {
                                    setRating(e.target.value);
                                }}
                            ></input>
                            <label for="one" className={rating === '1' ? 'rating-color' : ''}>
                                <Rating value="1" text={'& up'}></Rating>
                            </label>
                        </div>
                    </div>
                </div>
                {/* <div className="assess-star">
                    <p className="distance-price__p">Review</p>
                    <input class="rating" />
                </div> */}
                <div className="" display={{ display: 'flex', alignItems: 'center' }}>
                    <button className="distance-price__submit">
                        <span
                            className="navbar-brand"
                            style={{ fontSize: '0.85rem', color: '#fff' }}
                            onClick={ClearHandle}
                        >
                            Xóa tất cả
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
}
