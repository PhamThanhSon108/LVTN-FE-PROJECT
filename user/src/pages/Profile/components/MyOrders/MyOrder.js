import moment from 'moment';
import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { formatMoney } from '~/utils/formatMoney';
import { useDispatch, useSelector } from 'react-redux';
import { getMyOrders } from '~/Redux/Actions/orderActions';
import Loading from '~/components/LoadingError/Loading';
import Message from '~/components/LoadingError/Error';
import { Button, Card, Chip, CircularProgress, Pagination, Typography } from '@mui/material';
import { stepShipping } from '~/pages/DetailOrder/DetailOrder';
import { getUserDetails } from '~/Redux/Actions/userActions';
import useSearchParamsCustom from '~/hooks/useSearchParamCustom';
const MyOrders = () => {
    const dispatch = useDispatch();
    const myOrders = useSelector((state) => state.myOrders);
    const { loading, error, orders } = myOrders;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo, loading: loadingGetUserInfo } = userLogin;
    const { getParamValue, replaceParams } = useSearchParamsCustom();
    // const handleGetMyOrderWhenDoNotHaveUserId = async() => {
    //      if (localStorage.getItem('userInfo') && !userInfo?._id) {
    //          dispatch(getUserDetails('profile'));
    //      }
    //      dispatch(getMyOrders)
    // }
    const pageWantTochange = getParamValue('page') || 1;
    useEffect(() => {
        if (userInfo?._id) {
            dispatch(getMyOrders({ page: Number(pageWantTochange) - 1 }));
        }
    }, [userInfo, pageWantTochange]);
    if (loading || loadingGetUserInfo) {
        return (
            <Card
                className="col-12"
                sx={{
                    p: '12px 12px',
                    display: 'flex',
                    alignItems: 'start',
                    justifyContent: 'center',
                    flexDirection: 'column',
                }}
            >
                <table className="col-12 table" style={{ width: '100%' }}>
                    <thead className="col-12">
                        <tr className="col-12">
                            <th>ID</th>
                            <th>Trạng thái</th>
                            <th>Thời gian</th>
                            <th>Tổng thanh toán</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="col-12"></tr>
                    </tbody>
                </table>
                <div
                    className="d-flex justify-content-center align-items-center col-12"
                    style={{ minHeight: 'calc(50vh)', width: '100%' }}
                >
                    <CircularProgress />
                </div>
            </Card>
        );
    }
    if (error) {
        return <Message variant="alert-danger">{error}</Message>;
    }
    return (
        <div className=" d-flex justify-content-center align-items-center flex-column">
            <Fragment>
                {orders?.orders?.length === 0 && userInfo?._id ? (
                    <div className="col-12  text-center mt-3">
                        <Typography>Bạn chưa có đơn hàng nào</Typography>
                        <Link
                            className="btn mx-2 px-3 py-2"
                            to="/"
                            style={{
                                fontSize: '12px',
                                marginTop: '4px',
                            }}
                        >
                            <Button variant="contained" sx={{ width: '100%' }} color="primary">
                                SHOPPING NGAY!
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <Card className="col-12" sx={{ p: '0px 12px' }}>
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Trạng thái</th>
                                        <th>Thời gian</th>
                                        <th>Tổng thanh toán</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders?.orders?.map((order) => (
                                        <tr
                                            className={`${order?.status === 'Cancelled' && 'alert-dark'} 
                                            ${order?.status === 'Completed' && ' alert-success'}
                                            ${order?.status === 'Failed' && 'alert-danger'}
                                            `}
                                            key={order._id}
                                        >
                                            {' '}
                                            <td>
                                                <a href={`/order/${order._id}`} className="link">
                                                    {order._id}
                                                </a>
                                            </td>
                                            <td>
                                                <Chip
                                                    variant="outlined"
                                                    color={stepShipping?.[order?.status]?.color}
                                                    label={
                                                        stepShipping?.[order?.status]?.labelActive ||
                                                        'Trạng thái đơn hàng'
                                                    }
                                                />
                                            </td>
                                            <td>
                                                <Typography>
                                                    {moment(order.createdAt).format('DD/MM/YYYY hh:mm')}
                                                </Typography>
                                            </td>
                                            <td>
                                                <Typography color={'error'}>
                                                    {formatMoney(order.totalPayment)}{' '}
                                                </Typography>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {!loading && !loadingGetUserInfo && orders?.pages > 1 && pageWantTochange <= orders?.pages ? (
                            <div className="d-flex col-12 justify-content-end mb-2">
                                <Pagination
                                    onChange={(e, page) => {
                                        replaceParams([{ key: 'page', value: page }]);
                                    }}
                                    count={orders?.pages}
                                    page={Number(orders?.page) + 1}
                                    color="primary"
                                />
                            </div>
                        ) : null}
                    </Card>
                )}
            </Fragment>
        </div>
    );
};

export default MyOrders;
