import React, { useEffect, useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../Redux/Actions/userActions';
import { listCart } from '../Redux/Actions/cartActions';
import NavBar from './navbar';
import Search from './homeComponents/Search';
import { Button } from '@mui/material';

const Header = () => {
    const [navbar, setNavbar] = useState(false);
    const dispatch = useDispatch();
    let history = useHistory();
    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const { error } = userLogin;
    const [searchValue, setSearchValue] = useState('');
    const [keyword, setKeyword] = useState('');
    const clickIconNavBar = () => {
        setNavbar(true);
    };
    const removeNavBar = () => {
        setNavbar(false);
    };
    const logoutHandler = () => {
        dispatch(logout());
        history.push('/');
    };

    function avatarUser() {
        const stringUser = userInfo.name;
        const value = stringUser.slice(0, 1);
        return value;
    }
    // xư lý lấy 1 phần kí tự từ chuổi username khi trả dữ liệu ra màn hình
    function notiUser() {
        let returnUser;
        const valueUser = userInfo.name;
        if (valueUser.length > 15) {
            const arrayUser = valueUser.split(' ');
            returnUser = arrayUser[0];
        } else {
            returnUser = valueUser;
        }
        return returnUser;
    }

    return (
        <>
            <div
                className="position-fixed"
                style={{ zIndex: '3', height: '100px', width: '100%', backgroundColor: '#fff' }}
            >
                {/* Top Header */}
                <div className="Announcement ">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6 d-flex align-items-center display-none">
                                <p>Hostline: 0123456789</p>
                            </div>
                            <div className=" col-12 col-lg-6 justify-content-center justify-content-lg-end d-flex align-items-center">
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
                        paddingRight: 25,
                    }}
                >
                    <div className="container">
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
                                                            Profile
                                                        </Link>

                                                        <Link className="dropdown-item" to="#" onClick={logoutHandler}>
                                                            Logout
                                                        </Link>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="btn-group">
                                                    <Link
                                                        className="text-info"
                                                        style={{ width: 50, marginRight: 0 }}
                                                        to="/login"
                                                    >
                                                        Login
                                                    </Link>

                                                    <Link className="text-danger" to="/register">
                                                        Register
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
                            <div className="row">
                                <div
                                    className="col-md-3 col-4 d-flex align-items-center "
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
                                <div className="col-md-3 d-flex align-items-center justify-content-end Login-Register">
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
                                                    Profile
                                                </Link>

                                                <Link className="dropdown-item" to="#" onClick={logoutHandler}>
                                                    Logout
                                                </Link>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <Link to="/register">Register</Link>
                                            <Link to="/login">Login</Link>
                                        </>
                                    )}

                                    <Link to={`${userInfo ? '/cart' : '/login'}`}>
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
