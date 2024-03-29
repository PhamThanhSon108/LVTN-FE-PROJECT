import React, { useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { FormControl, FormControlLabel, Radio, RadioGroup, TextField } from '@mui/material';
import styles from './ProfileTab.module.scss';

import { getDistricts, getProvinces, getWards } from '~/Redux/Actions/deliveryAction';
import { getUserDetails, updateUserProfile } from '~/Redux/Actions/userActions';
import { Controller, useForm } from 'react-hook-form';
import { renderError } from '~/utils/errorMessage';
import { inputPropsConstants } from '~/constant/variants';
import { LoadingButton } from '@mui/lab';
import AutorenewOutlinedIcon from '@mui/icons-material/AutorenewOutlined';
import moment from 'moment';
import { regexPhoneNumber } from '~/pages/Register';

const ProfileTab = () => {
    const dispatch = useDispatch();
    const { reset, control, watch, getValues, handleSubmit } = useForm({
        defaultValues: {
            name: '',
            email: '',
            phone: '',
            gender: 'male',
            birthday: '01-11-2001',
        },
    });

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo: user } = userLogin;

    const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
    const { loading: updateLoading } = userUpdateProfile;
    const validateAge = (value) => {
        const currentDate = moment();
        const selectedDate = moment(value);
        const age = currentDate.diff(selectedDate, 'years');
        return age >= 16; // Tuổi phải lớn hơn hoặc bằng 16
    };
    const handleAfterFetch = {
        success: () => {
            dispatch(getUserDetails('profile'));
        },
        error: () => {},
    };
    const submitUpdateProfile = (data) => {
        dispatch(
            updateUserProfile(
                {
                    ...data,
                },
                handleAfterFetch,
            ),
        );
    };

    useEffect(() => {
        if (user) {
            reset({
                ...user,
                address: {
                    province: { ProvinceName: '' },
                    district: { DistrictName: '' },
                    ward: { WardName: '' },
                },
                birthday: moment(user?.birthday).format('YYYY-MM-DD'),
            });
        }
        dispatch(getProvinces());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, user]);

    useEffect(() => {
        if (getValues('address.province')?.ProvinceID) {
            dispatch(getDistricts(watch('address.province').ProvinceID));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, watch('address.province')?.ProvinceID, watch, getValues]);

    useEffect(() => {
        if (getValues('address.district')?.DistrictID) {
            dispatch(getWards(watch('address.district').DistrictID));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, watch('address.district')?.DistrictID]);

    return (
        <div className={`col-lg-12 col-md-12 col-sm-12 `} style={{ display: 'block', paddingTop: '24px' }}>
            <form className="row" onSubmit={handleSubmit(submitUpdateProfile)}>
                <div className="col-md-12">
                    <Controller
                        name="name"
                        control={control}
                        rules={{ required: true }}
                        render={({ field, fieldState }) => (
                            <Fragment>
                                <TextField
                                    sx={{ width: '100%' }}
                                    className={styles.formItem}
                                    focused={!!fieldState.error}
                                    color={fieldState.error ? 'error' : 'info'}
                                    label="Họ tên"
                                    {...field}
                                    variant={inputPropsConstants.variantOutLine}
                                    size={inputPropsConstants.smallSize}
                                />
                                <p className="noti-validate">
                                    {renderError([
                                        {
                                            error: fieldState?.error?.type === 'required',
                                            message: 'Bạn chưa nhập trường này',
                                        },
                                    ])}
                                </p>
                            </Fragment>
                        )}
                    />
                </div>

                <div className={styles.rowWrapper}>
                    <div className={styles.wrapInput}>
                        <Controller
                            name="email"
                            control={control}
                            rules={{ required: true }}
                            render={({ field, fieldState }) => (
                                <Fragment>
                                    <TextField
                                        sx={{ width: '100%' }}
                                        className={styles.formItem}
                                        focused={!!fieldState.error}
                                        color={fieldState.error ? 'error' : 'info'}
                                        label="Email"
                                        {...field}
                                        variant={inputPropsConstants.variantOutLine}
                                        size={inputPropsConstants.smallSize}
                                    />
                                    <p className="noti-validate">
                                        {renderError([
                                            {
                                                error: fieldState?.error?.type === 'required',
                                                message: 'Bạn chưa nhập trường này',
                                            },
                                        ])}
                                    </p>
                                </Fragment>
                            )}
                        />
                    </div>
                    <div className={styles.wrapInput}>
                        <Controller
                            name="phone"
                            control={control}
                            rules={{ required: true, pattern: regexPhoneNumber }}
                            render={({ field, fieldState }) => (
                                <Fragment>
                                    <TextField
                                        sx={{ width: '100%' }}
                                        className={styles.formItem}
                                        focused={!!fieldState.error}
                                        color={fieldState.error ? 'error' : 'info'}
                                        label="Số điện thoại"
                                        {...field}
                                        variant={inputPropsConstants.variantOutLine}
                                        size={inputPropsConstants.smallSize}
                                    />
                                    <p className="noti-validate">
                                        {renderError([
                                            {
                                                error: fieldState?.error?.type === 'required',
                                                message: 'Bạn chưa nhập trường này',
                                            },
                                            {
                                                error: fieldState?.error?.type === 'pattern',
                                                message: 'Số điện thoại không hợp lệ',
                                            },
                                        ])}
                                    </p>
                                </Fragment>
                            )}
                        />
                    </div>
                </div>

                <div className={styles.rowWrapper}>
                    <div className={styles.wrapInput}>
                        <FormControl className="d-flex align-content-center">
                            <Controller
                                name="birthday"
                                control={control}
                                rules={{ required: true, validate: validateAge }}
                                render={({ field, fieldState }) => (
                                    <Fragment>
                                        <TextField
                                            {...field}
                                            focused={!!fieldState.error}
                                            color={fieldState.error ? 'error' : 'info'}
                                            variant={inputPropsConstants.variantOutLine}
                                            size={inputPropsConstants.smallSize}
                                            label="Ngày sinh"
                                            inputProps={{
                                                type: 'date',
                                            }}
                                        />
                                        <p className="noti-validate">
                                            {renderError([
                                                {
                                                    error: fieldState?.error?.type === 'required',
                                                    message: 'Bạn chưa nhập trường này',
                                                },
                                                {
                                                    error: fieldState?.error?.type === 'validate',
                                                    message: 'Bạn phải đủ 16 tuổi',
                                                },
                                            ])}
                                        </p>
                                    </Fragment>
                                )}
                            />
                        </FormControl>
                    </div>
                    <div className={styles.wrapInput}>
                        <Controller
                            name="gender"
                            control={control}
                            render={({ field }) => (
                                <RadioGroup
                                    {...field}
                                    className={styles.applyForProductWrapper}
                                    defaultValue={'male'}
                                    row
                                >
                                    <FormControlLabel
                                        value={'male'}
                                        control={<Radio size={inputPropsConstants.smallSize} />}
                                        label="Nam"
                                    />
                                    <FormControlLabel
                                        value={'female'}
                                        control={<Radio size={inputPropsConstants.smallSize} />}
                                        label="Nữ"
                                    />
                                    <FormControlLabel
                                        value={'other'}
                                        control={<Radio size={inputPropsConstants.smallSize} />}
                                        label="Khác"
                                    />
                                </RadioGroup>
                            )}
                        />
                        <p className="noti-validate"></p>
                    </div>
                </div>

                <div className=" btn-update-profile">
                    <LoadingButton
                        sx={{ width: '100%' }}
                        loading={updateLoading}
                        type="submit"
                        variant={inputPropsConstants.variantContained}
                        size="medium"
                        startIcon={<AutorenewOutlinedIcon />}
                    >
                        Cập nhật thông tin
                    </LoadingButton>
                </div>
            </form>
        </div>
    );
};

export default ProfileTab;
