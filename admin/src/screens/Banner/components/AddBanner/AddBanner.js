import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { createSlider } from '../../../../Redux/Actions/SliderAction';
import Loading from '../../../../components/LoadingError/Loading';
import { toast } from 'react-toastify';
import Toast from '../../../../components/LoadingError/Toast';
import { UploadBanner } from '../UploadBanner/UploadBanner';
import { inputPropsConstants } from '../../../../constants/variants';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};
export default function AddBanner({ setOpen }) {
  const [image, setImage] = useState();
  const dispatch = useDispatch();
  const [clear, setClear] = useState(false);
  const sliderCreate = useSelector((state) => state.sliderCreate);
  const { loading, slider, success } = sliderCreate;
  useEffect(() => {
    if (slider) {
      setOpen(false);
      setClear((pre) => !pre);
    }
  }, [dispatch, success]);

  const submitHandler = (e) => {
    if (!image || image?.length <= 0) {
      toast.error('Please choose image', ToastObjects);
      return;
    }
    if (image?.length > 5) {
      toast.error('Too many selected images', ToastObjects);
      return;
    }
    e.preventDefault();
    const slider = new FormData();
    slider.append('banner', image);
    for (let i = 0; i < image.length; i++) {
      slider.append('banner', image[i]);
    }

    dispatch(createSlider({ slider }));
  };
  return (
    <>
      <Toast />
      {loading && <Loading />}
      <div class="input-group col-12">
        <UploadBanner setImage={setImage} clear={clear} />
      </div>
      {/* <p style={{ color: 'red' }}>{valueUrl.url}</p> */}
      <div style={{ padding: '15px 15px' }} className="col-12 d-flex justify-content-end">
        <Button variant={inputPropsConstants.variantContained} startIcon={<AddIcon />} onClick={submitHandler}>
          Thêm Banner
        </Button>
      </div>
    </>
  );
}
