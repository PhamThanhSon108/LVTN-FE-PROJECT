import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ListSlider, deleteSlider } from '../../Redux/Actions/SliderAction';

import Loading from '../../components/LoadingError/Loading';
import ModalAddBanner from './components/ModalAddBanner/ModalAddBanner';
import Toast from '../../components/LoadingError/Toast';
import { Box, Card, IconButton, LinearProgress, Tab, Tabs, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import styles from './Banner.module.scss';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import ModalUpdateBanner from './components/ModalUpdateBanner/ModalUpdateBanner';
import useSearchParamsCustom from '../../components/hooks/useSearchParamCustom';
export default function Banner() {
  const { getParamValue, replaceParams } = useSearchParamsCustom();
  const [bannerWantToUpdate, setBannerWantToUpdate] = useState('');
  const sliderList = useSelector((state) => state.sliderList);
  const { slider, loading } = sliderList;

  const sliderDelete = useSelector((state) => state.deleteSlider);
  const { success: successDelete, loading: loadingDelete } = sliderDelete;

  const dispatch = useDispatch();
  const sliderCreate = useSelector((state) => state.sliderCreate);
  const { success: successUpdate } = sliderCreate;

  const handleChangeTab = (e, tab) => {
    replaceParams([{ key: 'tab', value: tab }]);
  };

  useEffect(() => {
    dispatch(ListSlider());
  }, [successDelete, successUpdate, dispatch]);

  const handleDeleteSlider = (id) => {
    if (window.confirm('Bạn có chắc muốn xóa hình ảnh này?')) {
      dispatch(deleteSlider(id));
    }
  };

  return (
    <>
      <ModalUpdateBanner banner={bannerWantToUpdate} setBanner={setBannerWantToUpdate} />
      <TabContext value={getParamValue('tab') || 'slider'}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChangeTab}>
            <Tab label="Slider" value="slider" />
            <Tab label="Banner" value="banner" />
          </TabList>
        </Box>
        <TabPanel sx={{ padding: 0 }} value="slider" index={0}>
          <div>
            <div className={styles.header}>
              <h2 className="content-title">Danh sách Slider</h2>
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

                      <th scope="col">Hình ảnh</th>
                      <th scope="col" className="text-end" style={{ padding: '0 20px' }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {slider?.sliders?.map((banner, index) => (
                      <tr key={banner._id}>
                        <td>
                          <b>{banner?.title || ''}</b>
                        </td>

                        <td>
                          <img src={banner.image} alt={`Banner ${index + 1}`} style={{ height: '100px' }} />
                        </td>
                        <td className="d-flex justify-content-end align-item-center">
                          <IconButton className="text-success" onClick={() => setBannerWantToUpdate(banner)}>
                            <Tooltip title="Chỉnh sửa">
                              <EditIcon color="primary" />
                            </Tooltip>
                          </IconButton>
                          <IconButton
                            disabled={banner?.children?.length > 0}
                            className="text-success"
                            onClick={() => handleDeleteSlider(banner._id)}
                          >
                            <Tooltip title="Xóa">
                              <DeleteIcon color={'error'} />
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
        </TabPanel>
        <TabPanel sx={{ padding: 0 }} value="banner" index={1}>
          <div>
            {loadingDelete && <Loading />}
            <div className={styles.header} style={{ marginBottom: '15px', marginTop: '15px' }}>
              <h2 className="content-title">Danh sách Banner</h2>
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

                      <th scope="col">Hình ảnh</th>
                      <th scope="col" className="text-end" style={{ padding: '0 20px' }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {slider?.banners?.map((banner, index) => (
                      <tr key={banner._id}>
                        <td>
                          <b>{banner?.title || ''}</b>
                        </td>

                        <td>
                          <img src={banner.image} alt={`Banner ${index + 1}`} style={{ height: '100px' }} />
                        </td>
                        <td className="d-flex justify-content-end align-item-center">
                          <IconButton className="text-success" onClick={() => setBannerWantToUpdate(banner)}>
                            <Tooltip title="Chỉnh sửa">
                              <EditIcon color="primary" />
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
        </TabPanel>
      </TabContext>
    </>
  );
}
