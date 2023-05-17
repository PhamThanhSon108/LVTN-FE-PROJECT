import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { deleteVoucher, getVouchers } from '../../../Redux/Actions/VoucherActions';
import { ToastObject } from '../../../components/LoadingError/ToastObject';
import { toast } from 'react-toastify';

export default function useVoucher() {
  const dispatch = useDispatch();
  const { vouchers, loading } = useSelector((state) => state.Voucher);

  const handleAfterDelete = {
    success: (voucher) => {
      toast.success('Xóa voucher thành công', ToastObject);
      dispatch(getVouchers({}));
    },
    error: (message) => {
      toast.error(message, ToastObject);
    },
    finally: () => {},
  };
  const handleDeleteVoucher = (id) => {
    dispatch(deleteVoucher({ id, handleAfterFetch: handleAfterDelete }));
  };
  useEffect(() => {
    dispatch(getVouchers({}));
  }, []);

  return { vouchers, loading, handleDeleteVoucher };
}
