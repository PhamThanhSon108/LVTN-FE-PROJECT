import React, { Fragment, useEffect, useState } from 'react';

import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { cancelOrder, deliverOrder, getOrderDetails, updateStatusOrder } from '../../Redux/Actions/OrderActions';
import moment from 'moment';

import OrderDetailProducts from './components/OrderDetailProducts/OrderDetailProducts';
import OrderDetailInfo from './components/OrderDetailInfo/OrderDetailInfo';
import { formatMoney } from '../../utils/formatMoney';
import { Alert, Breadcrumbs, Chip, LinearProgress, Tooltip, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';
import ModalCancelOrder from './components/ModalCancelOrder/ModalCancelOrder';
import ModalPreviewOrder from './components/ModalPreviewOrder/ModalPreviewOrder';
import ModalPrintBillOfLanding from './components/ModalPrintBillOfLanding/ModalPrintBillOfLanding';
import ModalUpdateCOD from './components/ModalUpdateCOD/ModalUpdateCOD';

const RenderButtonUpdateStatus = ({ children, canChange }) => {
  if (canChange) return children;
  return <Fragment />;
};

const OrderDetail = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading, error, order } = orderDetails;

  // const orderUser = useSelector((state) => state.orderPaid);
  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDelivered, success: successDelivered } = orderDeliver;
  const orderUpdateStatus = useSelector((state) => state.orderUpdateStatus);
  const { loading: loadingUpdate, success: successUpdateStatus } = orderUpdateStatus;
  const orderCancel = useSelector((state) => state.orderCancel);
  const { loading: loadingCancel, success: successCancel } = orderCancel;
  const [requiredNote, setRequiredNote] = useState();

  const saveStatusHandler = (status) => {
    if (window.confirm('Bạn có chắc muốn cập nhật?')) {
      dispatch(updateStatusOrder({ status, orderId: order._id, delivery: { requiredNote } }));
    }
  };

  useEffect(() => {
    dispatch(getOrderDetails(orderId));
  }, [dispatch, orderId, successDelivered, successUpdateStatus, successCancel]);

  return (
    <section>
      <Breadcrumbs aria-label="breadcrumb" className="mb-1">
        <Link underline="hover" color="inherit" to="/orders">
          Danh sách đơn hàng
        </Link>

        <Typography color="text.primary">Chi tiết đơn hàng</Typography>
      </Breadcrumbs>
      <div style={{ height: 2.5 }}>
        {loading ? (
          <LinearProgress sx={{ borderTopLeftRadius: 50, borderTopRightRadius: 50, height: '2.5px' }} />
        ) : null}
      </div>
      <div className="card">
        <header className="card-header p-3 Header-white">
          <div className="row align-items-center ">
            <div className="col-lg-6 col-md-6">
              <div className="d-flex align-items-center">
                <i className="far fa-calendar-alt mx-2"></i>
                <b className="text-black">Đặt hàng lúc {moment(order?.createdAt).format('hh:mm DD/MM/YYYY')} </b>
                <div className="col-3">
                  <RenderButtonUpdateStatus canChange={order?.status === 'delivering'}>
                    <ModalPrintBillOfLanding orderCode={order?.delivery?.deliveryCode} />
                  </RenderButtonUpdateStatus>
                </div>
                <div>
                  <RenderButtonUpdateStatus
                    canChange={order?.paymentInformation?.paymentMethod === '1' && order?.status === 'delivering'}
                  >
                    <ModalUpdateCOD />
                  </RenderButtonUpdateStatus>
                </div>
              </div>
              <div className="d-flex align-items-center  mt-1">
                <Typography variant="body2" className="text-black mx-3">
                  Order ID: {order?._id} |{' '}
                </Typography>
                <Typography variant="body2" color="primary">
                  Nhận hàng dự kiến vào: {moment(order?.delivery?.leadTime).format('DD/MM/YYYY')}
                </Typography>
              </div>
            </div>
            {
              <RenderButtonUpdateStatus
                canChange={order?.status === 'placed' || order?.status === 'confirm' || order?.status === 'delivering'}
              >
                <ModalCancelOrder />
              </RenderButtonUpdateStatus>
            }
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
                            <strong>Giảm giá</strong>
                          </td>
                          <td>{formatMoney(order?.totalDiscount || 0)}</td>
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

                    {order?.status !== 'cancelled' && order?.status !== 'completed' && (
                      <div style={{ padding: '10px', borderTop: '1px solid rgba(0,0,0,0.1)' }} className="">
                        <RenderButtonUpdateStatus canChange={order?.status === 'placed'}>
                          <LoadingButton
                            onClick={() => saveStatusHandler('confirm')}
                            variant="contained"
                            sx={{ width: '100%' }}
                            loading={loadingUpdate}
                          >
                            XÁC NHẬN ĐƠN HÀNG
                          </LoadingButton>
                        </RenderButtonUpdateStatus>

                        <RenderButtonUpdateStatus
                          canChange={
                            order?.status === 'confirm' &&
                            !order?.paymentInformation?.paid &&
                            order?.paymentInformation?.paymentMethod === '2'
                          }
                        >
                          <Alert severity="info">
                            Đơn hàng đang chờ khách hàng thanh toán trước khi bàn giao cho đơn vị vận chuyển
                          </Alert>
                        </RenderButtonUpdateStatus>

                        <RenderButtonUpdateStatus
                          canChange={
                            order?.paymentInformation?.paymentMethod === '2'
                              ? order?.status === 'confirm' && order.paymentInformation.paid
                              : order?.status === 'confirm'
                          }
                        >
                          <ModalPreviewOrder />
                        </RenderButtonUpdateStatus>
                        <RenderButtonUpdateStatus canChange={order?.status === 'delivering'}>
                          <LoadingButton
                            loading={loadingUpdate}
                            onClick={() => saveStatusHandler('delivered')}
                            className="mt-3"
                            variant="contained"
                            sx={{ width: '100%' }}
                            color="warning"
                          >
                            XÁC NHẬN GIAO HÀNG THÀNH CÔNG
                          </LoadingButton>
                        </RenderButtonUpdateStatus>

                        <RenderButtonUpdateStatus
                          canChange={
                            !order?.paymentInformation?.paid &&
                            order?.status === 'confirm' &&
                            order?.paymentInformation?.paymentMethod === '2'
                          }
                        >
                          <Tooltip title={'Bạn đã nhận được thanh toán của người dùng'}>
                            <LoadingButton
                              loading={loadingUpdate}
                              onClick={() => saveStatusHandler('confirm-payment')}
                              className="mt-3"
                              variant="contained"
                              sx={{ width: '100%' }}
                              color="warning"
                            >
                              XÁC NHẬN THANH TOÁN
                            </LoadingButton>
                          </Tooltip>
                        </RenderButtonUpdateStatus>

                        <RenderButtonUpdateStatus canChange={order?.status === 'delivered'}>
                          <Alert severity="info">Đơn hàng đang chờ xác nhận thanh toán của khách hàng</Alert>
                        </RenderButtonUpdateStatus>
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
