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
  CircularProgress,
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

import { ToastObject } from '../../../../components/LoadingError/ToastObject';

import CloseIcon from '@mui/icons-material/Close';
import { cancelOrder, getPreviewOrder, updateStatusOrder } from '../../../../Redux/Actions/OrderActions';
import { useParams } from 'react-router-dom';
import { formatMoney } from '../../../../utils/formatMoney';
import moment from 'moment';
const notesForShipping = [
  { value: 'CHOTHUHANG', label: 'Cho thử hàng' },
  { value: 'CHOXEMHANGKHONGTHU', label: 'Cho xem hàng không thử' },
  { value: 'KHONGCHOXEMHANG', label: 'Không cho xem hàng' },
];

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

export default function ModalPreviewOrder() {
  const dispatch = useDispatch();
  const orderPreview = useSelector((state) => state.orderPreview);
  const { loading: loading, success: success, preview } = orderPreview;
  const [isOpenModal, setIsOpenModal] = React.useState();
  const { orderId } = useParams();
  const orderDetails = useSelector((state) => state.orderDetails);
  const { error, order } = orderDetails;
  const { reset, control, handleSubmit } = useForm({
    defaultValues: {
      description: '',
    },
  });
  const [requiredNote, setRequiredNote] = React.useState();
  const handleAfterFetch = {
    success: () => {
      setIsOpenModal(false);
      reset();
    },
    error: (message) => {},
    finally: () => {},
  };

  const saveStatusHandler = () => {
    if (window.confirm('Trạng thái đơn sẽ được cập nhật và không thể hoàn tác?')) {
      dispatch(
        updateStatusOrder({ status: 'delivery', orderId: orderId, delivery: { requiredNote }, handleAfterFetch }),
      );
    }
  };

  const orderUpdateStatus = useSelector((state) => state.orderUpdateStatus);
  const { loading: loadingUpdate, success: successUpdateStatus } = orderUpdateStatus;
  const handleClose = () => {
    setIsOpenModal(false);
  };

  React.useEffect(() => {
    dispatch(getPreviewOrder({ orderId }));
  }, []);

  return (
    <React.Fragment>
      <LoadingButton onClick={() => setIsOpenModal(true)} className="mt-3" variant="contained" sx={{ width: '100%' }}>
        GIAO ĐƠN CHO BÊN VẬN CHUYỂN
      </LoadingButton>
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
                    XÁC NHẬN BÀN GIAO ĐƠN
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
              <form onSubmit={handleSubmit(saveStatusHandler)}>
                <table
                  className="table table-bordered"
                  style={{
                    backgroundColor: '#fff',
                  }}
                >
                  <tbody>
                    <tr>
                      <td>
                        <strong>Mã đơn</strong>
                      </td>
                      <td>{loading ? <CircularProgress size={15} /> : preview?.order_code}</td>
                    </tr>

                    <tr>
                      <td>
                        <strong>Nhận hàng dự kiến vào</strong>
                      </td>
                      <td>
                        {loading ? (
                          <CircularProgress size={15} />
                        ) : (
                          moment(preview?.expected_delivery_time).format('DD/MM/YYYY')
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Phí vận chuyển</strong>
                      </td>
                      <td>
                        {loading ? (
                          <CircularProgress size={15} />
                        ) : (
                          formatMoney(preview?.total_fee || order?.shippingPrice || 20000)
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Tổng tiền hàng</strong>
                      </td>
                      <td>{loading ? <CircularProgress size={15} /> : formatMoney(order?.totalProductPrice || 0)}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Tổng thanh toán</strong>
                      </td>
                      <td>
                        <Typography component="div" variant="body1" color="error">
                          {loading ? <CircularProgress size={15} /> : formatMoney(order?.totalPayment || 0)}
                        </Typography>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <select
                  type="text"
                  id="product_category"
                  className="form-select"
                  placeholder="Category"
                  required
                  value={requiredNote}
                  onChange={(e) => setRequiredNote(e.target.value)}
                >
                  <option value={''} selected>
                    Lưu ý giao hàng
                  </option>
                  {notesForShipping?.map((note) => (
                    <option key={note.value} value={note.value}>
                      {note.label}
                    </option>
                  ))}
                </select>
                <CardActions className="d-flex justify-content-end align-content-between mt-3">
                  <Button variant={inputPropsConstants.variantOutLine} size="medium" onClick={handleClose}>
                    Hủy
                  </Button>
                  <Tooltip
                    sx={{ fontSize: '150px' }}
                    title={!requiredNote ? 'Bạn cần xác nhận thông tin đơn và chọn lưu ý khi giao hàng trước' : ''}
                  >
                    <div className="ml-3" style={{ marginLeft: '16px' }}>
                      <LoadingButton
                        loading={loadingUpdate}
                        type="submit"
                        variant={inputPropsConstants.variantContained}
                        size="medium"
                        color="error"
                        startIcon={<AddIcon />}
                        disabled={!requiredNote}
                      >
                        Giao đơn
                      </LoadingButton>
                    </div>
                  </Tooltip>
                </CardActions>
              </form>
            </CardContent>
          </Card>
        </Modal>
      </div>
    </React.Fragment>
  );
}
