import React, { useEffect, Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
    Badge,
    Box,
    Chip,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Tooltip,
    Typography,
} from '@mui/material';

import { updateUserProfile } from '~/Redux/Actions/userActions';
import AddIcon from '@mui/icons-material/Add';

import styles from './AddressTab.module.scss';
import ModalUpdateAddress from '../ModalUpdateAddress/ModalUpdateAddress';
import { useForm } from 'react-hook-form';

const AddressTab = () => {
    const dispatch = useDispatch();
    const [openModalUpdate, setOpenModalUpdate] = useState('');
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
    const handleClickOpenModalUpdate = (variant) => {
        setOpenModalUpdate(variant);
    };

    return (
        <Fragment>
            <ModalUpdateAddress
                isOpenModal={!!openModalUpdate}
                handleOpenModal={setOpenModalUpdate}
                currentParentCategory={{ name: 'son' }}
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

                <div className={styles.addressListWrapper}>
                    {[1, 2, 3, 4, 5].map((value) => (
                        <Fragment key={value?._id}>
                            <ListItem
                                alignItems="flex-start"
                                secondaryAction={
                                    <div className={styles.actionWrapper}>
                                        <div className={styles.modifyAction}>
                                            <span onClick={handleClickOpenModalUpdate} className={styles.btn}>
                                                Cập nhật
                                            </span>
                                            <span className={styles.btn}>Xóa</span>
                                        </div>
                                        <div className={styles.setDefaultAction}>
                                            <span>Thiết lập mặc định</span>
                                        </div>
                                    </div>
                                }
                            >
                                <ListItemText
                                    primary={'Đăk Mar | Đăk Hà | Kon Tum'}
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                sx={{ maxWidth: 'calc(100% - 130px)' }}
                                                component="div"
                                                variant="caption"
                                                color="text.primary"
                                            >
                                                Ali Connors
                                                {" — I'll be in your neighborhood doing errands"}
                                                {" — I'll be in your neighborhood doing errands"}
                                                {" — I'll be in your neighborhood doing errands"}
                                                {" — I'll be in your neighborhood doing errands"}
                                                {" — I'll be in your neighborhood doing errands"}
                                                {" — I'll be in your neighborhood doing errands"}
                                                {" — I'll be in your neighborhood doing errands"}
                                                {" — I'll be in your neighborhood doing errands"}
                                            </Typography>
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>

                            <Chip className={styles.defaultAddressChip} color="primary" label="Mặc định" />
                            <Divider variant="middle" component="li" />
                        </Fragment>
                    ))}
                </div>
            </List>
        </Fragment>
    );
};

export default AddressTab;
