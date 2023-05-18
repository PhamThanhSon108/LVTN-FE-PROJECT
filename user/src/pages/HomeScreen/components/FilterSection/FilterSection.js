import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import isEmpty from 'validator/lib/isEmpty';

import { TreeItem, TreeView, treeItemClasses } from '@mui/lab';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { Typography, styled } from '@mui/material';
import Rating from '../Rating/Rating';
import { ListCategory } from '~/Redux/Actions/categoryActions';
import styles from './FilterSection.module.scss';
import useSearchParamsCustom from '~/hooks/useSearchParamCustom';
import { listProduct } from '~/Redux/Actions/productActions';

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

export default function FilterSection({ setToggleLoad }) {
    const dispatch = useDispatch();
    const lcategories = useSelector((state) => state.CategoryList);
    const { categories } = lcategories;
    const [curentMinPrice, setCurentMinPrice] = useState('');
    const [curentMaxPrice, setCurentMaxPrice] = useState('');
    const { getParamValue, replaceParams } = useSearchParamsCustom();
    const rating = getParamValue('rating') || '';

    //xủ lí logic check form
    const [price, SetPrice] = useState({});
    const checkPrice = () => {
        const msg = {};
        if (isEmpty(curentMinPrice)) {
            msg.name = 'Bạn chưa nhập giá';
        } else {
            if (curentMinPrice < 0) {
                msg.name = 'Giá phải là số nguyên dương';
            } else {
                if (isNaN(curentMinPrice)) {
                    msg.name = 'Hãy nhập số';
                }
            }
        }
        if (isEmpty(curentMaxPrice)) {
            msg.name = 'Bạn chưa nhập giá';
        } else {
            if (curentMaxPrice < 0) {
                msg.name = 'Giá phải là số nguyên dương';
            } else {
                if (isNaN(curentMaxPrice)) {
                    msg.name = 'Hãy nhập số';
                } else {
                    if (Number(curentMinPrice) > Number(curentMaxPrice)) {
                        msg.name = 'Khoảng giá không hợp lệ';
                    }
                }
            }
        }
        SetPrice(msg);
        if (Object.keys(msg).length > 0) return false;
        return true;
    };
    const ClearHandle = () => {
        setToggleLoad((toggle) => !toggle);
        replaceParams([{ key: 'keyword', value: getParamValue('keyword') || '' }], 'all');
    };
    const ApplyHandler = () => {
        if (!checkPrice()) return;
        replaceParams([
            { key: 'min', value: curentMinPrice },
            { key: 'max', value: curentMaxPrice },
        ]);
        setToggleLoad((toggle) => !toggle);
    };

    useEffect(() => {
        if (!categories || categories?.length === 0) {
            dispatch(ListCategory());
        }
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
                    defaultExpanded={[getParamValue('category')]}
                >
                    {categories?.map((category) => (
                        <StyledTreeItemRoot
                            onClick={() => {
                                replaceParams([{ key: 'category', value: category?.slug }]);
                                setToggleLoad((toggle) => !toggle);
                            }}
                            key={category._id}
                            nodeId={category.slug}
                            label={category.name}
                            sx={{ mb: '4px', color: category?.slug === getParamValue('category') ? 'red' : null }}
                        >
                            {category?.children.length > 0
                                ? category.children.map((childrenCategory) => (
                                      <StyledTreeItemRoot
                                          key={childrenCategory._id}
                                          nodeId={childrenCategory._id}
                                          label={childrenCategory.name}
                                          sx={{
                                              color:
                                                  childrenCategory?.slug === getParamValue('category') ? 'red' : null,
                                          }}
                                          onClick={() => {
                                              replaceParams([{ key: 'category', value: childrenCategory?.slug }]);
                                              setToggleLoad((toggle) => !toggle);
                                          }}
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
                            placeholder="Từ"
                            onChange={(e) => setCurentMinPrice(e.target.value)}
                            value={curentMinPrice}
                            min="0"
                        ></input>
                        <label>-</label>
                        <input
                            type="number"
                            placeholder="Tới"
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
                                    replaceParams([{ key: 'rating', value: e.target.value }]);
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
                                    replaceParams([{ key: 'rating', value: e.target.value }]);
                                }}
                            ></input>
                            <label for="four" className={rating === '4' ? 'rating-color' : ' '}>
                                <Rating
                                    value="4"
                                    text={
                                        <Typography ml={0} variant="caption">
                                            Trở lên
                                        </Typography>
                                    }
                                ></Rating>
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
                                    replaceParams([{ key: 'rating', value: e.target.value }]);
                                }}
                            ></input>
                            <label for="three" className={rating === '3' ? 'rating-color' : ' '}>
                                <Rating
                                    value="3"
                                    text={
                                        <Typography ml={0} variant="caption">
                                            Trở lên
                                        </Typography>
                                    }
                                ></Rating>
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
                                    replaceParams([{ key: 'rating', value: e.target.value }]);
                                }}
                            ></input>
                            <label for="two" className={rating === '2' ? 'rating-color' : ' '}>
                                <Rating
                                    value="2"
                                    text={
                                        <Typography ml={0} variant="caption">
                                            Trở lên
                                        </Typography>
                                    }
                                ></Rating>
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
                                    replaceParams([{ key: 'rating', value: e.target.value }]);
                                }}
                            ></input>
                            <label for="one" className={rating === '1' ? 'rating-color' : ''}>
                                <Rating
                                    value="1"
                                    text={
                                        <Typography ml={0} variant="caption">
                                            Trở lên
                                        </Typography>
                                    }
                                ></Rating>
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
