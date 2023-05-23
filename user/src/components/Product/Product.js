import { Button, Rating, Tooltip, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Product.module.scss';
import { formatMoney } from '~/utils/formatMoney';
import { useDispatch } from 'react-redux';
import { getSimilarProduct } from '~/Redux/Actions/productActions';
export default function Product({ product, findSimilar = true }) {
    const percentDiscount = (((product.price - product.priceSale) * 100) / product.price).toFixed();
    const dispatch = useDispatch();
    return (
        <Link to={`/product/${product._id}`} className="col-12">
            <div className={`border-product product-card-item ${styles.productWrapper}`}>
                <div className={styles.imageWrapper}>
                    <img className={styles.image} src={product?.images?.[0]} alt={product.name} />
                </div>
                {percentDiscount > 0 ? (
                    <div class={styles.discountFlag}>
                        <div class={styles.discountFlagWrapper}>
                            <Typography class={styles.percent} fontSize={10} noWrap variant="inherit" color="white">

                                {percentDiscount < 100 ? percentDiscount : 99} %

                            </Typography>

                            <span class={styles.label}>giảm</span>
                        </div>
                    </div>
                ) : null}
                <div className={styles.description}>
                    <Tooltip title={product.name}>
                        <Typography noWrap variant="body1" color="black" sx={{ fontWeight: 600, mt: 1, mb: 1 }}>
                            {product.name}
                        </Typography>
                    </Tooltip>
                    <div className={styles.priceWrapper}>
                        {percentDiscount > 0 ? (
                            <Typography
                                sx={{ textDecoration: 'line-through', mr: 2 }}
                                noWrap
                                variant="body1"
                                color="text.secondary"
                            >
                                {formatMoney(product.price || 0)}
                            </Typography>
                        ) : null}
                        <Typography noWrap variant="body1" color="red" sx={{ mr: 2 }}>
                            {formatMoney(product.priceSale || 0)}
                        </Typography>
                    </div>
                    <Rating
                        precision={0.5}
                        size="small"
                        readOnly
                        value={product.rating}
                        text={`${product.numReviews} đánh giá`}
                    />
                    <Typography noWrap variant="body2" color="black" sx={{ mb: 1 }}>
                        TP. Hồ Chí Minh
                    </Typography>
                </div>
                {findSimilar ? (
                    <Link to={`/product/${product._id}?section=similar`}>
                        <Button
                            onClick={() => {
                                dispatch(
                                    getSimilarProduct({
                                        id: product?._id,
                                        category: product?.category?.slug,
                                    }),
                                );
                            }}
                            sx={{ borderRadius: '0', width: '100%', zIndex: 3, fontSize: '0.8rem' }}
                            size="small"
                            color="primary"
                            variant="contained"
                            className={styles.findSimilarProducts}
                        >
                            Tìm sản phẩm tương tự
                        </Button>
                    </Link>
                ) : null}
            </div>
        </Link>
    );
}
