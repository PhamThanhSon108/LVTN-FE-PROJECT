import {
    Box,
    Button,
    Card,
    Chip,
    Divider,
    LinearProgress,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography,
} from '@mui/material';
import React, { Fragment } from 'react';
import styles from './Voucher.module.scss';
export default function Voucher({ voucher }) {
    return (
        <Card className={styles.container}>
            <ListItem
                secondaryAction={
                    <div className={styles.actionWrapper}>
                        <div className={styles.modifyAction}>
                            <input name="address" type="radio" id={voucher?._id} defaultChecked={voucher?.isDefault} />
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
                    sx={{ padding: 'var(--space-8)' }}
                    primary={
                        <Typography
                            component="div"
                            variant="body1"
                            color="text.primary"
                            sx={{ fontWeight: 600, mb: 1 }}
                        >
                            Giảm 230
                        </Typography>
                    }
                    secondary={
                        <Box>
                            <Chip variant="outlined" label="Ví momo" size="small" color="error" sx={{ mr: 1 }} />
                            <Chip variant="outlined" label="Tiền mặt" size="small" color="primary" />

                            <LinearProgress variant="determinate" value={50} sx={{ mt: 1 }} />
                            <Typography component="div" variant="caption" color="text.primary" sx={{ mt: 1 }}>
                                Đã dùng 50%, hạn sử dụng 30/04/2025
                            </Typography>
                        </Box>
                    }
                />
            </ListItem>
        </Card>
    );
}
