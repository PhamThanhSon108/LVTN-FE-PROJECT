import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import { Button, FormControl, InputLabel, MenuItem, Pagination, Select, Skeleton, Typography } from '@mui/material';

import { Message } from '@mui/icons-material';
import FilterSection from '../FilterSection/FilterSection';
import { listProduct } from '~/Redux/Actions/productActions';
import Rating from '../Rating/Rating';
import styles from './ShopSection.module.scss';
import Product from '~/components/Product/Product';
const LoadingEachProduct = () => {
    return (
        <div className={styles.loadingEachProduct} style={{ margin: '15px 7.9px' }}>
            <Skeleton variant="rectangular" width={'100%'} height={209} />
            <Skeleton />
            <Skeleton />
            <Skeleton width="60%" />
        </div>
    );
};
const RenderProduct = ({ children, error, loading, notfound, LoadingComponent, ErrorComponent, NotfoundComponent }) => {
    if (loading) return LoadingComponent;
    if (error) return ErrorComponent;
    if (notfound) return NotfoundComponent;
    return children;
};

const ShowFilter = ({ children, show }) => {
    if (show) return children;
    return <Fragment />;
};
const ShopSection = (props) => {
    const dispatch = useDispatch();
    const { keyword, pageNumber = 1, queryCategory } = props;
    const productList = useSelector((state) => state.productList);
    const { loading, error, products, page, pages } = productList;
    const [rating, setRating] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [category, setCategory] = useState(queryCategory);
    const [maxPrice, setMaxPrice] = useState('');
    const [priceOrder, setPriceOrder] = useState('');
    let SkeletonOption = window.innerWidth > 540 ? [1, 2, 3, 4, 5, 6] : [1];
    useEffect(() => {
        if (category !== queryCategory) setCategory(queryCategory);
    }, [queryCategory]);
    useEffect(() => {
        dispatch(listProduct({ category, keyword, pageNumber, rating, minPrice, maxPrice, priceOrder }));
    }, [dispatch, category, keyword, rating, minPrice, maxPrice, priceOrder, pageNumber]);

    return (
        <>
            <div className={styles.shopSectionContainer}>
                <div className={styles.section}>
                    <div className="row">
                        {keyword || category ? (
                            <FilterSection
                                setRating={setRating}
                                setMinPrice={setMinPrice}
                                setMaxPrice={setMaxPrice}
                                setCategory={setCategory}
                                rating={rating}
                                minPrice={minPrice}
                                maxPrice={maxPrice}
                                categoryCurrent={category}
                                keyword={keyword}
                            ></FilterSection>
                        ) : null}
                        <div
                            style={{ paddingLeft: 0, paddingRight: 0 }}
                            className={` ${keyword || category ? 'col-lg-10' : 'col-lg-12'} col-md-9 article`}
                        >
                            <div className=" row">
                                <RenderProduct
                                    loading={loading}
                                    error={error}
                                    notfound={products?.length === 0 || !products}
                                    LoadingComponent={
                                        <div style={{ display: 'flex', width: '100%' }} className="col-lg-12">
                                            {SkeletonOption.map(() => (
                                                <LoadingEachProduct />
                                            ))}
                                        </div>
                                    }
                                    ErrorComponent={<Message variant="alert-danger">{error}</Message>}
                                    NotfoundComponent={
                                        <div
                                            className="col-lg-12 col-md-6 col-sm-6 d-flex align-content-center justify-center flex-column"
                                            style={{ alignItems: 'center', justifyContent: 'center' }}
                                        >
                                            <div className="position-relative">
                                                <img
                                                    alt="Không tìm thấy sản phẩm"
                                                    src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg//assets/a60759ad1dabe909c46a817ecbf71878.png"
                                                />
                                                <div
                                                    className="position-absolute"
                                                    style={{ bottom: '15px', right: '50px' }}
                                                >
                                                    Không tìm thấy sản phẩm
                                                </div>
                                            </div>
                                        </div>
                                    }
                                >
                                    <ShowFilter show={(keyword || category) && products && products?.length > 2}>
                                        <div
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'left',
                                                marginBottom: '10px',
                                                marginRight: '20px',
                                            }}
                                            className={styles.filterCustomWrap}
                                        >
                                            <Typography noWrap variant="body1" color="text.secondary" sx={{ mr: 1 }}>
                                                Sắp xếp theo
                                            </Typography>
                                            <Button
                                                onClick={(e) => {
                                                    setPriceOrder(e.target.value);
                                                }}
                                                type="ghost"
                                                sx={{ mr: 1 }}
                                            >
                                                Mới nhất
                                            </Button>
                                            <div className="" style={{ cursor: 'pointer', zIndex: '2' }}>
                                                <FormControl size="small" fullWidth sx={{ minWidth: '8rem' }}>
                                                    <InputLabel id="sort-by-price-select-label">Giá</InputLabel>
                                                    <Select
                                                        labelId="sort-by-price-select-label"
                                                        id="demo-simple-select"
                                                        value={priceOrder}
                                                        label="Giá"
                                                        onChange={(e) => {
                                                            setPriceOrder(e.target.value);
                                                        }}
                                                    >
                                                        <MenuItem>Giá</MenuItem>
                                                        <MenuItem value="asc">Giá tăng dần</MenuItem>
                                                        <MenuItem value="desc">Giá giảm dần</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </div>
                                        </div>
                                    </ShowFilter>

                                    {!keyword && !category ? (
                                        <div className="row divider-custom">
                                            <span>Sản phẩm hôm nay</span>
                                        </div>
                                    ) : null}
                                    {products?.map((product) => (
                                        <Product product={product} />
                                    ))}
                                </RenderProduct>

                                {/* Pagination */}

                                <div
                                    className="row d-flex justify-content-center"
                                    style={{ paddingTop: '18px', marginBottom: '16px' }}
                                >
                                    {keyword || category ? (
                                        <Pagination
                                            pages={pages}
                                            page={page}
                                            // category={category ? category : ''}
                                            keyword={keyword ? keyword : ''}
                                            category={category || ''}
                                        />
                                    ) : (
                                        !props?.todayProducts && (
                                            <Link to={'today-product'} style={{ width: '30%' }}>
                                                <Button
                                                    variant="outlined"
                                                    style={{
                                                        borderColor: 'var(--default-background-color)',
                                                        width: '100%',
                                                        color: 'var(--default-background-color)',
                                                        minWidth: '150px',
                                                    }}
                                                >
                                                    Xem thêm
                                                </Button>
                                            </Link>
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ShopSection;
