import WrapConfirmModal from '~/components/Modal/WrapConfirmModal';
import { LoadingButton } from '@mui/lab';
import usePlaceOrder, { PAY_WITH_CASH, PAY_WITH_MOMO } from './hook/usePlaceOrder';
import { Fragment } from 'react';
import {
    Avatar,
    Backdrop,
    Box,
    Button,
    Card,
    CircularProgress,
    Divider,
    FormControl,
    FormControlLabel,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Radio,
    RadioGroup,
    TextField,
    Typography,
} from '@mui/material';
import WhereToVoteIcon from '@mui/icons-material/WhereToVote';
import DiscountIcon from '@mui/icons-material/Discount';
import styles from './PlaceOrder.module.scss';
import ModalAddress from './components/ModalAddress/ModalAddress';
import { formatMoney } from '~/utils/formatMoney';
import ModalVouchers from './components/ModalVouchers/ModalVouchers';
import Voucher from './components/Voucher/Voucher';
import moment from 'moment';

export const RenderAttributes = ({ attributes }) => {
    if (attributes && attributes?.length > 0) {
        return (
            <ListItemText className="col-2">
                <Typography variant="body1">
                    kích thước: {attributes?.[0]?.value}, màu sắc: {attributes?.[1]?.value}
                </Typography>
            </ListItemText>
        );
    } else return <Fragment />;
};

