import { Rating, Typography } from '@mui/material';
import moment from 'moment';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { createProductReview } from '~/Redux/Actions/productActions';
import Message from '~/components/LoadingError/Error';
import Loading from '~/components/LoadingError/Loading';
import styles from './Review.module.scss';
const OPTION_SELECT_RATING = [
    { value: 1, label: 'Select...' },
    { value: 2, label: '2 - Fair' },
    { value: 3, label: '3 - Good' },
    { value: 4, label: '4 - Very Good' },
    { value: 5, label: '5 - Excellent' },
];
export default function Review() {
    const dispatch = useDispatch();
    const { id: productId } = useParams();
    const productDetails = useSelector((state) => state.productDetails);
    const { loading, error, product } = productDetails;
    const productReviewCreate = useSelector((state) => state.productReviewCreate);
    const [loadingAddtoCart, setLoadingAddtoCart] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const { loading: loadingCreateReview, success: successCreateReview } = productReviewCreate;
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(
            createProductReview({
                productId,
                review: {
                    rating,
                    comment,
                },
            }),
        );
    };

    return (
        <div className="col-md-12 product-rating" style={{ paddingTop: '20px' }}>
            <div className="row">
                <div>
                    <div className={styles.wrapper}>
                        <Typography noWrap variant="h6" color="black">
                            Đánh giá sản phẩm
                        </Typography>
                    </div>
                    <div className="rating-review">
                        {product?.reviews?.length === 0 && <Message variant={'alert-info mt-3'}>No Reviews</Message>}
                        {product?.reviews?.map((review) => (
                            <div key={review._id} className="mb-5 mb-md-3 bg-light p-3 shadow-sm rounded">
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
                {/* <div className="col-md-6">
                    <div style={{ paddingLeft: '10px' }}>
                        <h6 className="write-review">WRITE A CUSTOMER REVIEW</h6>
                        <div className="my-4">{loadingCreateReview && <Loading />}</div>
                        {userInfo ? (
                            <form onSubmit={submitHandler}>
                                <div className="my-4">
                                    <strong>Rating</strong>
                                    <select
                                        value={rating}
                                        onChange={(e) => setRating(e.target.value)}
                                        className="col-12 bg-light p-3 mt-2 border-0 rounded"
                                    >
                                        {OPTION_SELECT_RATING.map((item) => (
                                            <option key={item.value} value={item.value} label={item.label}></option>
                                        ))}
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
                </div> */}
            </div>
        </div>
    );
}
