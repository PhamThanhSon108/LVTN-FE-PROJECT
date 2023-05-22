import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import moment from 'moment';

import image, { imageOrder } from '~/assets/images';

import { ReviewDialog } from '~/components/profileComponents/Review/ReviewDialog';

import { LoadingButton } from '@mui/lab';
import { cancelOrder, confirmPaid, getOrderDetails, payOrder } from '~/Redux/Actions/orderActions';
import Message from '~/components/LoadingError/Error';
import {
    Box,
    Button,
    Card,
    CardActions,
    CircularProgress,
    Divider,
    Stack,
    Step,
    StepConnector,
    StepContent,
    StepLabel,
    Stepper,
    Tooltip,
    Typography,
    stepConnectorClasses,
    styled,
} from '@mui/material';

import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import StickyNote2OutlinedIcon from '@mui/icons-material/StickyNote2Outlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import { formatMoney } from '~/utils/formatMoney';
import ProductInOrder from './Product/ProductInOrder';
import { PAY_WITH_MOMO } from '../PlaceOrder/hook/usePlaceOrder';
import ModalCancelOrder from './components/ModalCancelOrder/ModalCancelOrder';
export const stepShipping = {
    placed: {
        icon: <StickyNote2OutlinedIcon />,
        label: 'Đặt hàng',
        labelActive: 'Đơn hàng đang chờ xử lý',
        color: 'primary',
    },
    confirm: {
        icon: <CheckOutlinedIcon />,
        label: 'Xác nhận đơn hàng',
        labelActive: 'Đã xác nhận đơn',
        color: 'primary',
    },
    delivering: {
        icon: <LocalShippingOutlinedIcon />,
        label: 'Giao hàng',
        labelActive: 'Đang giao hàng',
        color: 'primary',
    },
    delivered: {
        icon: <LocalShippingOutlinedIcon />,
        label: 'Đã giao hàng',
        labelActive: 'Giao hàng thành công',
        color: 'primary',
    },
    cancelled: {
        icon: <CancelOutlinedIcon />,
        label: 'Đơn hàng bị hủy',
        labelActive: 'Đơn hàng bị hủy',
        color: 'error',
    },
    completed: {
        icon: <VerifiedUserOutlinedIcon />,
        label: 'Hoàn tất',
        labelActive: 'Hoàn tất đơn hàng',
        color: 'success',
    },
    paid: { icon: <PaidOutlinedIcon />, label: 'Thanh toán', labelActive: 'Đã thanh toán', color: 'primary' },
};

const stepperPayWithMomo = [
    { step: ['placed'] },
    { step: ['paid'] },
    { step: ['confirm'] },
    { step: ['delivering', 'delivered'] },
    { step: ['completed'] },
];

const stepperPayWithMomoFirstConfirm = [
    { step: ['placed'] },
    { step: ['confirm'] },
    { step: ['paid'] },
    { step: ['delivering', 'delivered'] },
    { step: ['completed'] },
];
const stepperPayWithCash = [
    { step: ['placed'] },
    { step: ['confirm', 'paid'] },
    { step: ['delivering', 'delivered'] },

    { step: ['completed'] },
];

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
    backgroundColor: 'white',
    border: '5px solid rgba(0,0,0,0.3)',
    color: 'rgba(0,0,0,0.3)',
    zIndex: 1,
    width: 70,
    height: 70,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    ...(ownerState.active && {
        backgroundColor: 'white',
        border: '3px solid green',
        color: 'green',
    }),
    ...(ownerState.completed && {
        backgroundColor: 'green',
        border: '3px solid green',
        boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
        color: 'white',
    }),
    svg: {
        fontSize: '2rem',
    },
}));

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 35,
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundColor: 'green',
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundColor: 'green',
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        height: 3,
        border: 0,
        backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : 'rgba(0,0,0,0.3)',

        borderRadius: 1,
    },
}));

function ColorlibStepIcon(props) {
    const { active, completed, className } = props;

    return (
        <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
            {stepShipping?.[props?.status]?.icon}
        </ColorlibStepIconRoot>
    );
}

