import { Box, Card, Chip, IconButton, LinearProgress, ListItem, ListItemText, Typography } from '@mui/material';
import React, { Fragment } from 'react';
import styles from './Voucher.module.scss';
import moment from 'moment';
import { formatMoney } from '~/utils/formatMoney';
import DeleteIcon from '@mui/icons-material/Delete';
import { LoadingButton } from '@mui/lab';

export default function Voucher({ voucherToApply, voucher, handleApplyVoucher, canRemove = false }) {
    const percentUsed = (voucher?.used * 100) / voucher?.usageLimit;
    const discountType = voucher?.discountType;
    const discount = discountType === 'money' ? formatMoney(voucher?.discount) : `${voucher?.discount} %`;

    return (
        <Card className={styles.container}>
            <ListItem
                secondaryAction={
                    <div className={styles.actionWrapper}>
                        <div className={styles.modifyAction}>
                            <LoadingButton>Lưu</LoadingButton>
                        </div>
                    </div>
                }
            >
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
                    sx={{ padding: 'var(--space-8)', pr: 4 }}
                    primary={
                        <Typography
                            component="div"
                            variant="body1"
                            color="text.primary"
                            sx={{ fontWeight: 600, mb: 1 }}
                        >
                            Giảm {discount}
                        </Typography>
                    }
                    secondary={
                        <Box>
                            <Chip variant="outlined" label="Ví momo" size="small" color="error" sx={{ mr: 1 }} />
                            <Chip variant="outlined" label="Tiền mặt" size="small" color="primary" />

                            <LinearProgress variant="determinate" value={percentUsed} sx={{ mt: 1 }} />
                            <Typography component="div" variant="caption" color="text.primary" sx={{ mt: 1 }}>
                                Đã dùng {percentUsed}%, hạn sử dụng {moment(voucher?.endDate).format('MM/DD/YYYY')}
                            </Typography>
                        </Box>
                    }
                />
            </ListItem>
        </Card>
    );
}
