import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails, logout } from '../Redux/Actions/userActions';
import Search from './homeComponents/Search';
import { listCart } from '~/Redux/Actions/cartActions';
import { Typography } from '@mui/material';

const Header = () => {
    const dispatch = useDispatch();
    let history = useHistory();
    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if (localStorage.getItem('userInfo') && !userInfo?._id) {
            dispatch(getUserDetails('profile'));
        }

        if (userInfo && (!cartItems || cartItems?.length === 0)) {
            dispatch(listCart());
        }
    }, []);

    const [searchValue, setSearchValue] = useState('');
    const [keyword, setKeyword] = useState('');
    const logoutHandler = () => {
        dispatch(logout());
        history.push('/');
    };

    function avatarUser() {
        const stringUser = userInfo.name;
        const value = stringUser?.slice(0, 1);
        return value;
    }
    // xư lý lấy 1 phần kí tự từ chuổi username khi trả dữ liệu ra màn hình
    function notiUser() {
        let returnUser;
        const valueUser = userInfo.name;
        if (valueUser?.length > 15) {
            const arrayUser = valueUser?.split(' ');
            returnUser = arrayUser?.[0];
        } else {
            returnUser = valueUser;
        }
        return returnUser;
    }

    return (
        <>
            <div
                className="position-fixed"
                style={{
                    zIndex: '3',
                    height: '100px',
                    width: '100%',
                    backgroundColor: 'blue',
                }}
            >
                {/* Top Header */}
                <div className="Announcement ">
                    <div className="container">
                        <div className="row">
                            <div className="wrap-hotline-in-header col-md-6 d-flex align-items-center display-none">
                                <p>Hostline: 0123456789</p>
                            </div>
                            <div className="wrap-media-icon col-12 col-lg-6 justify-content-center justify-content-lg-end d-flex align-items-center">
                                <Link to="">
                                    <i className="fab fa-facebook-f"></i>
                                </Link>
                                <Link to="">
                                    <i className="fab fa-instagram"></i>
                                </Link>
                                <Link to="">
                                    <i className="fab fa-linkedin-in"></i>
                                </Link>
                                <Link to="">
                                    <i className="fab fa-youtube"></i>
                                </Link>
                                <Link to="">
                                    <i className="fab fa-pinterest-p"></i>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Header */}
                <div
                    className="header bg-white"
                    style={{
                        zIndex: '3',
                        height: '90px',
                        width: '100%',
                        backgroundColor: '#fff',
                    }}
                >
                    <div className="container  wrap-header-section">
                        {/* MOBILE HEADER */}
                        <div>
                            <div className="mobile-header" style={{ paddingTop: 15 }}>
                                <div className="container ">
                                    <div className="row ">
                                        <div className="col-6 d-flex align-items-center">
                                            {/* <div className="moblie-menu" onClick={clickIconNavBar}>
                                                <i class="fas fa-bars"></i>
                                            </div> */}
                                            <Link className="navbar-brand" to="/">
                                                <img alt="logo" src="/images/logo.png" />
                                            </Link>
                                        </div>
                                        {/* {navbar && <NavBar onRemove={removeNavBar}></NavBar>} */}
                                        <div className="col-6 d-flex align-items-center justify-content-end Login-Register">
                                            {userInfo ? (
                                                <div className="btn-group">
                                                    <button
                                                        type="button"
                                                        className="name-button dropdown-toggle"
                                                        data-toggle="dropdown"
                                                        aria-haspopup="true"
                                                        aria-expanded="false"
                                                    >
                                                        <i class="fas fa-user"></i>
                                                    </button>
                                                    <div className="dropdown-menu">
                                                        <Link className="dropdown-item" to="/profile">
                                                            Hồ sơ
                                                        </Link>

                                                        <Link className="dropdown-item" to="#" onClick={logoutHandler}>
                                                            Đăng xuất
                                                        </Link>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="btn-group">
                                                    <Link
                                                        className="text-info"
                                                        style={{ width: 80, marginRight: 0 }}
                                                        to="/login"
                                                    >
                                                        Đăng nhập
                                                    </Link>

                                                    <Link className="text-danger" to="/register">
                                                        Đăng ký
                                                    </Link>
                                                </div>
                                            )}

                                            <Link to="/cart" className="cart-mobile-icon">
                                                <i className="fas fa-shopping-bag"></i>
                                                <span className="badge">{cartItems ? cartItems.length : 0}</span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* PC HEADER */}
                        <div className="pc-header">
                            <div className="row ">
                                <div
                                    className="col-md-3 col-4 d-flex align-items-center"
                                    onClick={() => {
                                        // refSearch.current.reset();
                                        setSearchValue('');
                                        setKeyword('');
                                    }}
                                >
                                    <Link className="navbar-brand" to="/">
                                        <img alt="logo" src="/images/logo.png" />
                                    </Link>
                                </div>
                                <div
                                    className="col-md-6 col-8 header-nav__search"
                                    style={{ display: 'flex', alignItems: 'center' }}
                                >
                                    <form className="input-group col-12">
                                        <Search
                                            value={{ searchValue, setSearchValue }}
                                            keyword={{ keyword, setKeyword }}
                                        />
                                    </form>
                                    {/* <NavBar></NavBar> */}
                                </div>
                                <div className="wrap-profile-cart-icon col-md-3 d-flex align-items-center justify-content-end Login-Register">
                                    {userInfo ? (
                                        <div className="btn-group">
                                            <button
                                                type="button"
                                                className="name-button dropdown-toggle name-button__user"
                                                data-toggle="dropdown"
                                                aria-haspopup="true"
                                                aria-expanded="false"
                                            >
                                                <div className="name-button__div">
                                                    <span className="name-button__span">{avatarUser()}</span>
                                                </div>
                                                <span className="name-button__p">{notiUser()}</span>
                                                {/* {userInfo.name} */}
                                            </button>
                                            <div className="dropdown-menu">
                                                <Link className="dropdown-item" to="/profile">
                                                    <Typography>Thông tin</Typography>
                                                </Link>

                                                <Link className="dropdown-item" to="#" onClick={logoutHandler}>
                                                    <Typography>Đăng xuất</Typography>
                                                </Link>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <Link to="/register">
                                                <Typography noWrap variant="body2" color="InfoText">
                                                    Đăng ký
                                                </Typography>
                                            </Link>
                                            <Link to="/login">
                                                <Typography noWrap variant="body2" color="primary">
                                                    Đăng nhập
                                                </Typography>
                                            </Link>
                                        </>
                                    )}

                                    <Link to={`${userInfo ? '/cart' : '/login'}`} className="cart-icon-wrap">
                                        <i className="fas fa-shopping-bag"></i>
                                        <span className="badge">{cartItems ? cartItems?.length : 0}</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ zIndex: '3', height: '138px', width: '100%', backgroundColor: '#fff' }}></div>
        </>
    );
};

export default Header;
