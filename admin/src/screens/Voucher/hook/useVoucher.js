import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { deleteVoucher, getVouchers } from '../../../Redux/Actions/VoucherActions';
import { ToastObject } from '../../../components/LoadingError/ToastObject';
import { toast } from 'react-toastify';
import useSearchParamsCustom from '../../../hooks/useSearchParamCustom';
import { debounce } from 'lodash';
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
  const { getParamValue, replaceParams } = useSearchParamsCustom();
  const debouncedSearch = useRef(
    debounce(async (criteria) => {
      replaceParams([{ key: 'search', value: criteria }], true);
    }, 500),
  ).current;
  async function handleChangeSearch(e) {
    debouncedSearch(e.target.value);
  }
  const keyword = getParamValue('search');
  useEffect(() => {
    dispatch(getVouchers({ keyword }));
  }, []);

  useEffect(() => {
    return () => {
      debouncedSearch?.cancel();
    };
  }, [debouncedSearch]);

  return { keyword, vouchers, loading, handleDeleteVoucher, handleChangeSearch };
}
