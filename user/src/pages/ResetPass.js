import { ErrorMessage } from '@hookform/error-message';
import React, { useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { FormLoading } from '../components/LoadingError/Loading';
import image from '~/assets/images';
import { resetPassWord } from '~/Redux/Actions/userActions';

import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';

export default function ResetPass() {
    const location = useLocation();
    const history = useHistory();
    const searchParams = new URLSearchParams(location.search);
    const resetPasswordToken = searchParams?.get('resetPasswordToken');

    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.resetPassword);

    const {
        watch,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();
    // password.current = watch('password', '');
    const submitResetPassword = async (data) => {
        dispatch(
            resetPassWord(
                resetPasswordToken,
                { ...data, email: data.emailReset, confirmPassword: data.newPassConfirm },
                history,
            ),
        );
    };

    return (
        <div className="container d-flex flex-column justify-content-center align-items-center login-center mt-3">
            <form
                className="Login col-md-6 col-lg-4 col-10 d-flex flex-column align-content-start"
                onSubmit={handleSubmit(submitResetPassword)}
            >
                {loading && <FormLoading />}
                <div className="d-flex align-content-center justify-content-center h-25-lm">
                    <img style={{ width: '40%' }} alt="Fashion shop" src={image.logo}></img>
                </div>

                <Typography variant="h5" className="mb-3 mt-1">
                    Tạo mật khẩu mới
                </Typography>
                <Controller
                    name="emailReset"
                    control={control}
                    defaultValue=""
                    rules={{
                        required: 'Bạn chưa nhập email',
                        pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                    }}
                    render={({ field }) => (
                        <TextField {...field} sx={{ width: '100%', mb: 0.5 }} size="small" label="Email" />
                    )}
                />

                {/* <ErrorMessage errors={errors} name="emailReset" render={({ message }) => <p>{message}</p>} /> */}
                {errors.emailReset && errors.emailReset.type === 'required' && (
                    <p className="text-danger m-0" style={{ textAlign: 'start' }}>
                        {errors.emailReset.message}
                    </p>
                )}
                {errors.emailReset && errors.emailReset.type === 'pattern' ? (
                    <p style={{ textAlign: 'start' }} className="text-danger m-0">
                        Email không hợp lệ
                    </p>
                ) : null}

                <Controller
                    name="newPassword"
                    defaultValue=""
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            sx={{ width: '100%', mt: 1.5, mb: 0.5 }}
                            size="small"
                            label="Mật khẩu mới"
                            inputProps={{ type: 'password' }}
                        />
                    )}
                    rules={{
                        minLength: 6,
                        required: 'Bạn chưa nhập mật khẩu mới',
                    }}
                />
                {errors.newPassword && errors.newPassword.type === 'required' ? (
                    <p style={{ textAlign: 'start' }} className="text-danger m-0">
                        {errors.newPassword.message}
                    </p>
                ) : null}

                {errors.newPassword && errors.newPassword.type === 'minLength' ? (
                    <p style={{ textAlign: 'start' }} className="text-danger m-0">
                        Mật khẩu phải từ 6 - 255 ký tự, ít nhất 1 chữ cái, 1 chữ số và không có khoảng trắng
                    </p>
                ) : null}

                <Controller
                    name="newPassConfirm"
                    defaultValue=""
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            sx={{ width: '100%', mt: 1.5, mb: 0.5 }}
                            size="small"
                            label="Nhập lại Mật khẩu mới"
                            inputProps={{ type: 'password' }}
                        />
                    )}
                    rules={{
                        required: 'Please enter confirm password',
                        // pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                        validate: (value) => value === watch('newPassword'),
                    }}
                />

                {errors.newPassConfirm && errors.newPassConfirm.type === 'validate' ? (
                    <p style={{ textAlign: 'start' }} className="text-danger m-0">
                        Mật khẩu không khớp
                    </p>
                ) : null}

                {errors.newPassConfirm && errors.newPassConfirm.type === 'required' ? (
                    <p style={{ textAlign: 'start' }} className="text-danger m-0">
                        Bạn chưa nhập lại mật khẩu mới
                    </p>
                ) : null}
                <LoadingButton className=" mt-3" variant="contained" type="submit">
                    Lưu
                </LoadingButton>
            </form>
        </div>
    );
}
