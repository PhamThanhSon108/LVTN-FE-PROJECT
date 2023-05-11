import React, { useEffect, useState } from 'react';

import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { cancelOrder, deliverOrder, getOrderDetails, updateStatusOrder } from '../../Redux/Actions/OrderActions';
import moment from 'moment';

import OrderDetailProducts from './components/OrderDetailProducts/OrderDetailProducts';
import { statusAdminUpdate, statusToUpdate } from '../../constants/ordersConstants';
import OrderDetailInfo from './components/OrderDetailInfo/OrderDetailInfo';
import { formatMoney } from '../../utils/formatMoney';
import { Chip, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';

const OrderDetail = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading, error, order } = orderDetails;

  // const orderUser = useSelector((state) => state.orderPaid);
  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDelivered, success: successDelivered } = orderDeliver;
  const orderUpdateStatus = useSelector((state) => state.orderUpdateStatus);
  const { loading: loadingPaid, success: successUpdateStatus } = orderUpdateStatus;
  const orderCancel = useSelector((state) => state.orderCancel);
  const { loading: loadingCancel, success: successCancel } = orderCancel;
  const [status, setStatus] = useState(order?.status);

  const deliverHandler = () => {
    if (window.confirm('Are you sure??')) {
      dispatch(deliverOrder(order));
    }
  };

  const cancelOrderHandler = () => {
    if (window.confirm('Are you sure??')) {
      dispatch(cancelOrder(order));
    }
  };
  const undoSatusHandler = (status) => {
    if (window.confirm('Are you sure??')) {
      dispatch(updateStatusOrder({ status, orderId: order._id }));
    }
  };

  const saveStatusHandler = (status) => {
    if (window.confirm('Are you sure??')) {
      dispatch(updateStatusOrder({ status, orderId: order._id }));
    }
  };

  const findCompeletedStatus = (status) => {
    return order?.statusHistory?.find((step) => step?.status === status);
  };
  const confirmStatus = findCompeletedStatus('confirm');
  useEffect(() => {
    dispatch(getOrderDetails(orderId));
  }, [dispatch, orderId, successDelivered, successUpdateStatus, successCancel]);

  useEffect(() => {
    setStatus(order?.statatus);
  }, [order]);
  return (
    <section>
      <div className="card">
        <header className="card-header p-3 Header-white">
          <div className="row align-items-center ">
            <div className="col-lg-6 col-md-6">
              <span>
                <i className="far fa-calendar-alt mx-2"></i>
                <b className="text-black">Đặt hàng lúc {moment(order?.createdAt).format('hh:mm DD/MM/YYYY')}</b>
              </span>
              <br />
              <small className="text-black mx-3 ">
                Order ID: {order?._id} | Nhận hàng dự kiến vào {moment(order?.delivery?.leadTime).format('DD/MM/YYYY')}
              </small>
            </div>
            {(order?.status === 'placed' || order?.status === 'approved') && (
              <div className="col-lg-3 col-md-6 ms-auto d-flex justify-content-end align-items-center">
                <button
                  onClick={cancelOrderHandler}
                  className="btn btn-dark col-12"
                  style={{ marginBottom: '15px' }}
                  disabled={order?.status === 'cancelled'}
                >
                  Hủy đơn hàng
                </button>
              </div>
            )}
          </div>
        </header>
        <div className="card-body">
          {/* Order info */}
          <OrderDetailInfo order={order} />

          <div className="row">
            <div className="col-lg-9">
              <div className="table-responsive">
                <OrderDetailProducts order={order} loading={loading} />
              </div>
            </div>
            {/* Payment Info */}

            {
              <div className="col-lg-3">
                <div className="shadow-sm bg-light">
                  <div className="col-lg-12 col-12 col-md-12">
                    <table
                      className="table table-bordered"
                      style={{
                        backgroundColor: '#fff',
                      }}
                    >
                      <tbody>
                        <tr>
                          <td>
                            <strong>Tổng tiền hàng</strong>
                          </td>
                          <td>{formatMoney(order?.totalProductPrice || 0)}</td>
                        </tr>
                        <tr>
                          <td>
                            <strong>Phí vận chuyển</strong>
                          </td>
                          <td>{formatMoney(order?.shippingPrice || 0)}</td>
                        </tr>

                        <tr>
                          <td>
                            <strong>Tổng thanh toán</strong>
                          </td>
                          <td>
                            <Typography component="div" variant="body1" color="error">
                              {formatMoney(order?.totalPayment || 0)}
                            </Typography>
                          </td>
                        </tr>

                        <tr>
                          <td>
                            <strong>Phương thức thanh toán</strong>
                          </td>
                          <td>{order?.paymentInformation?.paymentMethod === '2' ? 'Momo' : 'Tiền mặt'}</td>
                        </tr>
                      </tbody>
                    </table>

                    {order?.status !== 'Cancelled' && order?.status !== 'Completed' && (
                      <div style={{ padding: '10px', borderTop: '1px solid rgba(0,0,0,0.1)' }} className="">
                        {confirmStatus ? (
                          <Chip
                            sx={{ width: '100%' }}
                            color="success"
                            label={`Xác nhận đơn hàng vào ${moment(confirmStatus?.createdAt).format(
                              'hh:mm DD/MM/YYYY',
                            )}`}
                          />
                        ) : (
                          <LoadingButton
                            onClick={() => saveStatusHandler('confirm')}
                            variant="contained"
                            sx={{ width: '100%' }}
                          >
                            XÁC NHẬN ĐƠN HÀNG
                          </LoadingButton>
                        )}

                        <LoadingButton
                          onClick={() => saveStatusHandler('delivery')}
                          className="mt-3"
                          variant="contained"
                          sx={{ width: '100%' }}
                        >
                          GIAO ĐƠN CHO BÊN VẬN CHUYỂN
                        </LoadingButton>

                        <LoadingButton className="mt-3" variant="contained" sx={{ width: '100%' }}>
                          HOÀN TẤT ĐƠN
                        </LoadingButton>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderDetail;
