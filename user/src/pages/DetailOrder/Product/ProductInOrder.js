import {
    Avatar,
    Button,
    Card,
    Divider,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Tooltip,
    Typography,
} from '@mui/material';
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import { formatMoney } from '~/utils/formatMoney';

export default function ProductInOrder({ product, order }) {
    return (
        <Fragment>
            <Link
                key={product?._id}
                to={`/product/${product?.product}${product?.isAbleToReview ? '?section=review' : ''}`}
            >
                <Card sx={{ boxShadow: 'none' }}>
                    <ListItem
                        className="d-flex"
                        key={product?._id}
                        secondaryAction={
                            <React.Fragment>
                                <Typography sx={{ display: 'inline' }} color="error" component="span" variant="body1">
                                    {formatMoney(product?.price || 0)}
                                </Typography>
                                {product?.isAbleToReview ? (
                                    <Tooltip title="Đánh giá sản phẩm">
                                        <Button size="small" variant="outlined" sx={{ ml: 2 }}>
                                            Đánh giá
                                        </Button>
                                    </Tooltip>
                                ) : null}
                            </React.Fragment>
                        }
                    >
                        <ListItemAvatar>
                            <Avatar alt={product?.name} src={product?.image} />
                        </ListItemAvatar>

                        <ListItemText
                            primary={
                                <Typography
                                    className="col-9"
                                    component="div"
                                    variant="body1"
                                    color="text.primary"
                                    fontWeight={600}
                                >
                                    {product?.name}
                                </Typography>
                            }
                            secondary={
                                <React.Fragment>
                                    <Typography component="div" variant="body2" color="text.primary">
                                        Phân loại hàng: {product?.attributes?.[0]?.value},{' '}
                                        {product?.attributes?.[1]?.value}
                                    </Typography>
                                    <Typography component="div" variant="body2" color="text.primary">
                                        x {product?.quantity}
                                    </Typography>
                                </React.Fragment>
                            }
                        />
                        {}
                    </ListItem>
                </Card>
            </Link>
            <Divider />
        </Fragment>
    );
}
