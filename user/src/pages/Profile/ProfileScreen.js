import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getShippingAddresses, getUserDetails } from '../../Redux/Actions/userActions';
import Orders from '../../components/profileComponents/Orders';
import moment from 'moment';
import { listMyOrders } from '../../Redux/Actions/orderActions';
import './Profile.scss';
import MyAccount from './components/MyAccount/MyAccount';
import MyOrders from './components/MyOrders/MyOrder';
import useSearchParamsCustom from '~/hooks/useSearchParamCustom';
import VoucherWallet from './components/VoucherWallet/VoucherWallet';
import { Badge, Typography } from '@mui/material';
import TextSnippetOutlinedIcon from '@mui/icons-material/TextSnippetOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import DiscountOutlinedIcon from '@mui/icons-material/DiscountOutlined';
const bar = {
    purchase: { value: 'purchase', component: <MyOrders /> },
    voucher: { value: 'voucher', component: <VoucherWallet /> },
    property: { value: 'property', component: <MyAccount /> },
};

const ProfileScreen = () => {
    window.scrollTo(0, 0);

    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const myOrders = useSelector((state) => state.myOrders);
    const { loading, error, orders } = myOrders;
    const { getParamValue, replaceParams } = useSearchParamsCustom();
    const [currentBar] = useState(getParamValue('bar') || bar.property.value);

    useEffect(() => {
        dispatch(getShippingAddresses());
    }, [dispatch]);

    return (
        <div className="container mt-3">
            <div className="row align-items-start">
                <div className="col-lg-3 wrap-profile-left">
                    <div className="author-card pb-0">
                        <div
                            className="row fix-culum"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <div className="col-md-4" style={{ marginTop: '12px' }}>
                                <img
                                    src="./images/user.png"
                                    alt="userprofileimage"
                                    style={{ height: '100%', width: '100%' }}
                                    className="fix-none"
                                />
                            </div>
                            <div className="col-md-8">
                                <h5 className="author-card-name mb-1">
                                    <Typography variant="h6" fontWeight={600} noWrap>
                                        {userInfo?.name || 'alias'}
                                    </Typography>
                                </h5>

                                <Typography variant="caption" className="author-card-position" noWrap>
                                    Khách hàng
                                </Typography>
                            </div>
                        </div>
                    </div>
                    <div className="wizard pt-3 fix-top wrap-profile-menu" style={{ marginTop: '10px' }}>
                        <div
                            onClick={() => {
                                replaceParams([{ key: 'bar', value: bar.property.value }], 'replaceAll');
                            }}
                            className={`wrap-profile-menu-item ${
                                currentBar === bar.property.value ? 'active-menu' : ''
                            }`}
                        >
                            <PersonOutlineOutlinedIcon sx={{ mr: 0.5, fontSize: '20px' }} />
                            <Typography>Thông tin của tôi</Typography>
                        </div>
                        <div
                            className={`wrap-profile-menu-item ${
                                currentBar === bar.purchase.value ? 'active-menu' : ''
                            }`}
                            onClick={() => {
                                replaceParams([{ key: 'bar', value: bar.purchase.value }], 'replaceAll');
                            }}
                        >
                            <TextSnippetOutlinedIcon sx={{ mr: 0.5, fontSize: '20px' }} />
                            <Typography>Đơn mua</Typography>
                        </div>
                        <div
                            onClick={() => {
                                replaceParams([{ key: 'bar', value: bar.voucher.value }], 'replaceAll');
                            }}
                            className={`wrap-profile-menu-item ${
                                currentBar === bar.voucher.value ? 'active-menu' : ''
                            }`}
                        >
                            <DiscountOutlinedIcon sx={{ mr: 0.5, fontSize: '20px' }} />
                            <Typography>Kho vouchers</Typography>
                        </div>
                    </div>
                </div>

                {/* panels */}
                <div class="tab-content col-lg-9 pb-5 pt-lg-0 pt-3" id="v-pills-tabContent">
                    {bar?.[currentBar]?.component}
                </div>
            </div>
        </div>
    );
};

export default ProfileScreen;
