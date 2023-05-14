import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import isEmpty from 'validator/lib/isEmpty';
import Toast from '../components/LoadingError/Toast';

import { login } from '../Redux/Actions/userActions';
import { FormLoading } from '~/components/LoadingError/Loading';
import { Button, Divider, TextField, Typography } from '@mui/material';

const Login = () => {
    window.scrollTo(0, 0);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginCheck, setLoginCheck] = useState('');

    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();
    const redirect = location.search ? location.search.split('=')[1] : '/';

    const userLogin = useSelector((state) => state.userLogin);
    const { error, loading, userInfo } = userLogin;

    useEffect(() => {
        if (userInfo) {
            history.push(redirect);
        }
    }, [userInfo, history, redirect]);
    const funtionCheck = () => {
        const msg = {};
        let re = /\S+@\S+\.\S+/;
        if (isEmpty(email)) {
            msg.email = 'Bạn chưa nhập email';
            msg.borderRed1 = 'border-red';
            msg.colorRed1 = 'color-red';
        } else {
            if (!re.test(email)) {
                msg.email = 'Định dạng email không hợp lệ';
                msg.borderRed1 = 'border-red';
                msg.colorRed1 = 'color-red';
            }
        }
        if (isEmpty(password)) {
            msg.password = 'Bạn chưa nhập mật khẩu';
            msg.borderRed2 = 'border-red';
            msg.colorRed2 = 'color-red';
        } else {
            if (password.length < 6) {
                msg.password = 'Mật khẩu phải từ 6 - 255 ký tự, ít nhất 1 chữ cái, 1 chữ số và không có khoảng trắng';
                msg.borderRed2 = 'border-red';
                msg.colorRed2 = 'color-red';
            }
        }
        setLoginCheck(msg);
        if (Object.keys(msg).length > 0) return false;
        return true;
    };

    const submitHandler = (e) => {
        e.preventDefault();
        const isEmptyLogin = funtionCheck();
        if (!isEmptyLogin) return;
        dispatch(login(email?.toLowerCase()?.trim(), password));
    };

    return (
        <div className="mt-3 container d-flex flex-column justify-content-center align-items-center login-center">
            {/* {error && <Message variant="alert-danger">{error}</Message>} */}
            <form className="Login col-md-6 col-lg-4 col-10" onSubmit={submitHandler}>
                {loading && <FormLoading />}
                <TextField
                    sx={{ width: '100%', mt: 2 }}
                    size="small"
                    label="Tài khoản"
                    value={email}
                    onClick={() => {
                        setLoginCheck((object) => {
                            const x = { ...object };
                            x.borderRed1 = ' ';
                            x.colorRed1 = ' ';
                            x.email = ' ';
                            return x;
                        });
                    }}
                    onChange={(e) => setEmail(e.target.value)}
                    inputProps={{ type: 'email' }}
                />
                <Typography noWrap variant="body2" color="red" sx={{ mt: 1, mb: 2, textAlign: 'start' }}>
                    {loginCheck.email || ''}
                </Typography>

                <TextField
                    sx={{ width: '100%' }}
                    size="small"
                    label="Mật khẩu"
                    value={password}
                    onClick={() => {
                        setLoginCheck((object) => {
                            const x = { ...object };
                            x.borderRed2 = ' ';
                            x.colorRed2 = ' ';
                            x.password = ' ';
                            return x;
                        });
                    }}
                    inputProps={{ type: 'password' }}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Mật khẩu"
                />
                <Typography noWrap variant="body2" color="red" sx={{ mt: 1, mb: 1, textAlign: 'start' }}>
                    {loginCheck.password || ''}
                </Typography>

                <Button type="submit" variant="contained" color="primary" size="large" sx={{ width: '100%', mt: 1 }}>
                    ĐĂNG NHẬP
                </Button>
                <p className="d-flex justify-content-end btn__fogot-pass">
                    <Link to={'/forgotpassword'}>
                        <Typography noWrap variant="body2" color="red" sx={{ mt: 1, mb: 2 }}>
                            Quên mật khẩu
                        </Typography>
                    </Link>
                </p>
                <Divider sx={{ mt: 1, mb: 2 }}>
                    <Typography noWrap variant="body2" color="text.secondary">
                        Bạn lần đầu tới Fashionshop?
                    </Typography>
                </Divider>
                <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                    <Button variant="outlined" size="medium">
                        Tạo tài khoản
                    </Button>
                </Link>
            </form>
        </div>
    );
};

export default Login;
