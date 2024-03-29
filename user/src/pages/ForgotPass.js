import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import image from '~/assets/images/index.js';
import { forGotPassWord } from '~/Redux/Actions/userActions';
import { Button, TextField, Typography } from '@mui/material';
import { FormLoading } from '~/components/LoadingError/Loading';
import { Toastobjects } from '~/components/LoadingError/Toast';
import { toast } from 'react-toastify';

export default function ForgotPass() {
    const dispatch = useDispatch();
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();

    const [successSendMail, setSuccessSendMail] = useState(false);
    const forgotPassword = useSelector((state) => state.forgotPassword);
    const { loading: loadingForgot, success: successForgot } = forgotPassword;
    const handleAfterFetch = {
        success: () => {
            setSuccessSendMail(true);
            toast.success('Email xác thực đã được gửi, hãy kiểm tra tin nhắn của bạn', Toastobjects);
        },
    };
    const onSubmit = (data) => {
        dispatch(forGotPassWord(data, handleAfterFetch));
    };
    return (
        <div className="mt-3 container d-flex flex-column justify-content-center align-items-center login-center">
            <form className="Login col-md-6 col-lg-4 col-10" onSubmit={handleSubmit(onSubmit)}>
                {loadingForgot && <FormLoading />}

                <div
                    style={{
                        height: '40px',
                    }}
                >
                    <img
                        alt="Logo"
                        src={image.logo}
                        style={{
                            height: '100%',
                        }}
                    />
                </div>

                <Typography variant="h6" color="caption" sx={{ mt: 2 }}>
                    QUÊN MẬT KHẨU
                </Typography>

                <div
                    style={{
                        padding: '10px 10px 10px 10px',
                    }}
                >
                    <Typography variant="caption" color="caption">
                        Để lấy lại mật khẩu bạn vui lòng điền email, nhấn nút bên dưới. Hệ thống sẽ gửi thông tin để đặt
                        lại mật khẩu mới vào email của bạn
                    </Typography>
                    <span></span>
                </div>
                <Controller
                    name="emailReset"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            disabled={successSendMail}
                            {...field}
                            sx={{ width: '100%' }}
                            size="small"
                            label="Email"
                        />
                    )}
                    rules={{
                        required: true,
                        pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                    }}
                />
                {errors.emailReset && (
                    <Typography variant="caption" color="red">
                        Email không hợp lệ
                    </Typography>
                )}
                {successSendMail ? (
                    <Typography variant="caption" color="green">
                        Email xác nhận đã được gửi bạn vui lòng kiểm tra tin nhắn của bạn
                    </Typography>
                ) : (
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="large"
                        sx={{ width: '100%', mt: 2 }}
                    >
                        LẤY LẠI MẬT KHẨU
                    </Button>
                )}
            </form>
        </div>
    );
}
