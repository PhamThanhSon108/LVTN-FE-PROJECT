import { Avatar, Card, Divider, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { ReviewDialog } from '~/components/profileComponents/Review/ReviewDialog';
import { formatMoney } from '~/utils/formatMoney';

export default function ProductInOrder({ product, order }) {
    return (
        <Link to={`/product/${product?.product}`}>
            <Card sx={{ boxShadow: 'none' }}>
                <ListItem
                    className="d-flex"
                    key={product?._id}
                    secondaryAction={
                        <React.Fragment>
                            <Typography sx={{ display: 'inline' }} color="error" component="span" variant="body1">
                                {formatMoney(product?.price || 0)}
                            </Typography>
                        </React.Fragment>
                    }
                >
                    <ListItemAvatar>
                        <Avatar alt={product?.name} src={product?.image} />
                    </ListItemAvatar>

                    <ListItemText
                        primary={
                            <Typography component="div" variant="body1" color="text.primary" fontWeight={600}>
                                {product?.name}
                            </Typography>
                        }
                        secondary={
                            <React.Fragment>
                                <Typography component="div" variant="body2" color="text.primary">
                                    Phân loại hàng: {product?.attributes?.[0]?.value}, {product?.attributes?.[1]?.value}
                                </Typography>
                                <Typography component="div" variant="body2" color="text.primary">
                                    x {product?.quantity}
                                </Typography>
                            </React.Fragment>
                        }
                    />

                    {product?.isAbleToReview && order?.status === 'Completed' && order?.orderItems?.length >= 1 && (
                        <div className="d-flex justify-content-end col-12" style={{ marginTop: '10px' }}>
                            <ReviewDialog order={product} OrderId={order._id} />
                        </div>
                    )}
                </ListItem>
            </Card>
            <Divider />
        </Link>
    );
}
