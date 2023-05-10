import moment from 'moment';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { AddVoucher } from '../../../../../Redux/Actions/VoucherActions';
const DEFAULT_STEP_USABLE_VOUCHER = 7;

export default function useAddVoucher() {
  const dispatch = useDispatch();
  const {
    control,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      name: '',
      applicableProducts: [],
      applyTime: [moment(), moment().add(DEFAULT_STEP_USABLE_VOUCHER, 'days')],
      applyFor: 2,
      discountType: 1,
      discount: 0,
      usageLimit: 1,
      isUsageLimit: 1,
      userUseMaximum: 1,
    },
  });
  const handleCreateVoucher = (data) => {
    const voucher = {
      ...data,
      startDate: data.applyTime[0].toJSON(),
      endDate: data.applyTime[1].toJSON(),
    };
    delete voucher.applyTime;
    console.log(voucher);
    dispatch(AddVoucher({ voucher }));
  };

  return { control, watch, errors, handleSubmit, handleCreateVoucher };
}
