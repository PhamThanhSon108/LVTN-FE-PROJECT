import { Backdrop, Box, CircularProgress, Typography } from '@mui/material';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getOrderDetails } from '~/Redux/Actions/orderActions';
import { Toastobjects } from '~/components/LoadingError/Toast';

export default function WaitingPayment() {
    const { id: orderId } = useParams();
    const [time] = useState(moment());
    const dispatch = useDispatch();
    const orderDetails = useSelector((state) => state.orderDetails);
    const history = useHistory();
    const { order, loading, error } = orderDetails;
    useEffect(() => {
        const intervalCall = setInterval(() => {
            dispatch(getOrderDetails(orderId));
        }, 1000);
        return () => {
            // clean up
            clearInterval(intervalCall);
        };
    }, []);

    if (moment().valueOf() - time.valueOf() > 7 * 1000) {
        history.push('/time-to-process');
    }
    if (order?.paymentInformation?.paid && order?.statusHistory?.at(-1)?.status === 'paid') {
        toast.success('Thanh toán thành công', Toastobjects);
        setTimeout(() => {
            history.push(`/order/${orderId}`);
        }, 2000);
    }
    if (order && (order?.status !== 'placed' || order?.status !== 'confirm')) {
        history.push(`/`);
    }
    return (
        <div>
            <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <CircularProgress color="inherit" className="mb-2" />
                    <Typography>Đang xử lý thanh toán...</Typography>
                </Box>
            </Backdrop>
        </div>
    );
}
