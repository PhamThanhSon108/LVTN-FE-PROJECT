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
  Chip,
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
import {
  cancelOrder,
  getBillOfLandingOrder,
  getPreviewOrder,
  updateStatusOrder,
} from '../../../../Redux/Actions/OrderActions';
import { useParams } from 'react-router-dom';
import { formatMoney } from '../../../../utils/formatMoney';
import moment from 'moment';
const notesForShipping = [
  { value: 'CHOTHUHANG', label: 'Cho thử hàng' },
  { value: 'CHOXEMHANGKHONGTHU', label: 'Cho xem hàng không thử' },
  { value: 'KHONGCHOXEMHANG', label: 'Không cho xem hàng' },
];

const sizeOfBill = [
  { value: 'A5', label: 'In khổ A5' },
  { label: 'In khổ 52 x 70 mm', value: '52x70' },
  { label: 'In khổ 80 x 80 mm', value: '80x80' },
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

export default function ModalPrintBillOfLanding({ orderCode = '' }) {
  const dispatch = useDispatch();
  const billOfLanding = useSelector((state) => state.billOfLanding);
  const { loading, success, bill } = billOfLanding;
  const [isOpenModal, setIsOpenModal] = React.useState();
  const { orderId } = useParams();

  const { reset, control, handleSubmit } = useForm({
    defaultValues: {
      description: '',
    },
  });
  const [size, setSize] = React.useState();
  const handleAfterFetch = {
    success: () => {
      setIsOpenModal(false);
      reset();
    },
    error: (message) => {},
    finally: () => {},
  };

  const handlePrintBillOfLanding = () => {
    dispatch(getBillOfLandingOrder({ orderId, pageSize: 'A5', handleAfterFetch }));
  };

  const handleClose = () => {
    setIsOpenModal(false);
  };

  return (
    <React.Fragment>
      <Chip
        label="In vận đơn"
        size="small"
        onClick={() => setIsOpenModal(true)}
        variant="outlined"
        color="primary"
        sx={{ ml: 1 }}
      >
        In vận đơn
      </Chip>
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
                  <Typography className="d-flex align-items-center" noWrap={true} variant="h6" gutterBottom>
                    In vận đơn cho mã đơn hàng:
                    <Typography variant="h6" color="primary" sx={{ ml: 2 }}>
                      {orderCode}
                    </Typography>
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
              <form onSubmit={handleSubmit(handlePrintBillOfLanding)}>
                <Alert color="warning" severity="warning">
                  Lưu ý: khổ 52 x 70 mm và khổ 80 x 80 mm chỉ dành cho máy in nhiệt, in và dán trực tiếp lên món hàng
                </Alert>
                <div className="mt-4 col-12 d-flex justify-content-between">
                  {sizeOfBill?.map((bill) => (
                    <Chip
                      color={bill.value === size ? 'primary' : 'default'}
                      variant={bill.value === size ? 'filled' : 'outlined'}
                      key={bill.value}
                      onClick={() => setSize(bill.value)}
                      label={bill.label}
                      sx={{ fontSize: '1.2rem' }}
                    />
                  ))}
                </div>

                <CardActions className="d-flex justify-content-end align-content-between mt-3">
                  <Button variant={inputPropsConstants.variantOutLine} size="medium" onClick={handleClose}>
                    Hủy
                  </Button>
                  <Tooltip
                    sx={{ fontSize: '150px' }}
                    title={!size ? 'Bạn cần xác nhận thông tin đơn và chọn lưu ý khi giao hàng trước' : ''}
                  >
                    <div className="ml-3" style={{ marginLeft: '16px' }}>
                      <LoadingButton
                        loading={loading}
                        type="submit"
                        variant={inputPropsConstants.variantContained}
                        size="medium"
                        color="primary"
                        startIcon={<AddIcon />}
                        disabled={!size}
                      >
                        In
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
