import { useForm } from 'react-hook-form';

export default function useVoucher() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      firstName: '',
      select: {},
    },
  });
  const handleCreateVoucher = (data) => {};

  return { control, handleSubmit, handleCreateVoucher };
}