const DetailOrder = () => {
    window.scrollTo(0, 0);
    moment.locale('vi');
    const { id: orderId } = useParams();
    const dispatch = useDispatch();

    const orderDetails = useSelector((state) => state.orderDetails);
    const { order, loading, error } = orderDetails;
    const orderPay = useSelector((state) => state.orderPay);
    const { loading: loadingPay, success: successPay } = orderPay;

    const orderConfirmPaid = useSelector((state) => state.orderConfirmPaid);
    const { loading: loadingConfirmPaid, success: successConfirmPaid } = orderConfirmPaid;

    const productReviewCreate = useSelector((state) => state.productReviewCreate);
    const {
        loading: loadingCreateReview,
        error: errorCreateReview,
        success: successCreateReview,
    } = productReviewCreate;

    const cancelOrderHandler = () => {
        if (window.confirm('Are you sure??')) {
            dispatch(cancelOrder({ orderId: order?._id }));
        }
    };
    const handlePaid = () => {
        if (window.confirm('Are you sure??')) {
            dispatch(confirmPaid({ orderId: order?._id }));
        }
    };
    //gọi thêm userLogin để lấy số điện thoại
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        dispatch(getOrderDetails(orderId));
    }, [successConfirmPaid]);

    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(orderId, paymentResult));
    };
    const lastStatus = order?.statusHistory.at(-1)?.status;

    const paymentMethod = order?.paymentInformation?.paymentMethod;
    let indexOfConfirm = order?.statusHistory?.findIndex((step) => step?.status === 'confirm');
    let indexOfPaid = order?.statusHistory?.findIndex((step) => step?.status === 'paid');

    const stepperPayWithMomoFlexible =
        paymentMethod === '2' && (indexOfConfirm < indexOfPaid || indexOfPaid === -1) && indexOfConfirm >= 0
            ? stepperPayWithMomoFirstConfirm
            : stepperPayWithMomo;

    const stepperNoCancelStatus = paymentMethod === '1' ? stepperPayWithCash : stepperPayWithMomoFlexible;

    const stepper =
        lastStatus === 'cancelled'
            ? order?.statusHistory.reduce((stepper, status) => {
                  if (status.status === 'cancelled') {
                      const newStepper = [...stepper, { step: ['cancelled'] }];
                      return newStepper;
                  }
                  const step = stepperNoCancelStatus?.find((currentStatus) =>
                      currentStatus?.step?.find((step) => step === status.status),
                  );
                  if (step) {
                      if (step.step[0] === status?.status) {
                          stepper.push(step);
                      }
                  }
                  return stepper;
              }, [])
            : stepperNoCancelStatus;

    return (
        <div className="container">
            <div className="content-header"></div>
            <Card
                sx={{
                    padding: 4,
                    minHeight: '195px',
                    alignItems: 'center',
                    display: 'flex',
                    justifyContent: 'start',
                    flexDirection: 'column',
                }}
            >
                <Box
                    className="d-flex justify-content-end align-items-lg-center"
                    sx={{ width: '100%', mb: 2, borderBottom: '1px solid var(--border-color)', pb: 1 }}
                >
                    <Typography component="div" variant="body1" color="text.primary">
                        MÃ ĐƠN HÀNG: {order?._id.toUpperCase()}
                    </Typography>
                    {paymentMethod === PAY_WITH_MOMO.toString() &&
                    (lastStatus === 'placed' || lastStatus === 'confirm') &&
                    !order?.paymentInformation?.paid ? (
                        <a href={order?.paymentInformation?.payUrl}>
                            <Tooltip
                                title={`Giao dịch sẽ hết hạn sau ${moment(order?.paymentInformation.createdAt)
                                    .add(1, 'hour')
                                    .add(33, 'minutes')
                                    .format('hh:mm DD/MM/YYYY')}`}
                            >
                                <Button sx={{ ml: 3 }} variant="contained">
                                    THANH TOÁN
                                </Button>
                            </Tooltip>
                        </a>
                    ) : null}
                </Box>

                {loading ? (
                    <CircularProgress />
                ) : (
                    <Stack sx={{ width: '100%' }} spacing={4}>
                        <Stepper alternativeLabel connector={<ColorlibConnector />}>
                            {stepper?.map((status) => {
                                //Object những status có trong lịch sử
                                const currentStatus = order?.statusHistory
                                    ?.filter((historyStatus) =>
                                        status?.step?.find((step) => step === historyStatus?.status),
                                    )
                                    .at(-1);
                                //
                                const isCompledStatus =
                                    status?.step?.filter((step) => step === lastStatus)?.at(-1) ||
                                    status?.step[0] === 'cancelled';

                                const placedIsConfirmPaymentWithCash =
                                    currentStatus?.status === 'placed' &&
                                    order?.statusHistory?.find((step) => step?.status === 'confirm');

                                const confirmPaywithCash =
                                    currentStatus?.status === 'confirm' &&
                                    paymentMethod === '1' &&
                                    !order?.statusHistory?.find((step) => step?.status === 'paid');

                                const labelActive = placedIsConfirmPaymentWithCash ? (
                                    <Typography variant="body1">Đã đặt hàng</Typography>
                                ) : (
                                    <Typography variant="body1">
                                        {paymentMethod === '2' && currentStatus?.status === 'paid'
                                            ? `${stepShipping?.[currentStatus?.status]?.labelActive} (${formatMoney(
                                                  order?.totalPayment || 0,
                                              )})`
                                            : confirmPaywithCash
                                            ? 'Đã xác nhận thông tin thanh toán'
                                            : stepShipping?.[currentStatus?.status]?.labelActive}
                                    </Typography>
                                );

                                const resonCancelOrder =
                                    currentStatus?.status === 'cancelled' ? (
                                        <Typography variant="body1">{currentStatus?.description}</Typography>
                                    ) : null;

                                return (
                                    <Step completed={isCompledStatus} active={currentStatus} key={status?.step[0]}>
                                        <StepLabel
                                            StepIconComponent={(props) => (
                                                <ColorlibStepIcon
                                                    {...props}
                                                    status={currentStatus?.status || status?.step[0]}
                                                />
                                            )}
                                        >
                                            {currentStatus ? (
                                                labelActive
                                            ) : (
                                                <Typography variant="body1">
                                                    {stepShipping?.[status?.step[0]].label}
                                                </Typography>
                                            )}

                                            {currentStatus ? (
                                                <Typography variant="caption">
                                                    {moment(currentStatus?.createdAt).format('HH:mm:ss DD/MM/YYYY')}
                                                </Typography>
                                            ) : null}
                                            {resonCancelOrder}
                                        </StepLabel>
                                    </Step>
                                );
                            })}
                        </Stepper>
                    </Stack>
                )}
            </Card>

            <Card className="mt-2">
                <Box className="d-flex justify-content-between align-items-center p-3 ">
                    <Typography>
                        Ngày nhận hàng dự kiến:{' '}
                        {order?.delivery?.leadTime && moment(order?.delivery?.leadTime).format('DD/MM/YYYY')}
                    </Typography>
                    {order?.status === 'delivered' ? (
                        <LoadingButton
                            loading={loadingConfirmPaid}
                            disabled={order?.status === 'cancelled'}
                            onClick={handlePaid}
                            variant="contained"
                        >
                            Đã nhận hàng
                        </LoadingButton>
                    ) : null}
                    {lastStatus === 'delivering' ? (
                        <a
                            rel="noopener noreferrer"
                            target="_blank"
                            href={`https://tracking.ghn.dev/?order_code=${order?.delivery?.deliveryCode}`}
                        >
                            <Button sx={{ ml: 3 }} variant="contained">
                                Tra cứu đơn hàng
                            </Button>
                        </a>
                    ) : null}
                </Box>
                <Divider />
                {order?.status === 'placed' && !order?.paymentInformation?.paid ? <ModalCancelOrder /> : null}
            </Card>

            <Card className="p-3 mt-2">
                <Box className="d-flex justify-content-between flex-column ">
                    <Typography variant="h6" sx={{ mb: 1 }}>
                        Địa chỉ nhận hàng
                    </Typography>
                </Box>
                <Box className="d-flex col-12">
                    <Box className="d-flex flex-column col-6">
                        <Typography variant="body1" sx={{ mb: 1 }}>
                            {order?.delivery.to_name}
                        </Typography>
                        <Typography variant="caption">{order?.delivery?.to_phone}</Typography>

                        <Typography variant="caption">
                            {`${order?.delivery?.to_address || ''}, ${order?.delivery?.to_ward_name || ''}, ${
                                order?.delivery?.to_district_name || ''
                            }, ${order?.delivery?.to_province_name || ''}`}
                        </Typography>
                    </Box>

                    <Box>
                        <Stepper orientation="vertical">
                            {order?.statusHistory.map((step, index) => (
                                <Step key={step?._id}>
                                    <StepLabel
                                        sx={{ svg: { color: 'green' } }}
                                        StepIconComponent={() => stepShipping?.[step?.status]?.icon}
                                    >
                                        {stepShipping?.[step?.status]?.labelActive}
                                    </StepLabel>
                                    <StepContent>
                                        <Typography variant="caption">
                                            Vào {moment(step?.createdAt).format('HH:mm:ss DD/MM/YYYY')}
                                        </Typography>
                                    </StepContent>
                                </Step>
                            ))}
                        </Stepper>
                    </Box>
                </Box>

                {/* 2 */}
            </Card>
            <Card className="d-flex p-3 mt-2 col-12">
                <Box className="col-8">
                    {order?.orderItems.length === 0 ? (
                        <Message variant="alert-info mt-5">Bạn chưa chọn sản phẩm nào</Message>
                    ) : (
                        <>
                            {order?.orderItems.map((item, index) => (
                                <ProductInOrder product={item} />
                            ))}
                        </>
                    )}
                </Box>
                {/* total */}
                <Box
                    className="col-4"
                    style={{
                        borderLeft: '1px solid rgba(0, 0, 0, .09)',
                        backgroundColor: '#fff',
                        paddingLeft: '15px',
                    }}
                >
                    <table
                        className="table table-bordered"
                        style={{
                            backgroundColor: '#fff',
                        }}
                    >
                        <tbody>
                            <tr>
                                <td>
                                    <Typography component="div" variant="body1" color="text.primary">
                                        Tiền hàng
                                    </Typography>
                                </td>
                                <td>
                                    <Typography component="div" variant="body1" color="text.primary">
                                        {formatMoney(order?.totalProductPrice || 0)}
                                    </Typography>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Typography component="div" variant="body1" color="text.primary">
                                        Phí vận chuyển
                                    </Typography>
                                </td>
                                <td>
                                    <Typography component="div" variant="body1" color="text.primary">
                                        {formatMoney(order?.shippingPrice || 0)}
                                    </Typography>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Typography component="div" variant="body1" color="text.primary">
                                        Giảm giá
                                    </Typography>
                                </td>
                                <td>
                                    <Typography component="div" variant="body1" color="text.primary">
                                        {formatMoney(order?.totalDiscount || 0)}
                                    </Typography>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Typography component="div" variant="body1" color="text.primary">
                                        Tổng thanh toán
                                    </Typography>
                                </td>
                                <td>
                                    <Typography component="div" variant="body1" color="error">
                                        {formatMoney(order?.totalPayment || 0)}
                                    </Typography>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <Typography component="div" variant="body1" color="text.primary">
                                        Phương thức thanh toán
                                    </Typography>
                                </td>
                                <td>
                                    <Typography component="div" variant="body1" color="error">
                                        {order?.paymentInformation?.paymentMethod === '2' ? 'Momo' : 'Tiền mặt'}
                                    </Typography>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </Box>
            </Card>
        </div>
    );
};

export default DetailOrder;
