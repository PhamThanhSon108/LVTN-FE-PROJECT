import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createSlider, deleteSlider, ListSlider } from '../../Redux/Actions/SliderAction';
import Loading from '../LoadingError/Loading';
import AddSlider from './AddSlider';
import Toast from '../LoadingError/Toast';
import UpDateBannerModal from '../../modal/UpDateBannerModal';
import AddBannerModal from '../../modal/AddBannerModal';
export default function Slidermain() {
  const sliderList = useSelector((state) => state.sliderList);
  const { slider } = sliderList;

  const sliderDelete = useSelector((state) => state.deleteSlider);
  const { error: errorDelete, success: successDelete, loading: loadingDelete } = sliderDelete;
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();
  const sliderCreate = useSelector((state) => state.sliderCreate);
  const { loading: loadingUpdate, error, success: successUpdate } = sliderCreate;
  useEffect(() => {
    dispatch(ListSlider());
  }, [successDelete, successUpdate]);
  // const handleEditSlide = (url, id) => {
  //   let newSlider = window.prompt('Edit Slider', `${url}`);
  //   if (newSlider) {
  //     dispatch(createSlider({ url: newSlider, id }));
  //   }
  // };
  const handleDeleteSlider = (id) => {
    if (window.confirm('Are you sure??')) {
      dispatch(deleteSlider(id));
    }
  };

  return (
    <>
      <Toast />
      <div className="content-main">
        {loadingDelete && <Loading />}
        <div className="content-header">
          <h2 className="content-title" style={{ padding: '15px' }}>
            Slider
          </h2>
        </div>
        {loadingUpdate && <Loading />}
        <div>
          <AddBannerModal />
          {/* <AddSlider /> */}
          {/* <AddSlider/> */}
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Url</th>
                <th scope="col" className="text-end" style={{ padding: '0 20px' }}>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {slider.map((value, index) => (
                <tr key={value._id}>
                  <td>
                    <b>Banner {index + 1}</b>
                  </td>
                  <td>
                    <img src={value.url} style={{ height: '100px' }} />
                  </td>
                  <td className="d-flex justify-content-end align-item-center">
                    <UpDateBannerModal id={value?._id} />
                    {/* <button
                    onClick={() => handleEditSlide(value.url, value._id)}
                    style={{ border: 'none', backgroundColor: '#f8f9fa' }}
                  ></button> */}
                    <button
                      onClick={() => handleDeleteSlider(value._id)}
                      className="text-success"
                      style={{
                        padding: '0 15px',
                        color: 'red',
                        border: 'none',
                        backgroundColor: '#f8f9fa',
                      }}
                    >
                      <i className="fas fa-trash-alt" style={{ color: 'red' }}></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            {/* <div className='btn' style={{ padding: "15px 15px" }}>
                <i className="fas fa-plus " style={{ color: "green", padding: " 15px"}}></i>
                ADD
            </div> */}
          </table>
        </div>
      </div>
    </>
  );
}
