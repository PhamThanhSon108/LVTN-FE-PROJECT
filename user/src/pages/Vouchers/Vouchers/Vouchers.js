import React, { useEffect } from 'react';

import { Link } from 'react-router-dom';

import { Avatar, Card, CardContent, CardHeader, Divider, Tooltip, Typography, cardContentClasses } from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import { ListCategory } from '~/Redux/Actions/categoryActions';
import styles from './Vouchers.module.scss';
import styled from '@emotion/styled';
import Voucher from './components/Voucher/Voucher';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
const StyledCardContent = styled(CardContent)(({ theme }) => ({
    '&:last-child': {
        padding: '0px 2px 4px',
    },
}));
export default function Vouchers() {
    return (
        <Card className={styles.container}>
            <CardHeader
                sx={{ display: 'flex', alignItems: 'center' }}
                title={
                    <div className="d-flex justify-content-between align-content-center align-items-center">
                        <Typography noWrap variant="button" color="text.secondary">
                            KHUYẾN MÃI
                        </Typography>
                        <Link to={'/voucher'} style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                            <Typography color="primary" variant="body1" fontSize="14px">
                                Xem nhiều hơn <ArrowForwardIosIcon fontSize="12px" />
                            </Typography>
                        </Link>
                    </div>
                }
            />
            <Divider />
            <StyledCardContent sx={{ padding: 0, pb: '0px', width: '100%' }} className={styles.listVouchersWrapper}>
                {[1, 2, 3, 4]?.map((category, index) => {
                    return <Voucher />;
                })}
            </StyledCardContent>
        </Card>
    );
}
