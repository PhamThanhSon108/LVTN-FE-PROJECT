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
import useSearchParamsCustom from '~/hooks/useSearchParamCustom';
const LoadingEachProduct = () => {
    return (
        <div
            className={styles.loadingEachProduct + ' col-lg-2 col-md-3 col-sm-4  mb-3 col-6'}
            // style={{ margin: '15px 7.9px' }}
            style={{ padding: '15px 7.9px' }}
        >
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
    const { getParamValue, replaceParams } = useSearchParamsCustom();
    const [toggleLoad, setToggleLoad] = useState(false);
    const productList = useSelector((state) => state.productList);
    const { loading, error, products, page, pages } = productList;

    const minPrice = getParamValue('min') || '';
    const category = getParamValue('category') || '';
    const maxPrice = getParamValue('max') || '';
    const keyword = getParamValue('keyword') ? getParamValue('keyword')?.replace(/%20/g, ' ') : '';
    const pageNumber = getParamValue('page') || '';
    const rating = getParamValue('rating') || '';
    const sortBy = getParamValue('sort-by') || '';

    const [priceOrder, setPriceOrder] = useState('');
    let SkeletonOption =
        window.innerWidth > 540 ? (keyword || category ? [1, 2, 3, 4, 5] : [1, 2, 3, 4, 5, 6]) : [1, 2];
    useEffect(() => {
        dispatch(listProduct({ sortBy, category, keyword, pageNumber, rating, minPrice, maxPrice }));
    }, [toggleLoad, sortBy, keyword]);
    return (
        <>
            <div className={styles.shopSectionContainer}>
                <div className={styles.section}>
                    <div className="row">
                        {keyword || category ? <FilterSection setToggleLoad={setToggleLoad}></FilterSection> : null}
                        <div
                            style={{ paddingLeft: 0, paddingRight: 0 }}
                            className={` ${keyword || category ? 'col-10' : 'col-12'}  article`}
                        >
                            <div className="row">
                                <RenderProduct
                                    loading={loading}
                                    error={error}
                                    notfound={products?.length === 0 || !products}
                                    LoadingComponent={
                                        <div style={{ display: 'flex' }} className="row">
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
                                            <div className="d-flex flex-column align-content-center">
                                                <img
                                                    alt="Không tìm thấy sản phẩm"
                                                    src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg//assets/a60759ad1dabe909c46a817ecbf71878.png"
                                                />
                                            </div>
                                        </div>
                                    }
                                >
                                    <ShowFilter show={(keyword || category) && (products?.length > 2 || loading)}>
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
                                                    replaceParams([{ key: 'sort-by', value: 'newest' }]);
                                                }}
                                                type="ghost"
                                                sx={{ mr: 1 }}
                                            >
                                                Mới nhất
                                            </Button>
                                            <div className="" style={{ cursor: 'pointer', zIndex: '2' }}>
                                                <select
                                                    onChange={(e) => {
                                                        replaceParams([{ key: 'sort-by', value: e.target.value }]);
                                                    }}
                                                    value={sortBy}
                                                    class="form-select"
                                                    aria-label="Default select example"
                                                >
                                                    <option value="">Giá</option>
                                                    <option value="asc">Giá tăng dần</option>
                                                    <option value="desc">Giá giảm dần</option>
                                                </select>
                                            </div>
                                            <Button
                                                onClick={(e) => {
                                                    replaceParams([{ key: 'sort-by', value: 'total_sales' }]);
                                                }}
                                                type="ghost"
                                                sx={{ mr: 1 }}
                                            >
                                                Bán chạy
                                            </Button>
                                        </div>
                                    </ShowFilter>

                                    {!keyword && !category ? (
                                        <div className="row divider-custom">
                                            <Typography color="primary" fontWeight={600}>
                                                Sản phẩm hôm nay
                                            </Typography>
                                        </div>
                                    ) : null}

                                    {products?.map((product) => (
                                        <div
                                            className={`${
                                                keyword || category ? '' : 'col-lg-2'
                                            }  col-md-3 col-sm-4  mb-3 col-6`}
                                            style={{
                                                paddingLeft: 4,
                                                paddingRight: 4,
                                                width: keyword || category ? '20%' : '',
                                            }}
                                            key={product._id}
                                        >
                                            <Product product={product} />
                                        </div>
                                    ))}
                                </RenderProduct>

                                {/* Pagination */}

                                <div
                                    className="row d-flex justify-content-center"
                                    style={{ paddingTop: '18px', marginBottom: '16px' }}
                                >
                                    {keyword || category
                                        ? pages > 1 && (
                                              <Pagination
                                                  pages={pages}
                                                  page={page}
                                                  // category={category ? category : ''}
                                                  keyword={keyword ? keyword : ''}
                                                  category={category || ''}
                                              />
                                          )
                                        : pages > 1 && (
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
