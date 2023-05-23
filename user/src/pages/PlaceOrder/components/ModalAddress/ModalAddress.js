import React, { useEffect, Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
    Badge,
    Box,
    Button,
    Card,
    CardHeader,
    Chip,
    Divider,
    IconButton,
    LinearProgress,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Modal,
    Radio,
    Tooltip,
    Typography,
} from '@mui/material';

import { RemoveShippingAddress, getShippingAddresses, updateUserProfile } from '~/Redux/Actions/userActions';
import AddIcon from '@mui/icons-material/Add';

import stylesProfile from '~/pages/Profile/components/AddressTab/AddressTab.module.scss';

import { useForm } from 'react-hook-form';
import ModalUpdateAddress from '~/pages/Profile/components/ModalUpdateAddress/ModalUpdateAddress';
import { toast } from 'react-toastify';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',

    boxShadow: 24,
    p: 1,
};
const ModalAddress = ({ addressOld, isOpenModal, handleClose, handleChangeAddress }) => {
    const [openModalUpdate, setOpenModalUpdate] = useState('');
    const [currentAddress, setCurrentAddress] = useState(addressOld);

    const addressReducer = useSelector((state) => state.shippingAddress);
    const { listAddress, loading } = addressReducer;

    const [addressWantToUpdate, setAddressWantToUpdate] = useState();

    const handleClickOpenModalUpdate = (variant) => {
        setOpenModalUpdate(variant);
    };
    const handleConfirmChangeAddress = () => {
        handleChangeAddress(currentAddress);
        handleClose(false);
    };
    return (
        <Modal open={isOpenModal} onClose={() => handleClose(false)}>
            <Card sx={style}>
                <div>
                    <Fragment>
                        <ModalUpdateAddress
                            isOpenModal={!!openModalUpdate}
                            handleOpenModal={setOpenModalUpdate}
                            address={addressWantToUpdate}
                            variant={openModalUpdate}
                            //cập nhật địa chỉ giao hàng mới
                            setCurrentAddress={setCurrentAddress}
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
                                    <LinearProgress
                                        sx={{ borderTopLeftRadius: 50, borderTopRightRadius: 50, height: '2.5px' }}
                                    />
                                ) : null}
                            </div>
                            <div className={stylesProfile.addressListWrapper}>
                                {listAddress.map((address) => (
                                    <label
                                        onClick={() => setCurrentAddress(address)}
                                        key={address?._id}
                                        for={address?.id}
                                        style={{ cursor: 'pointer', width: '100%' }}
                                    >
                                        <ListItem
                                            alignItems="flex-start"
                                            secondaryAction={
                                                <div className={stylesProfile.actionWrapper}>
                                                    <div className={stylesProfile.modifyAction}>
                                                        <span
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleClickOpenModalUpdate('update');
                                                                setAddressWantToUpdate(address);
                                                            }}
                                                            className={stylesProfile.btn}
                                                        >
                                                            Cập nhật
                                                        </span>
                                                    </div>
                                                </div>
                                            }
                                        >
                                            <ListItemIcon sx={{ minWidth: '30px', pt: '2px' }}>
                                                <input
                                                    name="address"
                                                    type="radio"
                                                    id={address?._id}
                                                    checked={
                                                        !currentAddress
                                                            ? addressOld?._id === address?._id
                                                            : currentAddress?._id === address?._id
                                                    }
                                                />
                                            </ListItemIcon>
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
                                                            {address?.province?.name || ''},{' '}
                                                            {address?.district?.name || ''}, {address?.ward?.name || ''}
                                                            , {address?.specificAddress}
                                                        </Typography>
                                                    </React.Fragment>
                                                }
                                            />
                                        </ListItem>
                                        {address?.isDefault ? (
                                            <Chip
                                                sx={{ ml: '46px' }}
                                                className={stylesProfile.defaultAddressChip}
                                                color="primary"
                                                label="Mặc định"
                                            />
                                        ) : null}
                                        <Divider variant="middle" component="li" />
                                    </label>
                                ))}
                            </div>
                            <Box className="col-12 d-flex justify-content-end pt-2">
                                <Button variant="contained" onClick={handleConfirmChangeAddress}>
                                    Xác nhận
                                </Button>
                            </Box>
                        </List>
                    </Fragment>
                </div>
            </Card>
        </Modal>
    );
};

export default ModalAddress;
