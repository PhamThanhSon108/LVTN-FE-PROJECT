import React from 'react';
import Header from '../../components/Header';
import Rating from '../../components/homeComponents/Rating';
import { Link } from 'react-router-dom';
import Message from '../../components/LoadingError/Error';

import Loading from '../../components/LoadingError/Loading';

import moment from 'moment';

import image from '~/assets/images';
import Toast from '~/components/LoadingError/Toast';

import { LoadingButton } from '@mui/lab';
import useSingleProduct from './hook/useSingleProduct';

const SingleProduct = ({ history, match }) => {
    const {
        submitHandler,
        BuyProductHandle,
        AddToCartHandle,
        defaultValue1,
        defaultValue2,
        error,
        product,
        qty,
        setQty,
        rating,
        setComment,
        loadingCreateReview,
        userInfo,
        loading,
        setValue1,
        setValue2,
        quantity,
        value1,
        value2,
        loadingAddtoCart,
        setRating,
        comment,
    } = useSingleProduct({ history, match });
    return (
        <>
            <Toast />
            <Header />
            <div className="container single-product">
                {loading ? (
                    <Loading />
                ) : error ? (
                    <Message variant="alert-danger">{error}</Message>
                ) : (
                    <>
                        <div className="row">
                            <div className="col-md-12 product-avatar">
                                <div className="row">
                                    <div className="col-md-5">
                                        <div className="single-image">
                                            <img src={product.image} alt={product.name} />
                                        </div>
                                    </div>
                                    <div className="col-md-7 product-postion">
                                        <div className="product-dtl">
                                            <div className="product-info">
                                                <div className="product-name">{product.name}</div>
                                            </div>
                                            {/* <p>{product.description}</p> */}

                                            <div className="product-baner">
                                                <img
                                                    style={{ width: '100%' }}
                                                    src={image.imgInSigleProduct}
                                                    alt=""
                                                ></img>
                                            </div>
                                            <div className="product-count col-lg-12 ">
                                                <div className="flex-box d-flex justify-content-start align-items-center">
                                                    <h4 className="col-3">Price</h4>
                                                    <div>
                                                        <span>
                                                            $
                                                            {product?.variants
                                                                ?.find(
                                                                    (value) =>
                                                                        value.attributes?.[0].value == value1 &&
                                                                        value.attributes?.[1].value == value2,
                                                                )
                                                                ?.price?.toFixed(2) || product.price?.toFixed(2)}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="flex-box d-flex justify-content-start align-items-center">
                                                    <h6 className="col-3">Status</h6>
                                                    {!value1 || !value2 ? (
                                                        product?.variants?.reduce(
                                                            (count, value, index) => count + value.quantity,
                                                            0,
                                                        ) > 0 ? (
                                                            <span>In Stock</span>
                                                        ) : (
                                                            <span>Unavailable</span>
                                                        )
                                                    ) : product?.variants?.find(
                                                          (value) =>
                                                              value.attributes?.[0].value === value1 &&
                                                              value.attributes?.[1].value === value2,
                                                      )?.quantity > 0 ? (
                                                        <span>In Stock</span>
                                                    ) : (
                                                        <span>Unavailable</span>
                                                    )}
                                                </div>
                                                <div className="flex-box d-flex justify-content-start align-items-center flex-wrap">
                                                    <h6 className="col-3">Reviews</h6>
                                                    <Rating
                                                        value={product.rating}
                                                        text={`${product?.reviews?.length} reviews`}
                                                    />
                                                </div>
                                                <div className="flex-box d-flex justify-content-start align-items-center flex-wrap">
                                                    <h6 className="col-3">Size</h6>
                                                    <div className="col-9">
                                                        {defaultValue1?.map((value, index) => (
                                                            <button
                                                                onClick={() => {
                                                                    setValue1(value);
                                                                }}
                                                                className={`btn text-md-start btn__product-option ${
                                                                    value === value1 && 'active'
                                                                }`}
                                                            >
                                                                {value}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className="flex-box d-flex justify-content-start align-items-center flex-wrap">
                                                    <h6 className="col-3">Color</h6>
                                                    {defaultValue2?.map((value, index) => (
                                                        <button
                                                            onClick={() => {
                                                                setValue2(value);
                                                            }}
                                                            className={`btn text-md-start btn__product-option ${
                                                                value == value2 && 'active'
                                                            }`}
                                                        >
                                                            {value}
                                                        </button>
                                                    ))}
                                                </div>

                                                {product?.variants?.find(
                                                    (value) =>
                                                        value.attributes?.[0].value == value1 &&
                                                        value.attributes?.[1].value === value2,
                                                )?.quantity ? (
                                                    <>
                                                        <div className="flex-box d-flex justify-content-start align-items-center">
                                                            <h6 className="col-3">Quantity</h6>

                                                            <div className="col-9 d-flex align-items-center">
                                                                <i
                                                                    class="far fa-minus input-quantity icon"
                                                                    onClick={() => {
                                                                        if (qty >= 2) setQty((qty) => qty - 1);
                                                                    }}
                                                                ></i>
                                                                <input
                                                                    class="input-quantity remove-arrow-input"
                                                                    type="number"
                                                                    // role="spinbutton"
                                                                    // aria-valuemax={quantity}
                                                                    value={parseInt(qty)}
                                                                    onKeyDown={(evt) =>
                                                                        [('e', 'E', '+', '-')].includes(evt.key) &&
                                                                        evt.target.startWith(0) &&
                                                                        evt.preventDefault()
                                                                    }
                                                                    onChange={(e) => {
                                                                        setQty(parseInt(e.target.value));
                                                                    }}
                                                                ></input>
                                                                <i
                                                                    class="far fa-plus input-quantity icon"
                                                                    style={{ marginRight: '15px' }}
                                                                    onClick={() => {
                                                                        if (qty < quantity) setQty((qty) => qty + 1);
                                                                    }}
                                                                ></i>
                                                                {product?.variants?.find(
                                                                    (value) =>
                                                                        value.attributes?.[0].value === value1 &&
                                                                        value.attributes?.[1].value === value2,
                                                                )?.quantity ||
                                                                    product?.variants?.reduce(
                                                                        (count, value, index) => count + value.quantity,
                                                                        0,
                                                                    )}{' '}
                                                                products available
                                                            </div>
                                                        </div>
                                                        <div
                                                            className="d-flex"
                                                            style={{ marginTop: '10px', marginLeft: '25px' }}
                                                        >
                                                            <LoadingButton
                                                                variant="outlined"
                                                                loading={loadingAddtoCart}
                                                                onClick={AddToCartHandle}
                                                                style={{ marginRight: '15px' }}
                                                                className="col-4 btn text-primary"
                                                                loadingPosition="start"
                                                            >
                                                                Add To Cart
                                                            </LoadingButton>
                                                            <button
                                                                style={{ minWidth: 120 }}
                                                                onClick={BuyProductHandle}
                                                                className="col-2 btn btn-primary"
                                                            >
                                                                Buy product
                                                            </button>
                                                        </div>
                                                    </>
                                                ) : null}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="product-description">
                                <h2>Description</h2>
                                <p>{product.description}</p>
                            </div>
                            {/* RATING */}
                            <div className="col-md-12 product-rating" style={{ paddingTop: '20px' }}>
                                <div className="row">
                                    <div className="col-md-6">
                                        <h6 className="mb-3">REVIEWS</h6>
                                        <div className="rating-review">
                                            {product.reviews.length === 0 && (
                                                <Message variant={'alert-info mt-3'}>No Reviews</Message>
                                            )}
                                            {product.reviews.map((review) => (
                                                <div
                                                    key={review._id}
                                                    className="mb-5 mb-md-3 bg-light p-3 shadow-sm rounded"
                                                >
                                                    <div style={{ display: 'flex' }}>
                                                        <div className="rating-review__flex">
                                                            <p>{review.name.slice(0, 1)}</p>
                                                        </div>
                                                        <div style={{ paddingLeft: '10px' }}>
                                                            <div
                                                                className="review-rating"
                                                                style={{
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    lineHeight: '0.1',
                                                                }}
                                                            >
                                                                <strong>{review.name}</strong>
                                                                <Rating value={review.rating} />
                                                            </div>
                                                            <span>{moment(review.createdAt).calendar()}</span>
                                                        </div>
                                                    </div>
                                                    <div className="alert alert-info mt-3">{review.comment}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div style={{ paddingLeft: '10px' }}>
                                            <h6 className="write-review">WRITE A CUSTOMER REVIEW</h6>
                                            <div className="my-4">
                                                {loadingCreateReview && <Loading />}
                                                {/* {errorCreateReview && (
                                                    <Message variant="alert-danger">{errorCreateReview}</Message>
                                                )} */}
                                            </div>
                                            {userInfo ? (
                                                <form onSubmit={submitHandler}>
                                                    <div className="my-4">
                                                        <strong>Rating</strong>
                                                        <select
                                                            value={rating}
                                                            onChange={(e) => setRating(e.target.value)}
                                                            className="col-12 bg-light p-3 mt-2 border-0 rounded"
                                                        >
                                                            <option value="">Select...</option>
                                                            <option value="1">1 - Poor</option>
                                                            <option value="2">2 - Fair</option>
                                                            <option value="3">3 - Good</option>
                                                            <option value="4">4 - Very Good</option>
                                                            <option value="5">5 - Excellent</option>
                                                        </select>
                                                    </div>
                                                    <div className="my-4">
                                                        <strong>Comment</strong>
                                                        <textarea
                                                            row="3"
                                                            value={comment}
                                                            onChange={(e) => setComment(e.target.value)}
                                                            className="col-12 bg-light p-3 mt-2 border-0 rounded"
                                                        ></textarea>
                                                    </div>
                                                    <div className="my-3">
                                                        <button
                                                            disabled={loadingCreateReview}
                                                            className="col-12 bg-orange border-0 p-3 rounded text-white"
                                                        >
                                                            SUBMIT
                                                        </button>
                                                    </div>
                                                </form>
                                            ) : (
                                                <div className="my-3">
                                                    <Message variant={'alert-warning'}>
                                                        Please{' '}
                                                        <Link to="/login">
                                                            " <strong>Login</strong> "
                                                        </Link>{' '}
                                                        and buy this product to write a review{' '}
                                                    </Message>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default SingleProduct;
