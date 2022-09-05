import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import Pagination from './pagination';
import { useDispatch, useSelector } from 'react-redux';
import { listProduct } from '../../Redux/Actions/ProductActions';
import Loading from '../LoadingError/Loading';
import Message from '../LoadingError/Error';
import { listCart } from '../../Redux/Actions/cartActions';
import FilterSection from './FilterSection';

const ShopSection = (props) => {
    // const { category, keyword, pageNumber } = props;
    const { keyword, pageNumber } = props;
    const dispatch = useDispatch();

    const productList = useSelector((state) => state.productList);
    const { loading, error, products, page, pages } = productList;
    const [rating, setRating] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [category, setCategory] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [priceOrder, setPriceOrder] = useState('');
    const [sortProducts, setSortProducts] = useState('1');
    useEffect(() => {
        dispatch(listCart());
        dispatch(listProduct(category, keyword, pageNumber, rating, minPrice, maxPrice, priceOrder));
    }, [dispatch, category, keyword, pageNumber, rating, minPrice, maxPrice, priceOrder]);
    return (
        <>
            <div className="container">
                <div className="section">
                    {products && (
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'right',
                                marginBottom: '10px',
                                marginRight: '20px',
                            }}
                        >
                            <div className="">
                                <select
                                    className="form-select"
                                    value={priceOrder}
                                    onChange={(e) => {
                                        setPriceOrder(e.target.value);
                                    }}
                                >
                                    <option value="">Newest</option>

                                    <option value="asc">Prices gradually increase</option>
                                    <option value="desc">Price descending</option>
                                </select>
                            </div>
                        </div>
                    )}

                    <div className="row">
                        <FilterSection
                            setRating={setRating}
                            setMinPrice={setMinPrice}
                            setMaxPrice={setMaxPrice}
                            setCategory={setCategory}
                            rating={rating}
                            minPrice={minPrice}
                            maxPrice={maxPrice}
                        ></FilterSection>

                        <div className="col-lg-10 col-md-9 article">
                            <div className="shopcontainer row">
                                {loading ? (
                                    <div className="mb-5">
                                        <Loading />
                                    </div>
                                ) : error ? (
                                    <Message variant="alert-danger">{error}</Message>
                                ) : (
                                    <>
                                        {!loading &&
                                            (products?.length === 0 || !products ? (
                                                <div
                                                    className="col-lg-12 col-md-6 col-sm-12 d-flex align-content-center justify-center flex-column"
                                                    style={{ alignItems: 'center', justifyContent: 'center' }}
                                                >
                                                    <div className="position-relative">
                                                        <img
                                                            height={'300px'}
                                                            src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg//assets/a60759ad1dabe909c46a817ecbf71878.png"
                                                        />
                                                        <div
                                                            className="position-absolute"
                                                            style={{ bottom: '15px', right: '50px' }}
                                                        >
                                                            NOT FOUND PRODUCT
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                products?.map((product) => (
                                                    <div className="shop col-lg-3 col-md-6 col-sm-12" key={product._id}>
                                                        <div className="border-product">
                                                            <Link to={`/product/${product._id}`}>
                                                                <div className="shopBack">
                                                                    <img src={product.image} alt={product.name} />
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
                                                                <h3>${product.price}</h3>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            ))}
                                    </>
                                )}

                                {/* Pagination */}
                                <Pagination
                                    pages={pages}
                                    page={page}
                                    // category={category ? category : ''}
                                    keyword={keyword ? keyword : ''}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ShopSection;
