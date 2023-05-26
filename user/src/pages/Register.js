import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import isEmpty from 'validator/lib/isEmpty';

import { FormLoading } from '../components/LoadingError/Loading';

import { register } from '../Redux/Actions/userActions';
import { Button, TextField, Typography } from '@mui/material';
import { regexPassword } from './Login';
export const regexPhoneNumber = /((09|03|07|08|05)+([0-9]{8})\b)/g;

const Register = () => {
    window.scrollTo(0, 0);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [cfpassword, setCfPassword] = useState('');

    const [checkValidate, setCheckValidate] = useState({}); // tao một usestate mới để check from
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();
    const redirect = location.search ? location.search.split('=')[1] : '/';

    const userRegister = useSelector((state) => state.userRegister);
    const { loading, userInfo } = userRegister;

    useEffect(() => {
        if (userInfo) {
            history.push(redirect);
        }
    }, [userInfo, history, redirect]);

    //xủ lí logic check from
    const validateAll = () => {
        const msg = {};
        let re = /\S+@\S+\.\S+/;
        if (isEmpty(name)) {
            msg.name = 'Bạn chưa nhập tên';
            msg.borderRed1 = 'border-red';
            msg.colorRed1 = 'color-red';
        }
        if (name && name?.length >= 50) {
            msg.name = 'Họ và tên quá dài, vui lòng nhập dưới 50 ký tự';
            msg.borderRed1 = 'border-red';
            msg.colorRed1 = 'color-red';
        }

        if (isEmpty(email)) {
            msg.email = 'Bạn chưa nhập email';
            msg.borderRed2 = 'border-red';
            msg.colorRed2 = 'color-red';
        } else {
            if (!re.test(email)) {
                msg.email = 'Email không hợp lệ';
                msg.borderRed2 = 'border-red';
                msg.colorRed2 = 'color-red';
            }
        }

        if (isEmpty(phone)) {
            msg.phone = 'Bạn chưa nhập số điện thoại';
            msg.borderRed3 = 'border-red';
            msg.colorRed3 = 'color-red';
        } else {
            if (!regexPhoneNumber.test(phone)) {
                msg.phone = 'Số điện thoại không hợp lệ';
                msg.borderRed3 = 'border-red';
                msg.colorRed3 = 'color-red';
            }
        }
        if (isEmpty(password)) {
            msg.password = 'Bạn chưa nhập mật khẩu';
            msg.borderRed4 = 'border-red';
            msg.colorRed4 = 'color-red';
        } else {
            if (!regexPassword.test(password)) {
                msg.password = 'Mật khẩu phải từ 6 - 255 ký tự, ít nhất 1 chữ cái, 1 chữ số và không có khoảng trắng';
                msg.borderRed4 = 'border-red';
                msg.colorRed4 = 'color-red';
            }
        }

        if (isEmpty(cfpassword)) {
            msg.cfpassword = 'Bạn chưa nhập lại mật khẩu';
            msg.borderRed5 = 'border-red';
            msg.colorRed5 = 'color-red';
        } else {
            if (!regexPassword.test(cfpassword)) {
                msg.cfpassword = 'Mật khẩu phải từ 6 - 255 ký tự, ít nhất 1 chữ cái, 1 chữ số và không có khoảng trắng';
                msg.borderRed5 = 'border-red';
                msg.colorRed5 = 'color-red';
            } else {
                if (cfpassword !== password) {
                    msg.cfpassword = 'Mật khẩu không khớp';
                    msg.borderRed5 = 'border-red';
                    msg.colorRed5 = 'color-red';
                }
            }
        }
        setCheckValidate(msg);
        if (Object.keys(msg).length > 0) return false;
        return true;
    };

    const submitHandler = (e) => {
        e.preventDefault();
        const isValid = validateAll();
        if (!isValid) return;
        dispatch(register(history, name, email.toLowerCase().trim(), phone, password));
    };

    return (
        <div className="mt-3 container d-flex flex-column justify-content-center align-items-center login-center">
            {/* {error && <Message variant="alert-danger">{error}</Message>} */}
            <form className="Login col-md-6 col-lg-4 col-10" onSubmit={submitHandler}>
                {loading && <FormLoading />}
                <div className="Login-from">
                    <TextField
                        sx={{ width: '100%', mt: 2 }}
                        size="small"
                        label="Họ & Tên"
                        value={name}
                        onClick={() => {
                            setCheckValidate((object) => {
                                const x = { ...object };
                                x.borderRed1 = ' ';
                                x.colorRed1 = ' ';
                                x.name = ' ';
                                return x;
                            });
                        }}
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                    />
                    <Typography noWrap variant="body2" color="red" sx={{ mt: 1, mb: 0, textAlign: 'start' }}>
                        {checkValidate.name || ''}
                    </Typography>
                </div>

                <div className="Login-from">
                    <TextField
                        sx={{ width: '100%', mt: 2 }}
                        size="small"
                        label="Email"
                        value={email}
                        onClick={() => {
                            setCheckValidate((object) => {
                                const x = { ...object };
                                x.borderRed2 = ' ';
                                x.colorRed2 = ' ';
                                x.email = ' ';
                                return x;
                            });
                        }}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                        inputProps={{ type: 'email' }}
                    />
                    <Typography noWrap variant="body2" color="red" sx={{ mt: 1, mb: 0, textAlign: 'start' }}>
                        {checkValidate.email || ''}
                    </Typography>
                </div>

                <div className="Login-from">
                    <TextField
                        sx={{ width: '100%', mt: 2 }}
                        size="small"
                        label="Số điện thoại"
                        value={phone}
                        onClick={() => {
                            setCheckValidate((object) => {
                                const x = { ...object };
                                x.borderRed3 = ' ';
                                x.colorRed3 = ' ';
                                x.phone = ' ';
                                return x;
                            });
                        }}
                        onChange={(e) => {
                            setPhone(e.target.value);
                        }}
                    />
                    <Typography variant="body2" color="red" sx={{ mt: 1, mb: 0, textAlign: 'start' }}>
                        {checkValidate.phone || ''}
                    </Typography>
                </div>

                <div className="Login-from">
                    <TextField
                        sx={{ width: '100%', mt: 2 }}
                        size="small"
                        label="Mật khẩu"
                        value={password}
                        onClick={() => {
                            setCheckValidate((object) => {
                                const x = { ...object };
                                x.borderRed4 = ' ';
                                x.colorRed4 = ' ';
                                x.password = ' ';
                                return x;
                            });
                        }}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                        inputProps={{ type: 'password' }}
                    />
                    <Typography variant="body2" color="red" sx={{ mt: 1, mb: 0, textAlign: 'start' }}>
                        {checkValidate.password || ''}
                    </Typography>
                </div>

                <div className="Login-from">
                    <TextField
                        sx={{ width: '100%', mt: 2 }}
                        size="small"
                        label="Nhập lại mật khẩu"
                        value={cfpassword}
                        onClick={() => {
                            setCheckValidate((object) => {
                                const x = { ...object };
                                x.borderRed5 = ' ';
                                x.colorRed5 = ' ';
                                x.cfpassword = ' ';
                                return x;
                            });
                        }}
                        onChange={(e) => {
                            setCfPassword(e.target.value);
                        }}
                        inputProps={{ type: 'password' }}
                    />
                    <Typography variant="body2" color="red" sx={{ mt: 1, mb: 2, textAlign: 'start' }}>
                        {checkValidate.cfpassword || ''}
                    </Typography>
                </div>

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    sx={{ width: '100%', mt: 1, mb: 2 }}
                >
                    ĐĂNG KÝ
                </Button>
                <p>
                    <Link
                        to={redirect ? `/login?redirect=${redirect}` : '/login'}
                        className="d-flex justify-content-center"
                    >
                        <Typography color="primary.text" sx={{ marginRight: 1 }}>
                            Bạn đã có tài khoản?
                        </Typography>
                        <Typography color="primary" className="ml-2">
                            Đăng nhập
                        </Typography>
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default Register;
