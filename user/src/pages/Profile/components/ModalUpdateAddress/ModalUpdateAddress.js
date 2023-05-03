import {
    Autocomplete,
    Button,
    Card,
    CardHeader,
    Checkbox,
    Divider,
    FormControlLabel,
    IconButton,
    Modal,
    TextField,
    Tooltip,
    Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Fragment, useEffect } from 'react';
import { updateUserProfile } from '~/Redux/Actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import { getDistricts, getProvinces, getWards } from '~/Redux/Actions/deliveryAction';
import styles from './ModalUpdateAddress.module.scss';
import { renderError } from '~/utils/errorMessage';
import { inputPropsConstants } from '~/constant/variants';
import { LoadingButton } from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 650,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 1,
};
export default function ModalUpdateAddress({
    isOpenModal,
    handleOpenModal,
    currentParentCategory,
    variant = 'update',
}) {
    const handleClose = () => {
        handleOpenModal(false);
    };
    const dispatch = useDispatch();
    const { setValue, reset, control, watch, getValues, handleSubmit } = useForm({
        defaultValues: {
            address: {
                district: '',
                ward: '',
                province: '',
                specificAddress: '',
            },
        },
    });

    const {
        address: { provinces = [], districts = [], wards = [] },
        loadingDistricts,
        loadingProvinces,
        loadingWards,
    } = useSelector((state) => state.address);

    const userDetails = useSelector((state) => state.userDetails);
    const { user } = userDetails;

    const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
    const { loading: updateLoading } = userUpdateProfile;
    const submitUpdateProfile = (data) => {
        dispatch(
            updateUserProfile({
                ...data,
            }),
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
            });
        }
        dispatch(getProvinces());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, user]);

    useEffect(() => {
        if (getValues('address.province')?.ProvinceID) {
            dispatch(getDistricts(getValues('address.province').ProvinceID));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, watch('address.province')?.ProvinceID, watch, getValues]);

    useEffect(() => {
        if (getValues('address.district')?.DistrictID) {
            dispatch(getWards(getValues('address.district').DistrictID));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, watch('address.district')?.DistrictID]);

    return (
        <Modal open={isOpenModal} onClose={handleClose}>
            <Card sx={style}>
                <CardHeader
                    title={
                        <Typography variant="h6" fontSize="xl">
                            <Typography noWrap={true} variant="h6" gutterBottom>
                                {variant === 'add' ? 'Thêm mới địa chỉ' : 'Cập nhật địa chỉ'}
                            </Typography>
                        </Typography>
                    }
                    action={
                        <IconButton onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                    }
                />
                <Divider />
                <div className={styles.modalBody}>
                    <form className="row" onSubmit={handleSubmit(submitUpdateProfile)}>
                        <div
                            className="col-md-12 d-flex align-content-between justify-content-lg-between form-update-profile-item"
                            style={{ width: '100%' }}
                        >
                            <div className={styles.wrapCol3}>
                                <Controller
                                    name="address.province"
                                    control={control}
                                    rules={{
                                        required: true,
                                        validate: (value) => {
                                            return !!value.ProvinceName;
                                        },
                                    }}
                                    render={({ field, fieldState }) => (
                                        <Autocomplete
                                            loading={loadingProvinces}
                                            {...field}
                                            onChange={(e, value) => {
                                                setValue('address.district', { DistrictName: '' });
                                                setValue('address.ward', { WardName: '' });
                                                field.onChange(value);
                                            }}
                                            getOptionSelected={(option, value) =>
                                                option.ProvinceName === value.ProvinceName
                                            }
                                            size="small"
                                            sx={{ width: '100%' }}
                                            fullWidth={true}
                                            options={provinces}
                                            getOptionLabel={(option) => option.ProvinceName}
                                            renderInput={(params) => (
                                                <Fragment>
                                                    <TextField
                                                        {...params}
                                                        focused={!!fieldState.error}
                                                        color={fieldState.error ? 'error' : 'info'}
                                                        label="Tỉnh/Thành phố"
                                                        inputProps={{
                                                            ...params.inputProps,
                                                        }}
                                                        defaultValue=""
                                                    />
                                                    <p className="noti-validate">
                                                        {renderError([
                                                            {
                                                                error: fieldState?.error?.type === 'validate',
                                                                message: 'Bạn chưa nhập trường này',
                                                            },
                                                        ])}
                                                    </p>
                                                </Fragment>
                                            )}
                                        />
                                    )}
                                />
                            </div>

                            <div className={styles.wrapCol3}>
                                <Controller
                                    name="address.district"
                                    control={control}
                                    rules={{
                                        required: true,
                                        validate: (value) => {
                                            return !!value?.DistrictName;
                                        },
                                    }}
                                    render={({ field, fieldState }) => (
                                        <Autocomplete
                                            loading={loadingDistricts}
                                            {...field}
                                            onChange={(e, value) => {
                                                setValue('address.ward', { WardName: '' });
                                                field.onChange(value);
                                            }}
                                            getOptionSelected={(option, value) =>
                                                option.DistrictName === value.DistrictName
                                            }
                                            size="small"
                                            sx={{ width: '100%' }}
                                            fullWidth={true}
                                            disabled={!watch('address.province')?.ProvinceName}
                                            options={districts}
                                            getOptionLabel={(option) => option.DistrictName}
                                            renderInput={(params) => (
                                                <Fragment>
                                                    <TextField
                                                        {...params}
                                                        focused={!!fieldState.error}
                                                        color={fieldState.error ? 'error' : 'info'}
                                                        label="Quận/ Huyện"
                                                        inputProps={{
                                                            ...params.inputProps,
                                                        }}
                                                    />
                                                    <p className="noti-validate">
                                                        {renderError([
                                                            {
                                                                error: fieldState?.error?.type === 'validate',
                                                                message: 'Bạn chưa nhập trường này',
                                                            },
                                                        ])}
                                                    </p>
                                                </Fragment>
                                            )}
                                        />
                                    )}
                                />
                            </div>
                            <div className={styles.wrapCol3}>
                                <Controller
                                    name="address.ward"
                                    control={control}
                                    rules={{
                                        required: true,
                                        validate: (value) => {
                                            return !!value?.WardName;
                                        },
                                    }}
                                    render={({ field, fieldState }) => (
                                        <Autocomplete
                                            {...field}
                                            loading={loadingWards}
                                            onChange={(e, value) => field.onChange(value)}
                                            size="small"
                                            sx={{ width: '100%' }}
                                            fullWidth={true}
                                            options={wards}
                                            getOptionSelected={(option, value) => option.WardName === value.WardName}
                                            getOptionLabel={(option) => option.WardName}
                                            disabled={!watch('address.district')?.DistrictName}
                                            renderInput={(params) => (
                                                <Fragment>
                                                    <TextField
                                                        {...params}
                                                        focused={!!fieldState.error}
                                                        color={fieldState.error ? 'error' : 'info'}
                                                        label="Phường/ Xã"
                                                        inputProps={{
                                                            ...params.inputProps,
                                                        }}
                                                    />
                                                    <p className="noti-validate">
                                                        {renderError([
                                                            {
                                                                error: fieldState?.error?.type === 'validate',
                                                                message: 'Bạn chưa nhập trường này',
                                                            },
                                                        ])}
                                                    </p>
                                                </Fragment>
                                            )}
                                        />
                                    )}
                                />
                            </div>
                        </div>
                        <div className="col-md-12 d-flex align-content-between form-update-profile-item">
                            <div className={styles.wrapCol1}>
                                <Controller
                                    name="address.specificAddress"
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field, fieldState }) => (
                                        <Fragment>
                                            <TextField
                                                sx={{ width: '100%' }}
                                                focused={!!fieldState.error}
                                                color={fieldState.error ? 'error' : 'info'}
                                                label="Địa chỉ chi tiết"
                                                {...field}
                                                variant={inputPropsConstants.variantOutLine}
                                                size={inputPropsConstants.smallSize}
                                                multiline
                                                rows={3}
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
                        </div>

                        <div className="col-md-12 d-flex align-content-between form-update-profile-item">
                            <div className={styles.wrapCol1}>
                                <Controller
                                    name="defaultAddress"
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field, fieldState }) => (
                                        <FormControlLabel
                                            {...field}
                                            control={<Checkbox defaultChecked />}
                                            label="Đặt làm địa chỉ mặc định"
                                        />
                                    )}
                                />
                            </div>
                        </div>

                        <div className=" btn-update-profile d-flex justify-content-end">
                            <Button variant={inputPropsConstants.variantOutLine} size="medium" onClick={handleClose}>
                                Hủy
                            </Button>
                            <LoadingButton
                                sx={{ width: '30%', ml: 1 }}
                                loading={updateLoading}
                                type="submit"
                                variant={inputPropsConstants.variantContained}
                                size="medium"
                                startIcon={<SaveIcon />}
                            >
                                Lưu
                            </LoadingButton>
                        </div>
                    </form>
                </div>
            </Card>
        </Modal>
    );
}
