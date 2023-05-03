import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/Header';

import { getUserDetails } from '../../Redux/Actions/userActions';
import Orders from '../../components/profileComponents/Orders';
import moment from 'moment';
import { listMyOrders } from '../../Redux/Actions/orderActions';
import './Profile.scss';
import MyAccount from './components/MyAccount/MyAccount';

const ProfileScreen = () => {
    window.scrollTo(0, 0);

    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const orderListMy = useSelector((state) => state.orderListMy);
    const { loading, error, orders } = orderListMy;
    const [buleanProfile, setBuleanProfile] = useState(true);
    const [pageNumber, setPageNumber] = useState(1);

    useEffect(() => {
        dispatch(getUserDetails('profile'));
    }, [dispatch]);

    useEffect(() => {
        dispatch(listMyOrders({ pageNumber }));
    }, [pageNumber]);

    return (
        <>
            <Header />
            <div className="container mt-lg-5 mt-3">
                <div className="row align-items-start">
                    <div className="col-lg-4 wrap-profile-left">
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
                                        style={{ height: '100px', width: '100px' }}
                                        className="fix-none"
                                    />
                                </div>
                                <div className="col-md-8">
                                    <h5 className="author-card-name mb-2">
                                        <strong>{userInfo?.name || 'alias'}</strong>
                                    </h5>
                                    <span className="author-card-position">
                                        <>Joined {moment(userInfo?.createdAt).format('LL')}</>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="wizard pt-3 fix-top wrap-profile-menu" style={{ marginTop: '10px' }}>
                            <div
                                onClick={() => {
                                    setBuleanProfile(true);
                                }}
                                className={`wrap-profile-menu-item ${buleanProfile ? 'active-menu' : ''}`}
                            >
                                <span>Thông tin của tôi</span>
                            </div>
                            <div
                                className={`wrap-profile-menu-item ${!buleanProfile ? 'active-menu' : ''}`}
                                onClick={() => {
                                    setBuleanProfile(false);
                                }}
                            >
                                <span>Đơn mua</span>
                                <div className="number-my-order d-flex justify-content-center align-item-center">
                                    <span>{orders?.length || 0}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* panels */}
                    <div class="tab-content col-lg-8 pb-5 pt-lg-0 pt-3" id="v-pills-tabContent">
                        {buleanProfile ? (
                            <MyAccount />
                        ) : (
                            <Orders
                                orders={orders}
                                loading={loading}
                                error={error}
                                setPageNumber={(value) => setPageNumber(value)}
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProfileScreen;
