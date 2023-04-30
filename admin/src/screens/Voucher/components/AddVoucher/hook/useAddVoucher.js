import { useForm } from 'react-hook-form';

export default function useAddVoucher() {
  const { control, watch, handleSubmit } = useForm({
    defaultValues: {
      firstName: '',
      select: {},
      applyFor: '2',
      discountType: 'price',
    },
  });
  const handleCreateVoucher = (data) => {};

  return { control, watch, handleSubmit, handleCreateVoucher };
}
