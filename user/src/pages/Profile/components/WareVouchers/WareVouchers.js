import { CardContent, CardHeader, Divider, TextField, Typography, styled } from '@mui/material';
import React from 'react';

import { Link } from 'react-router-dom';
import styles from './WareVouchers.module.scss';
import Voucher from '~/pages/HomeScreen/components/Vouchers/components/Voucher/Voucher';
import { LoadingButton } from '@mui/lab';
const StyledCardContent = styled(CardContent)(({ theme }) => ({
    '&:last-child': {
        padding: '0px 2px 4px',
    },
}));
export default function WareVouchers() {
    return (
        <div className={styles.container}>
            <CardHeader
                sx={{ display: 'flex', alignItems: 'center' }}
                title={
                    <div className="d-flex justify-content-center align-content-center align-items-center">
                        <Typography sx={{ mr: 2 }} variant="h6">
                            Mã voucher
                        </Typography>
                        <TextField size="small" placeholder="Nhập mã code" sx={{ mr: 2 }} />
                        <LoadingButton variant="contained" size="medium">
                            Lưu
                        </LoadingButton>
                    </div>
                }
            />
            <Divider />
            <StyledCardContent
                sx={{ flexWrap: 'wrap', display: 'flex', padding: 0, pb: '0px', width: '100%' }}
                className={styles.listVouchersWrapper}
            >
                {[1, 2, 3, 4]?.map((category, index) => {
                    return <Voucher size="small" />;
                })}
            </StyledCardContent>
        </div>
    );
}
