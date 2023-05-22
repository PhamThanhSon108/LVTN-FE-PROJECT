import * as React from 'react';

import Modal from '@mui/material/Modal';
import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';
import {
  Alert,
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

import { inputPropsConstants } from '../../../../constants/variants';
import { renderError } from '../../../../utils/errorMessage';
import { ToastObject } from '../../../../components/LoadingError/ToastObject';
import { FetchCategoriesTree } from '../../../../Redux/Actions/CategoryActions';

import CloseIcon from '@mui/icons-material/Close';
import { cancelOrder } from '../../../../Redux/Actions/OrderActions';
import { useParams } from 'react-router-dom';

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

export default function ModalCancelOrder() {
  const dispatch = useDispatch();
  const orderCancel = useSelector((state) => state.orderCancel);
  const { loading: loadingCancel, success: successCancel } = orderCancel;
  const [isOpenModal, setIsOpenModal] = React.useState();
  const { orderId } = useParams();
  const { reset, control, handleSubmit } = useForm({
    defaultValues: {
      description: '',
    },
  });

  const handleClose = () => {
    setIsOpenModal(false);
  };
  const handleAfterFetch = {
    success: () => {
      toast.success('Hủy đơn hàng thành công', ToastObject);
      setIsOpenModal(false);
      reset();
    },
    error: (message) => {
      toast.error(message || 'Hủy đơn hàng thất bại', ToastObject);
    },
    finally: () => {},
  };
  const handleCancelOrder = (data) => {
    if (window.confirm('Are you sure??')) {
      dispatch(cancelOrder({ orderId, description: data?.description, handleAfterFetch }));
    }
  };
  return (
    <React.Fragment>
      <div className="col-lg-3 col-md-6 ms-auto d-flex justify-content-end align-items-center">
        <Button
          color="error"
          variant="contained"
          onClick={() => setIsOpenModal(true)}
          className=" col-6"
          style={{ marginBottom: '15px' }}
        >
          Hủy đơn hàng
        </Button>
      </div>
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
                  Vui lòng nhập lý do hủy đơn. Lưu ý thao tác này sẽ hủy tất cả các sản phẩm có trong đơn và không thể
                  hoàn tác!
                </Alert>
                <Controller
                  name="description"
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
                        { error: fieldState?.error?.type === 'required', message: 'Bạn chưa nhập trường này' },
                      ])}
                      multiline
                      rows={4}
                      className="col-12"
                    />
                  )}
                />
                <CardActions className="d-flex justify-content-end align-content-between mt-3">
                  <Button variant={inputPropsConstants.variantOutLine} size="medium" onClick={handleClose}>
                    Hủy
                  </Button>
                  <LoadingButton
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
