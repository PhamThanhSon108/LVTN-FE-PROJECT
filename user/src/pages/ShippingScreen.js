import React, { useState, useEffect, useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import { saveShippingAddress } from '../Redux/Actions/cartActions';
import { getUserDetails, updateUserProfile } from '../Redux/Actions/userActions';
import { LoadingButton } from '@mui/lab';
import { LinearProgress } from '@mui/material';

const ShippingScreen = ({ history }) => {
    window.scrollTo(0, 0);
    const dispatch = useDispatch();

    const userDetails = useSelector((state) => state.userDetails);
    const { user, success: successUserDetails } = userDetails;
    const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
    const { success: updatesuccess, loading: updateLoading, error: errorUpdate } = userUpdateProfile;
    const { handleSubmit, control, setValue, reset } = useForm({
        defaultValues: { phone: '', address: '', country: '', city: '' },
    });

    const [loading, setLoading] = useState();
    const [loadingFetchUserShipping, setLoadingFetchUserShipping] = useState();
    useEffect(() => {
        setLoadingFetchUserShipping(true);
        dispatch(getUserDetails('profile', setLoadingFetchUserShipping));
    }, []);

    useEffect(() => {
        if (!user) dispatch(getUserDetails('profile'));
        reset({ phone: user?.phone, address: user?.address, country: user?.country, city: user?.city });
    }, [user, successUserDetails, dispatch]);

    const submitHandler = async (data) => {
        setLoading(true);
        dispatch(updateUserProfile(data, history, setLoading));
        dispatch(saveShippingAddress(data));
    };

    return (
        <>
            <Header />
            <div className="container d-flex justify-content-center align-items-center login-center">
                <form className="Login col-md-8 col-lg-4 col-11" onSubmit={handleSubmit(submitHandler)}>
                    {loadingFetchUserShipping ? <LinearProgress style={{ marginBottom: 15 }} /> : null}
                    <h6>DELIVERY ADDRESS</h6>
                    <Controller
                        control={control}
                        name="phone"
                        rules={{ required: 'The field is required', pattern: /^[0-9-+]{9,15}$/ }}
                        render={({
                            field: { onChange, value, ref },
                            fieldState: { invalid, isTouched, isDirty, error },
                        }) => (
                            <>
                                <input
                                    disabled={loadingFetchUserShipping}
                                    cl
                                    type="text"
                                    placeholder="Enter phone number"
                                    value={value}
                                    aria-invalid={error ? 'true' : 'false'}
                                    onChange={(e) => onChange(e.target.value)}
                                    className={error && 'border-red'}
                                />
                                {error?.type === 'required' && <span className="text-danger">{error.message}</span>}
                                {error?.type === 'pattern' && <span className="text-danger">Invalid phone number</span>}
                            </>
                        )}
                    />
                    <Controller
                        control={control}
                        name="address"
                        rules={{ required: 'The field is required' }}
                        render={({
                            field: { onChange, onBlur, value, name, ref },
                            fieldState: { invalid, isTouched, isDirty, error },
                        }) => (
                            <>
                                <input
                                    disabled={loadingFetchUserShipping}
                                    type="text"
                                    placeholder="Enter address"
                                    value={value}
                                    className={error && 'border-red'}
                                    onChange={(e) => onChange(e.target.value)}
                                />
                                {error && <span className="text-danger">{error.message}</span>}
                            </>
                        )}
                    />
                    <Controller
                        control={control}
                        name="city"
                        rules={{ required: 'The field is required' }}
                        render={({
                            field: { onChange, onBlur, value, name, ref },
                            fieldState: { invalid, isTouched, isDirty, error },
                        }) => (
                            <>
                                <input
                                    disabled={loadingFetchUserShipping}
                                    type="text"
                                    placeholder="Enter city"
                                    value={value}
                                    required
                                    className={error && 'border-red'}
                                    onChange={(e) => onChange(e.target.value)}
                                />
                                {error && <span className="text-danger">{error.message}</span>}
                            </>
                        )}
                    />
                    <Controller
                        control={control}
                        name="country"
                        rules={{
                            required: 'The field is required',
                        }}
                        render={({
                            field: { onChange, onBlur, value, name, ref },
                            fieldState: { invalid, isTouched, isDirty, error },
                        }) => (
                            <>
                                <input
                                    disabled={loadingFetchUserShipping}
                                    type="text"
                                    placeholder="Enter country"
                                    value={value}
                                    required
                                    className={error && 'border-red'}
                                    onChange={(e) => onChange(e.target.value)}
                                />
                                {error && <span className="text-danger">{error.message}</span>}
                            </>
                        )}
                    />

                    <LoadingButton
                        size="small"
                        loading={loading}
                        loadingPosition="start"
                        variant="contained"
                        type="submit"
                    >
                        Continue
                    </LoadingButton>
                </form>
            </div>
        </>
    );
};

export default ShippingScreen;
