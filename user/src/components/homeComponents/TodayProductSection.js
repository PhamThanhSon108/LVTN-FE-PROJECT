import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';

import { useDispatch, useSelector } from 'react-redux';
import { listProduct } from '../../Redux/Actions/productActions';
import Message from '../LoadingError/Error';
import { listCart } from '../../Redux/Actions/cartActions';
import { useLocation } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Pagination, Skeleton } from '@mui/material';
import './styles.scss';
const TodayProductSection = (props) => {
    const history = createBrowserHistory();
    // const { category, keyword, pageNumber } = props;
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.productList);
    const { loading, error, products, page, pages = 2 } = productList;
    const [pageNumber, setpageNumber] = useState('');

    const pageSize = 24;
    let SkeletonOption = window.innerWidth > 540 ? [1, 2, 3, 4, 5, 6] : [1];

    const handleChangePage = (e, value) => {
        setpageNumber(value);
    };
    useEffect(() => {
        dispatch(listCart());
        dispatch(listProduct({ pageNumber: pageNumber, pageSize }));
    }, [dispatch, pageNumber]);

    return (
        <>
            <div className="container-today-product">
                <div className="section">
                    <div className="row">
                        <div className={`${'col-lg-12'} col-md-9 article`}>
                            <div className="shop-section-container row">
                                {loading ? (
                                    <>
                                        <div style={{ display: 'flex', width: '100%' }}>
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
                                ) : error ? (
                                    <Message variant="alert-danger">{error}</Message>
                                ) : (
                                    <>
                                        {!loading &&
                                            (products?.length === 0 || !products ? (
                                                <div
                                                    className="col-lg-12 col-md-6 col-sm-6 d-flex align-content-center justify-center flex-column"
                                                    style={{ alignItems: 'center', justifyContent: 'center' }}
                                                >
                                                    <div className="position-relative">
                                                        <img src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg//assets/a60759ad1dabe909c46a817ecbf71878.png" />
                                                        <div
                                                            className="position-absolute"
                                                            style={{ bottom: '15px', right: '50px' }}
                                                        >
                                                            NOT FOUND PRODUCT
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <>
                                                    <div className="row divider-custom">
                                                        <span>Danh sách sản phẩm</span>
                                                    </div>

                                                    {products?.map((product) => (
                                                        <div
                                                            className="col-lg-2 col-md-6 col-sm-6 product-card-wrap"
                                                            key={product._id}
                                                        >
                                                            <div className="border-product product-card-item">
                                                                <Link to={`/product/${product._id}`}>
                                                                    <div className="product-card-item-img-wrap">
                                                                        <img
                                                                            src={product.images?.[0]}
                                                                            alt={product.name}
                                                                        />
                                                                    </div>
                                                                </Link>

                                                                <div className="shoptext">
                                                                    <p>
                                                                        <Link to={`/product/${product._id}`}>
                                                                            {product.name}
                                                                        </Link>
                                                                    </p>

                                                                    <Rating
                                                                        value={product.rating}
                                                                        text={`${product.numReviews} reviews`}
                                                                    />
                                                                    <h3>${product.price.toFixed(2)}</h3>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </>
                                            ))}
                                    </>
                                )}

                                {/* Pagination */}

                                <div className="row d-flex justify-content-center" style={{ paddingTop: '18px' }}>
                                    {
                                        <Pagination
                                            color="primary"
                                            count={pages}
                                            page={page}
                                            variant="outlined"
                                            shape="rounded"
                                            onChange={handleChangePage}
                                        />
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TodayProductSection;
