import { Rating, Tooltip, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Product.module.scss';
import { formatMoney } from '~/utils/formatMoney';
export default function Product({ product }) {
    const percentDiscount = (((product.price - product.priceSale) * 100) / product.price).toFixed();
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
                    <Rating size="small" readOnly value={product.rating} text={`${product.numReviews} đánh giá`} />
                    <Typography noWrap variant="body2" color="black" sx={{ mb: 1 }}>
                        TP. Hồ Chí Minh
                    </Typography>
                </div>
            </div>
        </Link>
    );
}
