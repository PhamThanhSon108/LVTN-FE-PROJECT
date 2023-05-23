import React, { useEffect } from 'react';

import { Link } from 'react-router-dom';

import {
    Avatar,
    Card,
    CardContent,
    CardHeader,
    CircularProgress,
    Divider,
    Tooltip,
    Typography,
    cardContentClasses,
} from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import { ListCategory } from '~/Redux/Actions/categoryActions';
import styles from './Vouchers.module.scss';
import styled from '@emotion/styled';
import Voucher from './components/Voucher/Voucher';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Slider from 'react-slick';
import { getPublicVouchers } from '~/Redux/Actions/voucherAction';

const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    initialSlide: 0,

    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                infinite: true,
                dots: false,
                initialSlide: 0,
            },
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                initialSlide: 0,
            },
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                initialSlide: 0,
            },
        },
    ],
};

const MainSection = ({ children }) => {
    return (
        <Card className={styles.container} sx={{ pl: 0, pr: '8px', pb: '4px' }}>
            <CardHeader
                sx={{ display: 'flex', alignItems: 'center' }}
                title={
                    <div className="d-flex justify-content-between align-content-center align-items-center">
                        <Typography noWrap variant="button" color="primary">
                            KHUYẾN MÃI
                        </Typography>
                        <Link to={'/voucher'} style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                            <Typography color="primary" variant="body1" fontSize="14px">
                                Xem thêm <ArrowForwardIosIcon fontSize="12px" />
                            </Typography>
                        </Link>
                    </div>
                }
            />
            <Divider />
            {children}
        </Card>
    );
};
export default function Vouchers() {
    const dispatch = useDispatch();
    const { vouchers, loading } = useSelector((state) => state.publicVouchers);
    const { success } = useSelector((state) => state.addVoucher);
    useEffect(() => {
        dispatch(getPublicVouchers());
    }, [success]);

    if (loading)
        return (
            <MainSection>
                <div className="col-12 d-flex justify-content-center align-items-center" style={{ height: '128.8px' }}>
                    <CircularProgress />
                </div>
            </MainSection>
        );

    return (
        <MainSection>
            <Slider
                style={{ maxHeight: '170px', overflow: 'hidden', objectFit: 'cover', marginTop: '4px' }}
                {...settings}
            >
                {vouchers?.map((voucher) => {
                    return (
                        <div
                            key={voucher?._id}
                            className="col-6 d-flex justify-content-center"
                            style={{ paddingLeft: '0px' }}
                        >
                            <Voucher voucher={voucher} />
                        </div>
                    );
                })}
            </Slider>
        </MainSection>
    );
}
