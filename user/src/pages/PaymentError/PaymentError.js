import React from 'react';
import { Link } from 'react-router-dom';
import ErrorIcon from '@mui/icons-material/Error';
import { Box, Button, Typography } from '@mui/material';
import useSearchParamsCustom from '~/hooks/useSearchParamCustom';
import { statusErrorMomo } from '~/constant/paymentConstants';
const PaymentError = () => {
    const { getParamValue } = useSearchParamsCustom();
    return (
        <div className="container my-5">
            <div className="row d-flex justify-content-center align-items-center">
                <div className="mb-2 mb-sm-5   d-flex justify-content-center align-items-center flex-column">
                    <Box
                        className="d-flex align-items-center justify-content-center"
                        style={{ height: 100, width: 100, borderRadius: 50, backgroundColor: '#f5dede' }}
                    >
                        <ErrorIcon color="error" sx={{ fontSize: 50 }} />
                    </Box>
                    <Typography className="mt-3 mb-1" sx={{ fontWeight: '600' }} color={'Red'}>
                        GIAO DỊCH THẤT BẠI.
                    </Typography>
                    <Typography variant="body2" color={'Red'}>
                        {statusErrorMomo?.[Number(getParamValue('resultCode'))] || ''}
                    </Typography>
                    <Button className="col-md-3 col-sm-6 col-12 btn btn-success mt-3" variant="contained">
                        <Link to="/" className="text-white text-decoration-none">
                            Về trang chủ
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default PaymentError;
