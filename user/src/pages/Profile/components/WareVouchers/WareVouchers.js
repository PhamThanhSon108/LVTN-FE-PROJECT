import {
    Button,
    CardContent,
    CardHeader,
    CircularProgress,
    Divider,
    LinearProgress,
    TextField,
    Typography,
    styled,
} from '@mui/material';
import React, { Fragment, useEffect, useRef, useState } from 'react';

import { Link } from 'react-router-dom';
import styles from './WareVouchers.module.scss';
import Voucher from '~/pages/HomeScreen/components/Vouchers/components/Voucher/Voucher';
import { LoadingButton } from '@mui/lab';
import { addVoucher, getMyVouchers } from '~/Redux/Actions/voucherAction';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Toastobjects } from '~/Redux/Actions/cartActions';
import { Card } from 'react-bootstrap';
const StyledCardContent = styled(CardContent)(({ theme }) => ({
    paddingRight: '8px',
    paddingLeft: '0px',
    paddingTop: '16px',
    paddingBottom: '8px',
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
    if (loading)
        return (
            <div className="col-12 flex-column align-items-center">
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
                                Thêm
                            </LoadingButton>
                        </div>
                    }
                />
                <Divider />
                <div className="col-12 d-flex justify-content-center align-items-center" style={{ height: '60vh' }}>
                    <CircularProgress />
                </div>
            </div>
        );

    return (
        <Fragment>
            <div className={`${styles.container} col-12`}>

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

                <StyledCardContent sx={{ flexWrap: 'wrap', display: 'flex', width: '100%' }} className="row">
                    {!(vouchers?.length > 0) ? (
                        <div className="col-12 d-flex justify-content-center flex-column align-items-center">
                            <div className="d-flex justify-content-center flex-column">
                                <Typography>Bạn chưa có voucher nào</Typography>
                                <Link to={'/voucher'}>
                                    <Button sx={{ mt: 1 }} variant="contained" color="primary">
                                        Săn ngay
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    ) : null}

                    {vouchers?.map((voucher) => {
                        return (
                            <div key={voucher?._id} className="col-lg-6 col-md-12 col-sm-12">
                                <Voucher size="medium" voucher={voucher} myVoucher />
                            </div>
                        );

                    })}
                </StyledCardContent>
            </div>
        </Fragment>
    );
}
