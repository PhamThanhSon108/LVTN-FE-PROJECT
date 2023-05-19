import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import isEmpty from 'validator/lib/isEmpty';

import { TreeItem, TreeView, treeItemClasses } from '@mui/lab';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { Button, Typography, styled } from '@mui/material';
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
                    <Typography noWrap variant="button" color="primary">
                        DANH MỤC
                    </Typography>
                </div>

                <TreeView
                    aria-label="file system navigator"
                    defaultCollapseIcon={<ArrowDropDownIcon />}
                    defaultExpandIcon={<ArrowRightIcon />}
                    selected={[getParamValue('category')]}
                    sx={{ flexGrow: 1, overflowY: 'auto', mb: 1 }}
                    disabledItemsFocusable={true}
                    defaultExpanded={[getParamValue('category')]}
                >
                    {categories?.map((category) => (
                        <StyledTreeItemRoot
                            onClick={() => {
                                if (getParamValue('category') !== category?.slug) {
                                    replaceParams([{ key: 'category', value: category?.slug }]);
                                    setToggleLoad((toggle) => !toggle);
                                }
                            }}
                            key={category._id}
                            nodeId={category.slug}
                            label={category.name}
                            sx={{ mb: '4px', color: category?.slug === getParamValue('category') ? 'red' : '' }}
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
                                              if (getParamValue('category') !== childrenCategory?.slug) {
                                                  replaceParams([{ key: 'category', value: childrenCategory?.slug }]);
                                                  setToggleLoad((toggle) => !toggle);
                                              }
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
                    <Typography noWrap variant="button" color="primary">
                        LỌC
                    </Typography>
                </div>

                <div className="distance-price">
                    <Typography noWrap variant="body1" color="text.secondary" className="mb-1">
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
                            placeholder="Đến"
                            onChange={(e) => setCurentMaxPrice(e.target.value)}
                            value={curentMaxPrice}
                            min="1"
                        ></input>
                    </div>
                    <p style={{ fontSize: '14px', color: 'red' }}>{price.name}</p>

                    <Button variant="contained" sx={{ width: '100%', mt: 1 }} onClick={ApplyHandler}>
                        Áp dụng
                    </Button>
                </div>
                <div className="assess-star">
                    <Typography sx={{ mt: 1 }} noWrap variant="body1" color="text.secondary">
                        Đánh giá
                    </Typography>
                    <div className="assess-star__div">
                        {['5', '4', '3', '2', '1'].map((star) => (
                            <div key={star} display={{ display: 'flex', alignItems: 'center' }}>
                                <input
                                    type="radio"
                                    style={{ display: 'none' }}
                                    className="rating"
                                    name="star"
                                    id={star}
                                    value={star}
                                    onClick={(e) => {
                                        setToggleLoad((toggle) => !toggle);
                                        replaceParams([{ key: 'rating', value: e.target.value }]);
                                    }}
                                ></input>
                                <label
                                    for={star}
                                    className={`d-flex align-items-center ${rating === star ? 'rating-color' : ' '}`}
                                >
                                    <Rating value={star}></Rating>
                                    {star !== '5' ? <Typography variant="caption">trở lên</Typography> : null}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
                {/* <div className="assess-star">
                    <p className="distance-price__p">Review</p>
                    <input class="rating" />
                </div> */}
                <div className="" display={{ display: 'flex', alignItems: 'center' }}>
                    <Button variant="contained" sx={{ width: '100%', mt: 1 }} onClick={ClearHandle}>
                        Xóa tất cả
                    </Button>
                </div>
            </div>
        </div>
    );
}
