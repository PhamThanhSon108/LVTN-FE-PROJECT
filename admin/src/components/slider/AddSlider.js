import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { createSlider, ListSlider } from '../../Redux/Actions/SliderAction';
import { SLIDER_CREATE_RESET } from '../../Redux/Constants/SliderConstants';
import Message from '../LoadingError/Error';
import Loading from '../LoadingError/Loading';
import Toast from '../LoadingError/Toast';
import isEmpty from 'validator/lib/isEmpty';
import { FileUploadDemo } from '../products/UploadImage';
import { UploadSlider } from './UploadSlider';

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};
export default function AddSlider({ setOpen }) {
  const [image, setImage] = useState();
  const dispatch = useDispatch();
  const [clear, setClear] = useState(false);
  const [valueUrl, SetValueUrl] = useState({});
  const sliderCreate = useSelector((state) => state.sliderCreate);
  const { loading, error, slider, success } = sliderCreate;
  useEffect(() => {
    if (slider) {
      // toast.success('Slider Added', ToastObjects);
      setOpen(false);
      setClear((pre) => !pre);
      // dispatch({ type: SLIDER_CREATE_RESET });
      // setUrl('');
    }
    // dispatch(ListSlider());
  }, [dispatch, success]);

  const submitHandler = (e) => {
    console.log(e);
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
    slider.append('slider', image);
    for (let i = 0; i < image.length; i++) {
      slider.append('slider', image[i]);
    }

    dispatch(createSlider({ slider }));
  };
  return (
    <>
      <Toast />
      {/* {error && (
        <div class="alert alert-danger" role="alert">
          {error}
        </div>
      )} */}
      {loading && <Loading />}
      <div class="input-group col-12">
        {/* <input
          type="url"
          class="form-control"
          placeholder="Please type url"
          aria-label="dsasd"
          aria-describedby="basic-addon1"
          required
          value={url}
          onClick={() => {
            let x = { ...valueUrl };
            SetValueUrl((x.url = ''));
            return x;
          }}
          onChange={(e) => setUrl(e.target.value)}
        /> */}
        {/* <input type="file" name="slider" multiple onChange={(e) => setImage(e.target.files)} /> */}
        <UploadSlider setImage={setImage} clear={clear} />
      </div>
      {/* <p style={{ color: 'red' }}>{valueUrl.url}</p> */}
      <div style={{ padding: '15px 15px' }} className="col-12 d-flex justify-content-end">
        <button class="btn btn-outline-secondary col-5" type="button" onClick={submitHandler}>
          Add banner
        </button>
      </div>
      {/* <form onSubmit={submitHandler} style={{ maxWidth: "1000px" }}>
        <div className="row mb-4">
          <div className="col-xl-8 col-lg-8">
            <div className="card mb-8 shadow-sm ">
              <div className="card-body">
                <div className="mb-8 d-flex">
                  <label htmlFor="product_title" className="form-label">
                    URL BANNER
                  </label>
                  <input
                    type="text"
                    placeholder="Type here"
                    className="form-control"
                    id="product_title"
                    required
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ minWidth: 100 }}
                  >
                    ADD
                  </button>
                </div>
                <div></div>
                
              </div>
            </div>
          </div>
        </div>
      </form> */}
    </>
  );
}
