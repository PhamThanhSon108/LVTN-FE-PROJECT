import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ListSlider, deleteSlider } from '../../Redux/Actions/SliderAction';

import Loading from '../../components/LoadingError/Loading';
import ModalAddBanner from './components/ModalAddBanner/ModalAddBanner';
import ModalUpdateBanner from './components/ModalUpdateBanner/ModalUpdateBanner';
import Toast from '../../components/LoadingError/Toast';
import { Card, IconButton, LinearProgress, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import styles from './Banner.module.scss';

export default function Banner() {
  const sliderList = useSelector((state) => state.sliderList);
  const { slider, loading } = sliderList;

  const sliderDelete = useSelector((state) => state.deleteSlider);
  const { success: successDelete, loading: loadingDelete } = sliderDelete;

  const dispatch = useDispatch();
  const sliderCreate = useSelector((state) => state.sliderCreate);
  const { success: successUpdate } = sliderCreate;
  useEffect(() => {
    dispatch(ListSlider());
  }, [successDelete, successUpdate, dispatch]);

  const handleDeleteSlider = (id) => {
    if (window.confirm('Are you sure??')) {
      dispatch(deleteSlider(id));
    }
  };

  return (
    <>
      <Toast />
      <div>
        {loadingDelete && <Loading />}
        <div className={styles.header}>
          <h2 className="content-title">Danh sách Banner</h2>
          <ModalAddBanner />
        </div>

        <div>
          <div style={{ height: 2.5 }}>
            {loading ? (
              <LinearProgress sx={{ borderTopLeftRadius: 50, borderTopRightRadius: 50, height: '2.5px' }} />
            ) : null}
          </div>
          <Card className={`${styles.cardWrapper} main-card-wrapper`}>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col" className={styles.thNameOfTable}>
                    Tên
                  </th>
                  <th scope="col" className={styles.thTypeOfTable}>
                    Loại
                  </th>
                  <th scope="col">Hình ảnh</th>
                  <th scope="col" className="text-end" style={{ padding: '0 20px' }}></th>
                </tr>
              </thead>
              <tbody>
                {slider?.map((value, index) => (
                  <tr key={value._id}>
                    <td>
                      <b>{value?.title || ''}</b>
                    </td>
                    <td>{value?.type === 'banner' ? 'Banner' : 'Slider'}</td>
                    <td>
                      <img src={value.imageUrl} alt={`Banner ${index + 1}`} style={{ height: '100px' }} />
                    </td>
                    <td className="d-flex justify-content-end align-item-center">
                      <ModalUpdateBanner id={value?._id} />

                      <IconButton
                        disabled={value?.children?.length > 0}
                        className="text-success"
                        onClick={() => handleDeleteSlider(value._id)}
                      >
                        <Tooltip title="Xóa">
                          <DeleteIcon color={value?.children?.length > 0 ? 'disabled' : 'error'} />
                        </Tooltip>
                      </IconButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>
      </div>
    </>
  );
}
