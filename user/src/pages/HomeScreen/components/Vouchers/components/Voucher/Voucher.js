import { Box, Card, Chip, IconButton, LinearProgress, ListItem, ListItemText, Typography } from '@mui/material';
import React, { Fragment, useState } from 'react';
import styles from './Voucher.module.scss';
import moment from 'moment';
import { formatMoney } from '~/utils/formatMoney';
import DeleteIcon from '@mui/icons-material/Delete';
import { LoadingButton } from '@mui/lab';
import { useDispatch, useSelector } from 'react-redux';
import { addVoucher, getMyVouchers, getPublicVouchers } from '~/Redux/Actions/voucherAction';
import { toast } from 'react-toastify';
import { Toastobjects } from '~/Redux/Actions/cartActions';
import { Link } from 'react-router-dom';

export default function Voucher({ voucher, size = 'small', myVoucher = false }) {
    const [saveVoucher, setSaveVoucher] = useState();
    const percentUsed = (voucher?.used * 100) / voucher?.usageLimit;
    const discountType = voucher?.discountType;
    const discount = discountType === '1' ? formatMoney(voucher?.discount) : `${voucher?.discount} %`;
    const { loading } = useSelector((state) => state.addVoucher);
    const dispatch = useDispatch();
    const startDate = moment(voucher?.startDate);
    const effectiveLater = startDate > moment();
    const endOfUse = voucher.usageLimit <= voucher.used;
    const handleAfterFetch = {
        success: () => {
            if (myVoucher) dispatch(getMyVouchers());
            setSaveVoucher('');
            toast.success('Thêm voucher thành công', Toastobjects);
        },
        error: (message) => {
            toast.error(message || 'Thêm voucher thất bại', Toastobjects);
            setSaveVoucher('');
        },
    };
    const handleSaveVoucher = () => {
        setSaveVoucher(voucher);
        dispatch(addVoucher({ code: voucher.code, handleAfterFetch }));
    };

    return (
        <div className="col-12 pl-2 pr-2" style={{ paddingLeft: '4px', paddingRight: '4px' }}>
            <Card className={`${styles.container} col-12`}>
                <ListItem sx={{ pr: 0 }}>
                    <div className={styles.voucherTemplate}>
                        <div className={styles.voucherImageWrapper}>
                            <img src="/images/logo.png" />
                        </div>
                        <div className={styles.cardLeft}>
                            <div className={styles.cardSawToot}></div>
                        </div>
                        <Typography component="div" variant="caption" color="white" sx={{ zIndex: 1, fontSize: 9 }}>
                            FASHIONSHOP
                        </Typography>
                        <div className={styles.cornerBadge}>
                            <Typography component="div" variant="caption" color="white" sx={{ fontSize: 10 }}>
                                Số lượng có hạn
                            </Typography>
                        </div>
                    </div>
                    <ListItemText
                        sx={{ padding: 'var(--space-8)', pr: 1 }}
                        primary={
                            <div className="d-flex justify-content-between align-items-center mb-1">
                                <div>
                                    <Typography
                                        component="div"
                                        variant="body1"
                                        color="text.primary"
                                        sx={{ fontWeight: 600 }}
                                    >
                                        Giảm {discount}
                                    </Typography>
                                    {discountType === '2' ? (
                                        <Typography>
                                            Giảm tối thiểu: {formatMoney(voucher?.maximumDiscount || 0)}
                                        </Typography>
                                    ) : null}
                                </div>
                                {!myVoucher ? (
                                    <LoadingButton loading={saveVoucher} onClick={handleSaveVoucher}>
                                        Lưu
                                    </LoadingButton>
                                ) : (
                                    <Link to="/"></Link>
                                )}
                            </div>
                        }
                        secondary={
                            <Box sx={{ maxWidth: '85%' }}>
                                <Chip variant="outlined" label="Ví momo" size="small" color="error" sx={{ mr: 1 }} />
                                <Chip variant="outlined" label="Tiền mặt" size="small" color="primary" />

                                {effectiveLater ? (
                                    <Typography component="div" variant="caption" color="text.primary" sx={{ mt: 1 }}>
                                        Có hiệu lực từ {startDate.format('HH:MM DD/MM/YYYY')}
                                    </Typography>
                                ) : (
                                    <Fragment>
                                        <LinearProgress variant="determinate" value={percentUsed} sx={{ mt: 1 }} />
                                        <Typography
                                            component="div"
                                            variant="caption"
                                            color="text.primary"
                                            sx={{ mt: 1 }}
                                        >
                                            Đã dùng {percentUsed?.toFixed()}%, hạn sử dụng{' '}
                                            {moment(voucher?.endDate).format('DD/MM/YYYY')}
                                        </Typography>
                                    </Fragment>
                                )}
                            </Box>
                        }
                    />
                </ListItem>
            </Card>
        </div>
    );
}
