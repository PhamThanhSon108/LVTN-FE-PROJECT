import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { getVouchers } from '../../../Redux/Actions/VoucherActions';

export default function useVoucher() {
  const dispatch = useDispatch();
  const { vouchers, loading } = useSelector((state) => state.Voucher);
  useEffect(() => {
    dispatch(getVouchers({}));
  }, []);

  return { vouchers, loading };
}
