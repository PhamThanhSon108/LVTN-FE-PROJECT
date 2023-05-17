import moment from 'moment';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { AddVoucher, UpdateVoucher, getVoucher } from '../../../../../Redux/Actions/VoucherActions';
import { toast } from 'react-toastify';
import { ToastObject } from '../../../../../components/LoadingError/ToastObject';
import { useHistory, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { applyVoucherFor, isUsageLimit } from '../AddVoucher';
const DEFAULT_STEP_USABLE_VOUCHER = 7;

export default function useAddVoucher() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const {
    control,
    setValue,
    reset,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      name: '',
      applicableProducts: [],
      applyTime: [moment(), moment().add(DEFAULT_STEP_USABLE_VOUCHER, 'days')],
      applyFor: 1,
      discountType: '1',
      discount: 0,
      usageLimit: 1,
      isUsageLimit: 1,
      userUseMaximum: 1,
      maximumDiscount: 0,
    },
  });
  const { loadingAdd, loadingDetail } = useSelector((state) => state.Voucher);
  const handleAfterAdd = {
    success: () => {
      toast.success(id ? 'Cập nhật thành công' : 'Tạo voucher thành công!', ToastObject);
      history.push('/vouchers');
    },
    error: (message) => {
      toast.error(message, ToastObject);
    },
  };

  const handleAfterGetDetail = {
    success: (voucher) => {
      reset({ ...voucher, isUsageLimit: voucher.isUsageLimit ? isUsageLimit.limit : isUsageLimit.notLimit });
    },
    error: (message) => {
      toast.error(message, ToastObject);
    },
    finally: () => {},
  };

  const handleCreateVoucher = (data) => {
    const voucher = {
      ...data,
      startDate: data.applyTime[0].toJSON(),
      endDate: data.applyTime[1].toJSON(),
      applicableProducts: data?.applicableProducts?.map((product) => product._id),
    };
    if (data.applyFor === applyVoucherFor.selectedProducts && data.applicableProducts?.length === 0) {
      toast.error('Bạn chưa chọn sản phẩm áp dụng', ToastObject);
      return;
    }
    delete voucher.applyTime;
    if (id) {
      dispatch(UpdateVoucher({ voucher, createVoucherStatus: handleAfterAdd }));
    } else {
      dispatch(AddVoucher({ voucher, createVoucherStatus: handleAfterAdd }));
    }
  };

  useEffect(() => {
    if (id) {
      dispatch(getVoucher({ id, handleAfterFetch: handleAfterGetDetail }));
    }
  }, []);
  return { loadingDetail, id, loadingAdd, control, setValue, watch, errors, handleSubmit, handleCreateVoucher };
}
