import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import Loading, { FormLoading } from '../components/LoadingError/Loading';
import Toast from '../components/LoadingError/Toast';
import { Controller, useForm } from 'react-hook-form';

export default function ResetScreen() {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();
    const userLogin = useSelector((state) => state.userLogin);
    const { error, loading, userInfo } = userLogin;
    const onSubmit = (data) => console.log(data);
    return (
        <>
            <Header />
            <Toast />
            <div className="container d-flex flex-column justify-content-center align-items-center login-center">
                <form className="Login col-md-6 col-lg-4 col-10" onSubmit={handleSubmit(onSubmit)}>
                    {loading && <FormLoading />}
                    <h5 style={{ margin: '15px' }}>RESET PASSWORD</h5>
                    <Controller
                        name="emailReset"
                        control={control}
                        render={({ field }) => <input {...field} placeholder="Enter your address" />}
                        rules={{
                            required: true,
                            pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                        }}
                    />
                    {errors.emailReset && (
                        <p className="text-danger">'Wrong or Invalid email address. Please correct and try again'</p>
                    )}
                    <button className="btn btn-outline-danger btn__login" type="submit">
                        Reset password
                    </button>
                    <label></label>
                </form>
            </div>
        </>
    );
}
