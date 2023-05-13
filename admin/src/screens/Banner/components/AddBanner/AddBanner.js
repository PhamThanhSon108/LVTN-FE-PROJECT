import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { createSlider } from '../../../../Redux/Actions/SliderAction';

import { toast } from 'react-toastify';
import Toast from '../../../../components/LoadingError/Toast';
import { UploadBanner } from '../UploadBanner/UploadBanner';
import { inputPropsConstants } from '../../../../constants/variants';
import { TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Controller, useForm } from 'react-hook-form';
import { renderError } from '../../../../utils/errorMessage';
import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';
import { convertFileToBase64 } from '../../../../utils/convertBase64';

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};
const positionBanner = {
  top: 0,
  bottom: 1,
};
export default function AddBanner({ setOpen }) {
  const { control, setValue, handleSubmit } = useForm({
    defaultValues: {
      image: '',
      title: '',
      type: 'slider',
      index: 3 || positionBanner.top,
    },
  });

  const dispatch = useDispatch();

  const sliderCreate = useSelector((state) => state.sliderCreate);
  const { loading } = sliderCreate;

  const handleAfterCreate = {
    success: () => {
      toast.success('Thêm hình ảnh thành công', ToastObjects);
      setOpen(false);
    },
    error: () => {},
  };

  const submitHandler = async (data) => {
    if (!data?.image) {
      toast.error('Bạn chưa chọn hình ảnh', ToastObjects);
      return;
    }
    convertFileToBase64(data.image, (base64) => {
      const slider = new FormData();
      slider.append('type', 'slider');
      slider.append('title', data.title);
      slider.append('imageFile', JSON.stringify(base64));
      dispatch(createSlider({ slider }, handleAfterCreate));
    });
  };
  return (
    <>
      <form onSubmit={handleSubmit(submitHandler)}>
        <Toast />
        <div class="input-group col-12 d-flex flex-column p-4">
          <h5 style={{ paddingBottom: '15px' }}>Thêm slider</h5>
          <Controller
            name="title"
            control={control}
            rules={{ required: true }}
            render={({ field, fieldState }) => (
              <TextField
                className="pb-2"
                focused={!!fieldState.error}
                color={fieldState.error ? 'error' : 'info'}
                label="Tên banner"
                {...field}
                variant={inputPropsConstants.variantOutLine}
                size={inputPropsConstants.smallSize}
                helperText={renderError([
                  { error: fieldState?.error?.type === 'required', message: 'Bạn chưa nhập trường này' },
                ])}
              />
            )}
          />

          <UploadBanner setImage={(image) => setValue('image', image)} />
        </div>

        {/* <p style={{ color: 'red' }}>{valueUrl.url}</p> */}
        <div style={{ padding: '15px 15px' }} className="col-12 d-flex justify-content-end">
          <LoadingButton
            loading={loading}
            type="submit"
            variant={inputPropsConstants.variantContained}
            startIcon={<AddIcon />}
          >
            Thêm
          </LoadingButton>
        </div>
      </form>
    </>
  );
}
