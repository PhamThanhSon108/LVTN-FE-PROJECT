import WrapConfirmModal from '~/components/Modal/WrapConfirmModal';
import { LoadingButton } from '@mui/lab';
import usePlaceOrder from './hook/usePlaceOrder';
import { Fragment } from 'react';
import {
    Avatar,
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
    if (attributes && attributes.length > 0) {
        return attributes?.map((attribute) => (
            <ListItemText key={attribute?.value} className="col-1">
                <Typography variant="body1">
                    {attribute.name}: {attribute?.value}
                </Typography>
            </ListItemText>
        ));
    } else return <Fragment />;
};

const PlaceOrderScreen = ({ history }) => {
    const {
        isOpenModalVoucher,
        voucher,
        handleApplyVoucher,
        handleOpenModalVoucher,
        loadingGetList,
        address,
        isOpenModalAddress,
        loadingShippingFee,
        handleOpenModalAddress,
        shippingFee,
        userInfo,
        cartOrder,
        handleChangeAddress,
        createContent,
        placeOrderHandler,
        loading,
    } = usePlaceOrder(history);

    return (
        <div className="container">
            <ModalAddress
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
                            `${address?.name || userInfo?.name} | ${address?.phone || userInfo?.phone}`
                        )}
                    </Typography>

                    <Typography variant="caption" color={'InfoText'} className="col-6">
                        {loadingGetList ? (
                            <CircularProgress size={15} />
                        ) : (
                            `${address?.specificAddress}, ${address?.ward?.name}, ${address?.district?.name}, ${address?.province?.name}`
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
                                <ListItemAvatar>
                                    <Avatar
                                        src={product.variant.product.images?.[0]}
                                        alt={product.variant.product.name}
                                    />
                                </ListItemAvatar>
                                <ListItemText className="col-5">
                                    <Typography variant="body1">{product.variant.product.name}</Typography>
                                </ListItemText>

                                <RenderAttributes attributes={product.attributes} />

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
                    <Typography className="col-4" variant="body1" sx={{ color: 'var(--neutral-5)' }}>
                        Đơn vị vận chuyển
                    </Typography>
                    <div className="col-5">
                        <Typography variant="body1">Giao hàng nhanh</Typography>
                        <Typography variant="caption" color="error">
                            Nhận hàng dự kiến vào{' '}
                            {loadingGetList || loadingShippingFee ? (
                                <CircularProgress size={15} />
                            ) : (
                                moment(shippingFee?.leadTime?.leadtime * 1000).format('L')
                            )}
                        </Typography>
                    </div>

                    <Typography sx={{ textAlign: 'end' }} className="col-3 align-content-end" variant="body1">
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
                <Divider />
                <div className={styles.voucherBody}>
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
                        <RadioGroup defaultValue="paywithcash" row sx={{ p: 'var(--space-16) var(--space-0)' }}>
                            <FormControlLabel
                                value="paywithcash"
                                control={<Radio size="small" />}
                                label="Thanh toán khi nhận hàng"
                            />
                            <FormControlLabel
                                color="#d32f2f"
                                value="paywithmomo"
                                control={<Radio size="small" />}
                                label="Thanh toán qua momo"
                            />
                        </RadioGroup>
                    </FormControl>
                    <Divider />
                    <div className={styles.totalFee}>
                        <div className={styles.totalFeeItem}>
                            <Typography sx={{ textAlign: 'end', pr: 1 }} variant="body1">
                                Tổng tiền hàng:
                            </Typography>
                            <Typography sx={{ textAlign: 'end' }} variant="body1">
                                {formatMoney(cartOrder.priceOfProducts || 0)}
                            </Typography>
                        </div>

                        <div className={styles.totalFeeItem}>
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
                        <div className={styles.totalFeeItem}>
                            <Typography sx={{ textAlign: 'end', pr: 1 }} variant="body1">
                                Khuyến mãi:
                            </Typography>
                            <Typography sx={{ textAlign: 'end' }} variant="body1">
                                -{formatMoney(voucher?.discount || 0)}
                            </Typography>
                        </div>
                        <div className={styles.totalFeeItem}>
                            <Typography sx={{ textAlign: 'end', pr: 1 }} variant="body1">
                                Tổng thanh toán:
                            </Typography>
                            <Typography sx={{ textAlign: 'end', color: 'red' }} variant="h6">
                                {formatMoney(cartOrder.total)}
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

                <WrapConfirmModal content={createContent()} handleSubmit={placeOrderHandler}>
                    <LoadingButton
                        sx={{ width: '30%' }}
                        type="submit"
                        color="primary"
                        variant="contained"
                        loading={loading}
                    >
                        ĐẶT HÀNG
                    </LoadingButton>
                </WrapConfirmModal>
            </div>
        </div>
    );
};

export default PlaceOrderScreen;
