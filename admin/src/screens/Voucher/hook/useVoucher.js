import { useForm } from 'react-hook-form';

export default function useVoucher() {
  const { control, watch, handleSubmit } = useForm({
    defaultValues: {
      firstName: '',
      select: {},
      applyFor: '2',
    },
  });
  const handleCreateVoucher = (data) => {};

  return { control, watch, handleSubmit, handleCreateVoucher };
}