const PlaceOrderScreen = ({ history }) => {
    const {
        serviceList,
        service,
        changeNote,
        loadingApplyVoucher,
        priceIsReduced,
        paymentMethod,
        setService,
        setPaymentMethod,
        isOpenModalVoucher,
        voucher,
        handleApplyVoucher,
        handleOpenModalVoucher,
        loadingGetList,
        address,
        isOpenModalAddress,
        loadingShippingFee,
        handleOpenModalAddress,
        userInfo,
        cartOrder,
        handleChangeAddress,
        placeOrderHandler,
        loading,
    } = usePlaceOrder(history);

    return (
        <div className="container">
            <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <ModalAddress
                addressOld={address}
                isOpenModal={isOpenModalAddress}
                handleClose={handleOpenModalAddress}
                handleChangeAddress={handleChangeAddress}
            />
            <ModalVouchers
                voucherToApply={voucher}
                isOpenModal={isOpenModalVoucher}
                handleClose={handleOpenModalVoucher}
                handleApplyVoucher={handleApplyVoucher}
            />
            <Card className={styles.address}>
                <div className={styles.addressHeader}>
                    <WhereToVoteIcon sx={{ color: 'red' }} />
                    <Typography variant="h6" sx={{ color: 'red' }}>
                        Địa chỉ nhận hàng
                    </Typography>
                </div>
                <Divider />

                <div className={styles.addressBody}>
                    <Typography variant="body1" color={'InfoText'} className="col-3" sx={{ fontWeight: 600, pl: 1 }}>
                        {loadingGetList ? (
                            <CircularProgress size={15} />
                        ) : (
                            `${address?.name || userInfo?.name || 'Bạn chưa có địa chỉ giao hàng vui lòng chọn'} | ${
                                address?.phone || userInfo?.phone
                            }`
                        )}
                    </Typography>

                    <Typography variant="caption" color={'InfoText'} className="col-6">
                        {loadingGetList ? (
                            <CircularProgress size={15} />
                        ) : address?.province?.name ? (
                            `${address?.specificAddress}, ${address?.ward?.name}, ${address?.district?.name}, ${address?.province?.name}`
                        ) : (
                            ''
                        )}
                    </Typography>
                    <div className="col-1">
                        {address?.isDefault ? (
                            <Button size="small" variant="outlined" color="error" sx={{ fontSize: '0.6rem' }}>
                                Mặc định
                            </Button>
                        ) : null}
                    </div>
                    <div className="d-flex justify-content-end col-2">
                        <Button variant="text" sx={{ pr: 0 }} onClick={() => handleOpenModalAddress(true)}>
                            Thay đổi
                        </Button>
                    </div>
                </div>
            </Card>

            <Card className={styles.product}>
                <div className={styles.productHeader}>
                    <div className={styles.title}>
                        <Typography variant="h6">Sản phẩm</Typography>
                    </div>
                </div>
                <Divider />
                <div className={styles.productBody}>
                    <List className="row" sx={{ width: '100%', bgcolor: 'background.paper', pr: 0 }}>
                        {cartOrder.cartOrderItems?.map((product) => (
                            <ListItem key={product?._id} sx={{ width: '100%', pr: 0 }}>
                                {product?.variant?.deleted || product?.variant?.disabled ? (
                                    <ListItemText className="col-1">
                                        <Typography color={'error'} variant="body1">
                                            Sản phẩm tạm ngưng bán
                                        </Typography>
                                    </ListItemText>
                                ) : null}
                                <ListItemAvatar>
                                    <Avatar
                                        src={product.variant.product.images?.[0]}
                                        alt={product.variant.product.name}
                                    />
                                </ListItemAvatar>
                                <ListItemText className="col-5">
                                    <Typography variant="body1">{product.variant.product.name}</Typography>
                                </ListItemText>

                                <RenderAttributes attributes={product.variant.attributes} />

                                <ListItemText>
                                    <Typography variant="body1">x{product.quantity}</Typography>
                                </ListItemText>
                                <ListItemText className="d-flex justify-content-end">
                                    <Typography variant="body1" sx={{ textAlign: 'end' }}>
                                        Tổng tiền:{' '}
                                        {loadingGetList || loadingShippingFee ? (
                                            <CircularProgress size={15} />
                                        ) : (
                                            formatMoney(cartOrder.priceOfProducts || 0)
                                        )}
                                    </Typography>
                                </ListItemText>
                            </ListItem>
                        ))}
                    </List>
                </div>
                <Divider />
                <div className={styles.shipping}>
                    <Box
                        className="col-4 d-flex pl-3 pr-3 align-content-center align-items-center"
                        sx={{ paddingLeft: '1rem', paddingRight: '1rem', borderRight: '1px solid var(--border-color)' }}
                    >
                        <Typography className="col-3">Lời nhắn:</Typography>
                        <TextField
                            onChange={(e) => {
                                changeNote(e.target.value);
                            }}
                            className="col-9"
                            variant="outlined"
                            size="small"
                            placeholder="Lưu ý cho shipper"
                            inputProps={{ maxLength: 200 }}
                        ></TextField>
                    </Box>
                    <div className="col-2" style={{ paddingLeft: '1rem' }}>
                        <Typography
                            variant="body1"
                            sx={{
                                color: 'var(--neutral-5)',
                            }}
                        >
                            Đơn vị vận chuyển:
                        </Typography>
                        <Typography sx={{ mb: 1, color: 'primary' }} variant="body1">
                            Giao hàng nhanh
                        </Typography>
                    </div>
                    <div className="col-3" style={{ paddingLeft: '1rem' }}>
                        <div className="col-12 d-flex">
                            <Typography sx={{ mb: 1 }} variant="body1" className="col-3">
                                Dịch vụ:
                            </Typography>
                            <select
                                className="form-select col-9"
                                onChange={(e) => {
                                    setService(
                                        serviceList?.find(
                                            (service) => service?.service_id?.toString() === e.target.value,
                                        ),
                                    );
                                }}
                                placeholder="Chọn dịch vụ"
                                value={service?.service_id}
                                defaultValue={service?.service_id}
                                style={{ marginBottom: '8px' }}
                            >
                                {serviceList?.map((service) => (
                                    <option key={service?.service_id} value={service?.service_id}>
                                        {service?.short_name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <Typography variant="caption">
                            Nhận hàng dự kiến vào{'  '}
                            {loadingGetList || loadingShippingFee ? (
                                <CircularProgress size={15} />
                            ) : (
                                <Typography color="primary" variant="caption">
                                    {service?.leadTime && moment(service?.leadTime).format('L')}
                                </Typography>
                            )}
                        </Typography>
                    </div>

                    <Typography
                        sx={{ paddingLeft: '1rem', textAlign: 'end' }}
                        className="col-3 align-content-end"
                        variant="body1"
                    >
                        Phí giao hàng:{' '}
                        {loadingGetList || loadingShippingFee ? (
                            <CircularProgress size={15} />
                        ) : (
                            formatMoney(cartOrder.shippingFee || 0)
                        )}
                    </Typography>
                </div>
                <div className={styles.totalPriceProduct}>
                    <Typography variant="body1">
                        Tổng tiền {`(${cartOrder.cartOrderItems.length} sản phẩm)`}:{' '}
                        {loadingGetList || loadingShippingFee ? (
                            <CircularProgress size={15} />
                        ) : (
                            formatMoney(cartOrder.totalBeforeApplyVoucher || 0)
                        )}
                    </Typography>
                </div>
            </Card>

            <Card className={styles.voucher}>
                <div className={styles.voucherHeader}>
                    <div className={styles.title}>
                        <DiscountIcon color="primary" />
                        <Typography variant="h6">Voucher</Typography>
                    </div>

                    <Button onClick={() => handleOpenModalVoucher(true)} variant="outlined">
                        Thêm
                    </Button>
                </div>
                {voucher && <Divider />}
                <div className={styles.voucherBody}>
                    {loadingApplyVoucher ? (
                        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
                            <CircularProgress />
                        </div>
                    ) : null}
                    {voucher ? <Voucher voucher={voucher} handleApplyVoucher={handleApplyVoucher} canRemove /> : null}
                </div>
            </Card>

            <Card className={styles.voucher}>
                <div className={styles.voucherHeader}>
                    <div className={styles.title}>
                        <Typography variant="h6">Phương thức thanh toán</Typography>
                    </div>
                </div>
                <Divider />
                <div className={styles.voucherBody}>
                    <FormControl>
                        <RadioGroup
                            value={paymentMethod}
                            onChange={(e) => {
                                setPaymentMethod(e.target.value);
                            }}
                            row
                            sx={{ p: 'var(--space-16) var(--space-0)' }}
                        >
                            <FormControlLabel
                                value={PAY_WITH_CASH}
                                control={<Radio size="small" />}
                                label="Thanh toán khi nhận hàng"
                            />
                            <FormControlLabel
                                color="#d32f2f"
                                value={PAY_WITH_MOMO}
                                control={<Radio size="small" />}
                                label="Thanh toán qua momo"
                            />
                        </RadioGroup>
                    </FormControl>
                    <Divider />
                    <div className={styles.totalFee}>
                        <div className={styles.totalFeeItem + ' col-lg-3 col-sm-5'}>
                            <Typography sx={{ textAlign: 'end', pr: 1 }} variant="body1">
                                Tổng tiền hàng:
                            </Typography>
                            <Typography sx={{ textAlign: 'end' }} variant="body1">
                                {formatMoney(cartOrder.priceOfProducts || 0)}
                            </Typography>
                        </div>

                        <div className={styles.totalFeeItem + ' col-lg-3 col-sm-5'}>
                            <Typography sx={{ textAlign: 'end', pr: 1 }} variant="body1">
                                Phí vận chuyển:
                            </Typography>
                            <Typography sx={{ textAlign: 'end' }} variant="body1">
                                {loadingShippingFee ? (
                                    <CircularProgress size={15} />
                                ) : (
                                    formatMoney(cartOrder.shippingFee || 0)
                                )}
                            </Typography>
                        </div>
                        <div className={styles.totalFeeItem + ' col-lg-3 col-sm-5'}>
                            <Typography sx={{ textAlign: 'end', pr: 1 }} variant="body1">
                                Khuyến mãi:
                            </Typography>
                            <Typography sx={{ textAlign: 'end' }} variant="body1">
                                -{' '}
                                {loadingApplyVoucher ? (
                                    <CircularProgress size={15} />
                                ) : (
                                    formatMoney(priceIsReduced.totalDiscount || 0)
                                )}
                            </Typography>
                        </div>
                        <div className={styles.totalFeeItem + ' col-lg-3 col-sm-5'}>
                            <Typography sx={{ textAlign: 'end', pr: 1 }} variant="body1">
                                Tổng thanh toán:
                            </Typography>
                            <Typography sx={{ textAlign: 'end', color: 'red' }} variant="h6">
                                {loadingApplyVoucher ? <CircularProgress size={15} /> : formatMoney(cartOrder.total)}
                            </Typography>
                        </div>
                    </div>
                </div>
            </Card>

            <div
                className="row d-flex justify-items-end"
                style={{ padding: '24px 0', backgroundColor: '#fff', marginTop: '10px', justifyContent: 'end' }}
            >
                {/* total */}

                <LoadingButton
                    sx={{ width: '30%' }}
                    type="submit"
                    color="primary"
                    variant="contained"
                    loading={loading}
                    onClick={placeOrderHandler}
                    disabled={
                        !address ||
                        cartOrder.cartOrderItems?.find(
                            (product) => product?.variant?.disabled || product?.variant?.deleted,
                        )
                    }
                >
                    ĐẶT HÀNG
                </LoadingButton>
            </div>
        </div>
    );
};

export default PlaceOrderScreen;
