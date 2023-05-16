import React, { useEffect, Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
    Badge,
    Box,
    Chip,
    Divider,
    IconButton,
    LinearProgress,
    List,
    ListItem,
    ListItemText,
    Tooltip,
    Typography,
} from '@mui/material';

import { RemoveShippingAddress, updateUserProfile } from '~/Redux/Actions/userActions';
import AddIcon from '@mui/icons-material/Add';

import styles from './AddressTab.module.scss';
import ModalUpdateAddress from '../ModalUpdateAddress/ModalUpdateAddress';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const AddressTab = () => {
    const dispatch = useDispatch();
    const [openModalUpdate, setOpenModalUpdate] = useState('');
    const [addressWantToUpdate, setAddressWantToUpdate] = useState();
    const { reset, control, watch, getValues, handleSubmit } = useForm({
        defaultValues: {
            address: {
                district: '',
                ward: '',
                province: '',
                specificAddress: '',
            },
        },
    });

    const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
    const { loading: updateLoading } = userUpdateProfile;

    const addressReducer = useSelector((state) => state.shippingAddress);
    const { listAddress, loading } = addressReducer;
    const submitUpdateProfile = (data) => {
        dispatch(
            updateUserProfile({
                ...data,
            }),
        );
    };
    const handleClickOpenModalUpdate = (variant) => {
        setOpenModalUpdate(variant);
    };
    const handleAfterFetch = {
        success: (message) => {
            toast.success(message);
        },
        error: (message) => {
            toast.error(message);
        },
    };
    const handleDeleteAddress = (id) => {
        dispatch(RemoveShippingAddress(id, handleAfterFetch));
    };
    return (
        <Fragment>
            <ModalUpdateAddress
                isOpenModal={!!openModalUpdate}
                handleOpenModal={setOpenModalUpdate}
                address={addressWantToUpdate}
                variant={openModalUpdate}
            />
            <List sx={{ width: '100%', bgcolor: 'background.paper', pt: 0 }}>
                <Box className="d-flex justify-content-between align-items-center" sx={{ boxShadow: 1 }}>
                    <Typography sx={{ ml: '16px' }} component="div" variant="h6" color="text.primary">
                        Danh sách địa chỉ
                    </Typography>
                    <Tooltip title="Thêm địa chỉ mới">
                        <IconButton sx={{ mr: '16px' }} onClick={() => handleClickOpenModalUpdate('add')}>
                            <AddIcon />
                        </IconButton>
                    </Tooltip>
                </Box>
                <div style={{ height: 2.5 }}>
                    {loading ? (
                        <LinearProgress sx={{ borderTopLeftRadius: 50, borderTopRightRadius: 50, height: '2.5px' }} />
                    ) : null}
                </div>
                <div className={styles.addressListWrapper}>
                    {listAddress.map((address) => (
                        <Fragment key={address?._id}>
                            <ListItem
                                alignItems="flex-start"
                                secondaryAction={
                                    <div className={styles.actionWrapper}>
                                        <div className={styles.modifyAction}>
                                            <span
                                                onClick={() => {
                                                    handleClickOpenModalUpdate('update');
                                                    setAddressWantToUpdate(address);
                                                }}
                                                className={styles.btn}
                                            >
                                                Cập nhật
                                            </span>
                                            {!address?.isDefault ? (
                                                <span
                                                    onClick={() => handleDeleteAddress(address?._id)}
                                                    className={styles.btn}
                                                >
                                                    Xóa
                                                </span>
                                            ) : null}
                                        </div>
                                    </div>
                                }
                            >
                                <ListItemText
                                    primary={`${address?.name || ''} | ${address?.phone || ''}`}
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                sx={{ maxWidth: 'calc(100% - 130px)' }}
                                                component="div"
                                                variant="caption"
                                                color="text.primary"
                                            >
                                                {address?.province?.name || ''}, {address?.district?.name || ''},{' '}
                                                {address?.ward?.name || ''}, {address?.specificAddress}
                                            </Typography>
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>
                            {address?.isDefault ? (
                                <Chip className={styles.defaultAddressChip} color="primary" label="Mặc định" />
                            ) : null}
                            <Divider variant="middle" component="li" />
                        </Fragment>
                    ))}
                </div>
            </List>
        </Fragment>
    );
};

export default AddressTab;
