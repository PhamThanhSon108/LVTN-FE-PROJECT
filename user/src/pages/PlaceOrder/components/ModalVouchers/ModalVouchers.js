import React, { useEffect, Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
    Alert,
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
import { getMyVouchers } from '~/Redux/Actions/voucherAction';
import Voucher from '../Voucher/Voucher';
import moment from 'moment';
import { Link } from 'react-router-dom';

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
const ModalVouchers = ({ voucherToApply, isOpenModal, handleClose, handleApplyVoucher }) => {
    const [openModalUpdate, setOpenModalUpdate] = useState('');
    const [currentVoucher, setCurrentVoucher] = useState();
    const dispatch = useDispatch();
    const addressReducer = useSelector((state) => state.myVouchers);
    const { vouchers, loading } = addressReducer;

    const [addressWantToUpdate, setAddressWantToUpdate] = useState();
    const { userInfo } = useSelector((state) => state.userLogin);
    const cartOrder = useSelector((state) => state.cartOrder);
    const { cartOrderItems } = cartOrder;

    const handleClickOpenModalUpdate = (variant) => {
        setOpenModalUpdate(variant);
    };
    const handleConfirmChangeAddress = () => {
        handleApplyVoucher(currentVoucher);
        handleClose(false);
    };
    useEffect(() => {
        dispatch(getMyVouchers());
    }, []);
    let numberVoucher = 0;
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
                        />
                        <List sx={{ width: '100%', bgcolor: 'background.paper', pt: 0 }}>
                            <Box className="d-flex justify-content-between align-items-center" sx={{ boxShadow: 1 }}>
                                <Typography sx={{ ml: '16px' }} component="div" variant="h6" color="text.primary">
                                    Chọn voucher
                                </Typography>
                                <Link
                                    sx={{ cursor: 'pointer' }}
                                    to={'/voucher'}
                                    variant="body2"
                                    color="primary"
                                    onClick={() => handleClickOpenModalUpdate('add')}
                                >
                                    <Typography sx={{ mr: 2 }} color={'primary'}>
                                        Thêm ngay
                                    </Typography>
                                </Link>
                            </Box>
                            <div style={{ height: 2.5 }}>
                                {loading ? (
                                    <LinearProgress
                                        sx={{ borderTopLeftRadius: 50, borderTopRightRadius: 50, height: '2.5px' }}
                                    />
                                ) : null}
                            </div>
                            <div className={stylesProfile.addressListWrapper} style={{ minHeight: '100px' }}>
                                {vouchers?.map((voucher) => {
                                    const startDate = moment(voucher?.startDate);
                                    const endDate = moment(voucher?.endDate);
                                    const effectiveLater = startDate <= moment() && endDate >= moment();
                                    const endOfUse = voucher?.isUsageLimit && voucher.usageLimit <= voucher.used;
                                    const used =
                                        voucher?.usedBy?.filter((userId) => userId === userInfo?._id)?.length >=
                                        voucher?.userUseMaximum;
                                    const applyForProduct =
                                        voucher?.applyFor?.toString() === '1' ||
                                        cartOrderItems?.find((item) =>
                                            voucher?.applicableProducts?.find(
                                                (applyProduct) => applyProduct === item?.variant?.product?._id,
                                            ),
                                        );

                                    if (!used && applyForProduct && effectiveLater && !endOfUse) {
                                        numberVoucher = numberVoucher + 1;
                                        return (
                                            <label
                                                onClick={(e) => {
                                                    setCurrentVoucher(voucher);
                                                }}
                                                key={voucher?._id}
                                                for={voucher?.id}
                                                style={{ cursor: 'pointer', width: '100%' }}
                                            >
                                                <Voucher voucher={voucher} voucherToApply={voucherToApply} />
                                            </label>
                                        );
                                    }
                                    return <Fragment />;
                                })}{' '}
                                {(!(vouchers?.length > 0) || numberVoucher === 0) && !loading ? (
                                    <Alert
                                        className="col-12"
                                        sx={{ mt: 2, mb: 2, display: 'flex', flexDirection: 'row', width: '100%' }}
                                        severity="warning"
                                    >
                                        <div sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                                            <Typography>Bạn chưa có voucher nào</Typography>
                                            <Link
                                                sx={{ cursor: 'pointer' }}
                                                to={'/voucher'}
                                                variant="body2"
                                                color="primary"
                                                onClick={() => handleClickOpenModalUpdate('add')}
                                            >
                                                <Typography variant="caption" color="primary">
                                                    Thêm ngay
                                                </Typography>
                                            </Link>
                                        </div>
                                    </Alert>
                                ) : null}
                            </div>
                            <Box className="col-12 d-flex justify-content-end pt-2">
                                <Button
                                    disabled={!currentVoucher}
                                    variant="contained"
                                    onClick={handleConfirmChangeAddress}
                                >
                                    Áp dụng
                                </Button>
                            </Box>
                        </List>
                    </Fragment>
                </div>
            </Card>
        </Modal>
    );
};

export default ModalVouchers;
