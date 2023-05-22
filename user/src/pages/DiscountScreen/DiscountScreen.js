import React, { useEffect } from 'react';
import styles from './DiscountScreen.module.scss';
import { Card, Chip, CircularProgress, Divider, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getPublicVouchers } from '~/Redux/Actions/voucherAction';
import Voucher from '../HomeScreen/components/Vouchers/components/Voucher/Voucher';
export default function DiscountScreen() {
    const dispatch = useDispatch();
    const { vouchers, loading } = useSelector((state) => state.publicVouchers);
    useEffect(() => {
        dispatch(getPublicVouchers());
    }, []);
    if (loading) {
        return (
            <div className={styles.container}>
                <div
                    className={styles.wrapper}
                    style={{
                        height: 'calc(100vh - 150px)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <CircularProgress />
                </div>
            </div>
        );
    }
    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.banner}>
                    <img
                        src="https://down-vn.img.susercontent.com/file/vn-50009109-7653ff905030364f99053d9198933a9f"
                        alt="Khuyến mãi"
                    />
                </div>
                <Card sx={{ fontWeight: '600', mt: 3, p: 1, ml: 0, pr: 2 }}>
                    <Typography variant="body1" color="primary" sx={{ fontWeight: '450', width: '100%', pl: 1, mb: 1 }}>
                        Số lượng voucher có hạn, hãy nhanh tay mua hàng
                    </Typography>

                    <div className="d-flex col-12">
                        {vouchers?.[0] ? (
                            <div className="col-lg-6 col-12 col-sm-12">
                                <Voucher voucher={vouchers?.[0]} />
                            </div>
                        ) : null}
                        {vouchers?.[1] ? (
                            <div className="col-lg-6 col-12 col-sm-12">
                                <Voucher voucher={vouchers?.[0]} />
                            </div>
                        ) : null}
                    </div>
                </Card>
                <div className={styles.banner + ' mt-3'}>
                    <img
                        src="https://down-vn.img.susercontent.com/file/vn-50009109-b4e9bb71d9aa50c22ebd7cea80b7f4e3"
                        alt="Khuyến mãi"
                    />
                </div>
                <Card sx={{ mt: 3, p: 2 }}>
                    <Typography variant="body1" color="primary" sx={{ fontWeight: '600' }}>
                        Nhớ code ngay deal liền tay
                    </Typography>
                    <div className="d-flex col-12 flex-wrap mt-2">
                        {vouchers?.map((voucher) => (
                            <div className={styles?.code}>
                                <Chip size="medium" variant="filled" color="primary" label={voucher?.code} />
                            </div>
                        ))}
                    </div>
                </Card>
                <div className={styles.banner + ' mt-3'}>
                    <img
                        src="https://down-vn.img.susercontent.com/file/vn-50009109-631a25baf53af1ef399adea2916282b5"
                        alt="Khuyến mãi"
                    />
                </div>
                {vouchers?.length > 0 ? (
                    <div className="d-flex col-12 flex-wrap mt-3">
                        {vouchers?.map((voucher) => (
                            <div className="col-lg-6 col-sm-12 col-12 d-flex flex-column mb-2">
                                <Voucher voucher={voucher} />
                            </div>
                        ))}
                    </div>
                ) : null}
            </div>
        </div>
    );
}
