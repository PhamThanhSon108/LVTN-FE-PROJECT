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
  Tooltip,
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
import { cancelOrder, updateCODAmount } from '../../../../Redux/Actions/OrderActions';
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

export default function ModalUpdateCOD() {
  const dispatch = useDispatch();
  const updateCOD = useSelector((state) => state.updateCOD);
  const { loading: loadingUpdateCode, success: success } = updateCOD;
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
      toast.success('Cập nhật COD thành công', ToastObject);
      setIsOpenModal(false);
      reset();
    },
    error: (message) => {
      toast.error(message || 'Cập nhật thất bại', ToastObject);
    },
    finally: () => {},
  };
  const handleCancelOrder = (data) => {
    if (window.confirm('Bạn có chắc muốn cập nhật COD của đơn hàng này??')) {
      dispatch(updateCODAmount({ orderId, cod_amount: data?.cod_amount, handleAfterFetch }));
    }
  };
  return (
    <React.Fragment>
      <div className="col-lg-12 col-md-6 ms-auto d-flex justify-content-start align-items-center">
        <Tooltip title="Cập nhật phí cod của đơn hàng">
          <Button
            color="warning"
            variant="outlined"
            size="small"
            onClick={() => setIsOpenModal(true)}
            className=" col-12"
          >
            Cập nhật COD
          </Button>
        </Tooltip>
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
                    Cập nhật COD cho đơn hàng
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
                  Giá trị này sẽ được cập nhật trực tiếp cho shipper thu phí của đơn hàng
                </Alert>
                <Controller
                  name="cod_amount"
                  control={control}
                  rules={{ required: true }}
                  render={({ field, fieldState }) => (
                    <TextField
                      focused={!!fieldState.error}
                      color={fieldState.error ? 'error' : 'info'}
                      label="Phí COD"
                      {...field}
                      variant={inputPropsConstants.variantOutLine}
                      size={inputPropsConstants.smallSize}
                      helperText={renderError([
                        { error: fieldState?.error?.type === 'required', message: 'Bạn chưa nhập trường này' },
                      ])}
                      className="col-12"
                      inputProps={{
                        type: 'number',
                        min: 0,
                      }}
                    />
                  )}
                />
                <CardActions className="d-flex justify-content-end align-content-between mt-3">
                  <Button variant={inputPropsConstants.variantOutLine} size="medium" onClick={handleClose}>
                    Hủy
                  </Button>
                  <LoadingButton
                    loading={loadingUpdateCode}
                    type="submit"
                    variant={inputPropsConstants.variantContained}
                    size="medium"
                    color="warning"
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
