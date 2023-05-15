import { CardContent, CardHeader, Divider, LinearProgress, TextField, Typography, styled } from '@mui/material';
import React, { Fragment, useEffect, useRef, useState } from 'react';

import { Link } from 'react-router-dom';
import styles from './WareVouchers.module.scss';
import Voucher from '~/pages/HomeScreen/components/Vouchers/components/Voucher/Voucher';
import { LoadingButton } from '@mui/lab';
import { addVoucher, getMyVouchers } from '~/Redux/Actions/voucherAction';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Toastobjects } from '~/Redux/Actions/cartActions';
const StyledCardContent = styled(CardContent)(({ theme }) => ({
    '&:last-child': {
        padding: '0px 2px 4px',
    },
}));
const handleAfterFetch = {
    success: () => {
        toast.success('Thêm voucher thành công', Toastobjects);
    },
    error: (message) => {
        toast.error(message || 'Thêm voucher thất bại', Toastobjects);
    },
};
export default function WareVouchers() {
    const voucherReducer = useSelector((state) => state.myVouchers);
    const { vouchers, loading } = voucherReducer;
    const [code, setCode] = useState();
    const dispatch = useDispatch();
    const { loading: loadingAdd } = useSelector((state) => state.addVoucher);
    const handleSaveVoucher = () => {
        if (!code?.trim() || code?.indexOf(' ') !== -1) {
            toast.error('Code không bao gồm ký tự khoảng trắng', Toastobjects);
        } else {
            dispatch(addVoucher({ code: code?.trim(), handleAfterFetch }));
        }
    };
    useEffect(() => {
        dispatch(getMyVouchers());
    }, []);
    return (
        <Fragment>
            <div style={{ height: 2.5 }}>
                {loading ? (
                    <LinearProgress sx={{ borderTopLeftRadius: 50, borderTopRightRadius: 50, height: '2.5px' }} />
                ) : null}
            </div>
            <div className={styles.container}>
                <CardHeader
                    sx={{ display: 'flex', alignItems: 'center' }}
                    title={
                        <div className="d-flex justify-content-center align-content-center align-items-center">
                            <Typography sx={{ mr: 2 }} variant="h6">
                                Mã voucher
                            </Typography>
                            <TextField
                                size="small"
                                placeholder="Nhập mã code"
                                sx={{ mr: 2 }}
                                onChange={(e) => setCode(e.target.value)}
                            />
                            <LoadingButton
                                loading={loadingAdd}
                                disabled={!code || code?.length < 6 || code?.length > 10}
                                variant="contained"
                                size="medium"
                                onClick={handleSaveVoucher}
                            >
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
                    {vouchers?.map((voucher) => {
                        return <Voucher size="medium" key={voucher?._id} voucher={voucher} myVoucher />;
                    })}
                </StyledCardContent>
            </div>
        </Fragment>
    );
}
