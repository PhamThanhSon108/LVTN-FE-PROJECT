import * as React from 'react';

import Dialog from '@mui/material/Dialog';

import Slide from '@mui/material/Slide';
import { useDispatch, useSelector } from 'react-redux';

import { TextField, Typography } from '@mui/material';
import { inputPropsConstants } from '../../../../constants/variants';
import SaveIcon from '@mui/icons-material/Save';

import { updateSlider } from '../../../../Redux/Actions/SliderAction';
import { Controller, useForm } from 'react-hook-form';
import { renderError } from '../../../../utils/errorMessage';
import { UploadBanner } from '../UploadBanner/UploadBanner';
import { Image } from 'primereact/image';
import { toast } from 'react-toastify';
import { ToastObject } from '../../../../components/LoadingError/ToastObject';
import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';
import { convertFileToBase64 } from '../../../../utils/convertBase64';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function ModalUpdateBanner({ banner, setBanner }) {
  const dispatch = useDispatch();

  const handleClose = (e) => {
    e.stopPropagation();
    setBanner('');
  };
  const { reset, control, setValue, handleSubmit } = useForm({
    defaultValues: {
      image: '',
      title: '',
    },
  });

  const sliderCreate = useSelector((state) => state.sliderCreate);
  const { loading } = sliderCreate;

  const handleAfterUpdate = {
    success: () => {
      setBanner('');
      toast.success('Cập nhật thành công', ToastObject);
    },
    error: () => {},
  };

  const submitHandler = async (data) => {
    convertFileToBase64(data.newImage, (base64) => {
      const slider = new FormData();
      if (data?.newImage) {
        slider.append('imageFile', JSON.stringify(base64));
      } else {
        slider.append('image', banner.image);
      }
      if (banner?.type === 'slider') {
        slider.append('type', 'slider');
      }
      if (banner?.type === 'banner') {
        slider.append('type', 'banner');
      }
      slider.append('updatedVersion', data.updatedVersion);
      slider.append('title', data.title);
      slider.append('index', data.index);
      console.log(data);
      dispatch(updateSlider({ slider, id: banner?._id }, handleAfterUpdate));
    });
  };

  React.useEffect(() => {
    if (banner) {
      reset(banner);
    }
  }, [banner]);
  if (!banner) return <React.Fragment />;
  return (
    <div style={{ width: '250px !important', zIndex: 1 }}>
      <Dialog
        style={{ minWidth: '250px !important' }}
        open={!!banner}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <form onSubmit={handleSubmit(submitHandler)}>
          <div class="input-group col-12 d-flex flex-column p-4">
            <h5 style={{ paddingBottom: '15px' }}>
              {banner?.type === 'slider' ? 'Cập nhật slider' : 'Cập nhật banner'}
            </h5>
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
            <div className="d-flex align-items-lg-start">
              <Typography>Banner cũ: </Typography>
              <Image
                style={{ zIndex: 10, marginBottom: 20, marginTop: '4px', marginLeft: '8px' }}
                template="Xem ảnh"
                alt={`Ảnh của ${banner?.name}`}
                width="60px"
                src={banner?.image}
              />
            </div>
            <UploadBanner setImage={(image) => setValue('newImage', image)} />
          </div>

          {/* <p style={{ color: 'red' }}>{valueUrl.url}</p> */}
          <div style={{ padding: '15px 15px' }} className="col-12 d-flex justify-content-end">
            <LoadingButton
              loading={loading}
              type="submit"
              variant={inputPropsConstants.variantContained}
              startIcon={<SaveIcon />}
            >
              Cập nhật
            </LoadingButton>
          </div>
        </form>
      </Dialog>
    </div>
  );
}

export default React.memo(ModalUpdateBanner);
