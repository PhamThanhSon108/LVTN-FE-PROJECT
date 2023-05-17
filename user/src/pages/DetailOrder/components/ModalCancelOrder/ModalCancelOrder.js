import * as React from 'react';

import Modal from '@mui/material/Modal';
import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';
import {
    Alert,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Divider,
    IconButton,
    TextField,
    Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';

import CloseIcon from '@mui/icons-material/Close';
import { useParams } from 'react-router-dom';
import { cancelOrder, getOrderDetails } from '~/Redux/Actions/orderActions';
import { Toastobjects } from '~/components/LoadingError/Toast';
import { inputPropsConstants } from '~/constant/variants';
import { renderError } from '~/utils/errorMessage';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 1,
};

const cancelOption = [
    { label: 'Muốn thay đổi voucher' },
    { label: 'Muốn thay đổi sản phẩm trong đơn hàng' },
    { label: 'Thủ tục thanh toán quá rắc rối' },
    { label: 'Tìm được nơi khác bán đồ rẻ, đẹp hơn' },
    { label: 'Không có nhu cầu mua sản phẩm nữa' },
    { label: 'Khác...', value: 'other' },
];
export default function ModalCancelOrder() {
    const dispatch = useDispatch();
    const orderCancel = useSelector((state) => state.orderCancel);
    const { loading: loadingCancel, success: successCancel } = orderCancel;
    const [isOpenModal, setIsOpenModal] = React.useState();
    const { id: orderId } = useParams();
    const { watch, reset, control, handleSubmit } = useForm({
        defaultValues: {
            description: '',
            other: '',
        },
    });

    const handleClose = () => {
        setIsOpenModal(false);
    };
    const handleAfterFetch = {
        success: () => {
            toast.success('Hủy đơn hàng thành công', Toastobjects);
            setIsOpenModal(false);
            dispatch(getOrderDetails(orderId));
            reset();
        },
        error: (message) => {
            toast.error(message || 'Hủy đơn hàng thất bại', Toastobjects);
        },
        finally: () => {},
    };
    const handleCancelOrder = (data) => {
        if (window.confirm('Are you sure??')) {
            dispatch(
                cancelOrder({
                    orderId,
                    description: data?.description === 'other' ? data?.otherDescription : data?.description,
                    handleAfterFetch,
                }),
            );
        }
    };
    return (
        <React.Fragment>
            <Box className="d-flex justify-content-end align-items-center p-3 ">
                <LoadingButton onClick={() => setIsOpenModal(true)} variant="contained" color="error">
                    Hủy đơn hàng
                </LoadingButton>
            </Box>
            <div>
                <Modal
                    open={isOpenModal}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Card sx={style}>
                        <CardHeader
                            title={
                                <Typography variant="h6" fontSize="xl">
                                    <Typography noWrap={true} variant="h6" gutterBottom>
                                        Hủy đơn hàng
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
                        <CardContent>
                            <form onSubmit={handleSubmit(handleCancelOrder)}>
                                <Alert severity="warning" className="mb-3">
                                    Vui lòng chọn do hủy đơn. Lưu ý thao tác này sẽ hủy tất cả các sản phẩm có trong đơn
                                    và không thể hoàn tác!
                                </Alert>
                                <Controller
                                    name="description"
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field, fieldState }) => (
                                        <select {...field} type="text" id="product_category" className="form-select">
                                            <option value={''} selected>
                                                Lý do hủy đơn
                                            </option>
                                            {cancelOption?.map((reason) => (
                                                <option key={reason.label} value={reason.value}>
                                                    {reason.label}
                                                </option>
                                            ))}
                                        </select>
                                    )}
                                />

                                {watch('description') === 'other' ? (
                                    <Controller
                                        name="otherDescription"
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field, fieldState }) => (
                                            <TextField
                                                focused={!!fieldState.error}
                                                color={fieldState.error ? 'error' : 'info'}
                                                label="Lý do hủy đơn"
                                                {...field}
                                                variant={inputPropsConstants.variantOutLine}
                                                size={inputPropsConstants.smallSize}
                                                helperText={renderError([
                                                    {
                                                        error: fieldState?.error?.type === 'required',
                                                        message: 'Bạn chưa nhập trường này',
                                                    },
                                                ])}
                                                multiline
                                                rows={4}
                                                className="col-12 mt-3"
                                            />
                                        )}
                                    />
                                ) : null}
                                <CardActions className="d-flex justify-content-end align-content-between mt-3">
                                    <Button
                                        variant={inputPropsConstants.variantOutLine}
                                        size="medium"
                                        onClick={handleClose}
                                    >
                                        Hủy
                                    </Button>
                                    <LoadingButton
                                        disabled={!watch('description')}
                                        loading={loadingCancel}
                                        type="submit"
                                        variant={inputPropsConstants.variantContained}
                                        size="medium"
                                        color="error"
                                        startIcon={<AddIcon />}
                                    >
                                        Xác nhận
                                    </LoadingButton>
                                </CardActions>
                            </form>
                        </CardContent>
                    </Card>
                </Modal>
            </div>
        </React.Fragment>
    );
}
