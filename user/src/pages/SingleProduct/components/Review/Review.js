import { Alert, Box, Button, Rating, Tooltip, Typography, Card, Chip } from '@mui/material';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { createProductReview } from '~/Redux/Actions/productActions';
import Message from '~/components/LoadingError/Error';
import Loading from '~/components/LoadingError/Loading';
import styles from './Review.module.scss';
import { LoadingButton } from '@mui/lab';
import useSearchParamsCustom from '~/hooks/useSearchParamCustom';

const OPTION_SELECT_RATING = [
    { value: 1, label: 'Tệ', color: 'red' },
    { value: 2, label: 'Không hài lòng', color: 'red' },
    { value: 3, label: 'Bình thường', color: 'text.primary' },
    { value: 4, label: 'Hài lòng', color: '#faaf00' },
    { value: 5, label: 'Tuyệt vời', color: '#faaf00' },
];
const filterOption = [
    { value: '', label: ' Tất cả' },
    { value: 5, label: '5 sao' },
    { value: 4, label: '4 sao' },
    { value: 3, label: '3 sao' },
    { value: 2, label: '2 sao' },
    { value: 1, label: '1 sao' },
];
export default function Review() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const productDetails = useSelector((state) => state.productDetails);
    const { loading, error, product } = productDetails;
    const productReviewCreate = useSelector((state) => state.productReviewCreate);
    const [loadingAddtoCart, setLoadingAddtoCart] = useState(false);
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');
    const { loading: loadingCreateReview, success: successCreateReview } = productReviewCreate;
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const [filterRating, setFilterRating] = useState('');
    const refReview = useRef();
    const { getParamValue } = useSearchParamsCustom();
    const section = getParamValue('section');

    const reviewToShow = filterRating
        ? product.reviews.filter((review) => review?.rating === filterRating)
        : product?.reviews;
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(
            createProductReview({
                id,
                review: {
                    rating,
                    content: comment,
                },
            }),
        );
    };
    const caculateRatingOfStart = (rating) => {
        if (!rating) return product?.reviews?.length;
        return product?.reviews?.filter((review) => review.rating === rating)?.length;
    };
    useEffect(() => {
        if (section === 'review') {
            refReview?.current?.focus();
            window.scrollTo({
                top: refReview.current.offsetTop - 300,
                left: 100,
                behavior: 'smooth',
            });
        }
    }, []);
    return (
        <div className="col-md-12 product-rating" style={{ paddingTop: '20px' }}>
            <div className="row ">
                <div className="col-md-7">
                    <div className={styles.wrapper}>
                        <Typography noWrap variant="h6" color="black">
                            Danh sách đánh giá
                        </Typography>
                    </div>
                    <Card
                        sx={{
                            padding: 2,
                            display: 'flex',
                            boxShadow: 'none',
                            bgcolor: 'rgba(102, 178, 255, 0.15)',
                            borderRadius: 0,
                            mb: 1,
                        }}
                    >
                        <Box className="col-4 d-flex align-items-center flex-column">
                            <Box className="d-flex align-items-end">
                                <Typography
                                    color={'red'}
                                    sx={{ fontWeight: '600', mr: 1, lineHeight: '2.2rem' }}
                                    fontSize={'2rem'}
                                    variant="cation"
                                >
                                    {product.rating}
                                </Typography>
                                <Typography color={'#faaf00'} variant="cation" fontSize={'1.3rem'}>
                                    trên 5
                                </Typography>
                            </Box>
                            <Rating precision={0.5} size="large" readOnly value={product.rating} />
                        </Box>
                        <Box className="col-8">
                            {filterOption.map((ratingItem) => (
                                <Chip
                                    color={filterRating === ratingItem?.value ? 'error' : 'default'}
                                    key={ratingItem.value}
                                    sx={{ mr: 1, mb: 0.5, mt: 0.5 }}
                                    variant="outlined"
                                    label={`${ratingItem.label} (${caculateRatingOfStart(ratingItem.value)})`}
                                    onClick={() => {
                                        setFilterRating(ratingItem.value);
                                    }}
                                ></Chip>
                            ))}
                        </Box>
                    </Card>
                    <div className="rating-review">
                        {product?.reviews?.length === 0 && (
                            <Message variant={'alert-info mt-3'}>Chưa có đánh giá nào</Message>
                        )}
                        {reviewToShow?.map((review) => (
                            <div key={review._id} className="mb-5 mb-md-3  p-3 shadow-sm rounded">
                                <div style={{ display: 'flex' }}>
                                    <div className="rating-review__flex col-1">
                                        <Typography>{review.name.slice(0, 1)}</Typography>
                                    </div>
                                    <div style={{ paddingLeft: '10px' }} className="col-11">
                                        <div
                                            className="review-rating col-12"
                                            style={{
                                                display: 'flex',
                                                alignItems: 'start',
                                                lineHeight: '0.1',
                                                flexDirection: 'column',
                                            }}
                                        >
                                            <Typography noWrap className="col-12">
                                                {review.name}
                                            </Typography>
                                            <Rating size="small" readOnly value={review.rating} />
                                        </div>
                                        <Typography variant="caption">
                                            {moment(review.createdAt).format('YYYY/MM/DD HH:MM')}
                                        </Typography>

                                        <Typography className=" mt-1">{review.content}</Typography>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="col-md-5">
                    <div style={{ paddingLeft: '10px' }}>
                        <Typography variant="h6" sx={{ fontWeight: '500' }}>
                            Đánh giá sản phẩm
                        </Typography>

                        {userInfo ? (
                            <form onSubmit={submitHandler} className="mt-0">
                                <div className="d-flex align-items-center mt-1">
                                    <Typography className="mr-2" sx={{ mr: 2, fontWeight: '400' }}>
                                        Chất lượng sản phẩm:
                                    </Typography>
                                    <Rating
                                        sx={{ mr: 1 }}
                                        size="large"
                                        value={rating}
                                        onChange={(e, value) => {
                                            if (value) setRating(value);
                                        }}
                                    />
                                    <Typography color={OPTION_SELECT_RATING?.[rating - 1]?.color}>
                                        {OPTION_SELECT_RATING?.[rating - 1]?.label}
                                    </Typography>
                                </div>
                                <div className="mt-1">
                                    <Typography sx={{ fontWeight: '400' }}>Chi tiết đánh giá:</Typography>
                                    <textarea
                                        ref={refReview}
                                        maxLength={250}
                                        row="3"
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        className="col-12  p-3 mt-2"
                                        style={{ borderColor: 'var(--border-color)', borderRadius: '10px' }}
                                    ></textarea>
                                </div>
                                <Tooltip
                                    title={
                                        !rating || !comment
                                            ? 'Bạn cần đăng nhập, mua sản phẩm, điền thông tin bên trên để gửi đánh giá'
                                            : ''
                                    }
                                >
                                    <div className="my-3">
                                        <LoadingButton
                                            size="small"
                                            disabled={!rating || !comment}
                                            variant="contained"
                                            onClick={submitHandler}
                                            loading={loadingCreateReview}
                                            className="col-12 bg-orange border-0 p-3 rounded text-white"
                                        >
                                            Gửi
                                        </LoadingButton>
                                    </div>
                                </Tooltip>
                            </form>
                        ) : (
                            <div className="my-3">
                                <Message variant={'alert-warning'}>
                                    Hãy{' '}
                                    <Link to="/login">
                                        " <strong>Đăng nhập</strong> "
                                    </Link>{' '}
                                    và mua sản phẩm để đánh giá{' '}
                                </Message>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
