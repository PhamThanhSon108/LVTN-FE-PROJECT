import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteCategory, FetchCategoriesTree } from '../../Redux/Actions/CategoryActions';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import {
  Avatar,
  Button,
  Card,
  IconButton,
  LinearProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styles from './Categories.module.scss';

import { inputPropsConstants } from '../../constants/variants';

import ModalAddCategoryParent from './components/ModalAddCategoryParent/ModalAddCategoryParent';
import ModalUpdateCategory from './components/ModalUpdateCategory/ModalUpdateCategory';
import ModalAddCategoryChild from './components/ModalAddCategoryChild/ModalAddCategoryChild';
import { ToastObject } from '../../components/LoadingError/ToastObject';
import { toast } from 'react-toastify';
import Toast from '../../components/LoadingError/Toast';

const Categories = () => {
  const lcategories = useSelector((state) => state.CategoryList);
  const { categories, loading } = lcategories;
  const [currentParentCategory, setCurrentParentCategory] = useState({});
  const [currentCategoryWantToUpdate, setCurrentCategoryWantToUpdate] = useState('');
  const [categoryWantToDelete, setCategoryWantToDelete] = useState('');

  const dispatch = useDispatch();
  const [isOpenModalAddCategory, setIsOpenModalAddCategory] = useState(false);

  const [isOpenAddCategoryParent, setIsOpenAddCategoryParent] = useState();
  const statusDeleteCategory = {
    success: () => {
      dispatch(FetchCategoriesTree());
      toast.success('Xóa thể loại thành công', ToastObject);
    },
    error: (message) => {
      toast.error(message || 'Có lỗi trong quá trình xử lý', ToastObject);
    },
    finally: () => {
      setCategoryWantToDelete('');
    },
  };
  const handleDeleteCategory = (id) => {
    if (window.confirm('Are you sure??')) {
      setCategoryWantToDelete(id);
      dispatch(DeleteCategory({ id, statusDeleteCategory }));
    }
  };
  const handleOpenModalAddCategory = (isOpen) => {
    setIsOpenModalAddCategory(isOpen);
    if (!isOpen) {
      setCurrentParentCategory({});
    }
  };

  const handleOpenModalAddCategoryParent = (isOpen) => {
    setIsOpenAddCategoryParent(isOpen);
  };

  const handleOpenModalUpdateCategory = (category) => {
    setCurrentCategoryWantToUpdate(category);
  };

  useEffect(() => {
    if (categories?.length === 0) dispatch(FetchCategoriesTree());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);
  return (
    <section className="content-main">
      <div className="col-md-12 col-lg-12">
        <ModalAddCategoryParent
          handleOpenModal={handleOpenModalAddCategoryParent}
          isOpenModal={isOpenAddCategoryParent}
        />
        <ModalUpdateCategory
          isOpenModal={!!currentCategoryWantToUpdate}
          currentCategory={currentCategoryWantToUpdate}
          handleOpenModal={handleOpenModalUpdateCategory}
        />

        <div className={styles.mainHeader}>
          <h2 className="content-title">Danh sách thể loại</h2>
          <Button
            variant={inputPropsConstants.variantContained}
            startIcon={<AddIcon />}
            onClick={() => handleOpenModalAddCategoryParent(true)}
            size="medium"
          >
            Thêm thể loại
          </Button>
        </div>

        <Toast />
        <ModalAddCategoryChild
          currentParentCategory={currentParentCategory}
          handleOpenModal={handleOpenModalAddCategory}
          isOpenModal={isOpenModalAddCategory}
        />

        <List
          className={styles.voucherList}
          sx={{
            overflow: 'auto',
          }}
          dense
          component="div"
          role="list"
        >
          {loading ? <LinearProgress /> : null}
          {categories &&
            categories?.map((value) => (
              <Accordion key={value?._id}>
                <Card>
                  {categoryWantToDelete === value._id ? <LinearProgress sx={{ width: '100%' }} /> : null}
                  <AccordionSummary
                    className={styles.categoryParent}
                    sx={{ height: 56 }}
                    expandIcon={<ExpandMoreIcon />}
                  >
                    <ListItem key={value} role="listitem" button>
                      <ListItemAvatar>
                        <Avatar alt={value?.name} src={value?.image} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Tooltip title={value?.name || 'Tên thể loại'}>
                            <Typography noWrap={true} variant="subtitle2" gutterBottom>
                              {value?.name || 'Tên thể loại'}
                            </Typography>
                          </Tooltip>
                        }
                        sx={{ width: '20%', maxWidth: '300px', pr: 2 }}
                      />
                      <ListItemText
                        primary={
                          <Tooltip title={value?.description || 'Mô tả về thể loại'}>
                            <Typography noWrap={true} variant="subtitle2" gutterBottom>
                              {value?.description || 'Mô tả về thể loại'}
                            </Typography>
                          </Tooltip>
                        }
                        sx={{ width: '20%', maxWidth: 'calc(100% - 350px)', pr: 2 }}
                      />

                      <ListItemIcon>
                        <IconButton
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenModalUpdateCategory(value);
                          }}
                          className={`${styles.actionEachVoucher} ${styles.actionEditVoucher}`}
                        >
                          <Tooltip title="Chỉnh sửa phân loại">
                            <EditIcon />
                          </Tooltip>
                        </IconButton>

                        <IconButton
                          disabled={value?.children?.length > 0}
                          loading={categoryWantToDelete === value._id}
                          className={`${styles.actionEachVoucher} ${styles.actionDeleteVoucher}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteCategory(value?._id);
                          }}
                        >
                          <Tooltip title="Xóa phân loại">
                            <DeleteIcon color={value?.children?.length > 0 ? 'disabled' : 'error'} />
                          </Tooltip>
                        </IconButton>
                      </ListItemIcon>
                    </ListItem>
                  </AccordionSummary>
                </Card>

                <AccordionDetails sx={{ ml: 8, pl: 2, pr: 0 }}>
                  <Card>
                    <List dense component="div" role="list" className={styles.categoryChildren}>
                      {value?.children &&
                        value?.children?.map((value) => (
                          <Fragment key={value?._id}>
                            {categoryWantToDelete === value._id ? <LinearProgress sx={{ width: '100%' }} /> : null}
                            <ListItem key={value} role="listitem" button>
                              <ListItemAvatar>
                                <Avatar alt={value?.name} src={value?.image} />
                              </ListItemAvatar>
                              <ListItemText
                                primary={
                                  <Tooltip title={value?.name || 'Tên thể loại'}>
                                    <Typography noWrap={true} variant="subtitle2" gutterBottom>
                                      {value?.name || 'Tên thể loại'}
                                    </Typography>
                                  </Tooltip>
                                }
                                sx={{ width: '20%', maxWidth: '300px', pr: 2 }}
                              />
                              <ListItemText
                                primary={
                                  <Tooltip title={value?.description || 'Mô tả về thể loại'}>
                                    <Typography noWrap={true} variant="subtitle2" gutterBottom>
                                      {value?.description || 'Mô tả về thể loại'}
                                    </Typography>
                                  </Tooltip>
                                }
                                sx={{ width: '20%', maxWidth: 'calc(100% - 350px)', pr: 2 }}
                              />

                              <ListItemIcon>
                                <IconButton
                                  onClick={() => handleOpenModalUpdateCategory(value)}
                                  className={`${styles.actionEachVoucher} ${styles.actionEditVoucher}`}
                                >
                                  <Tooltip title="Chỉnh sửa phân loại">
                                    <EditIcon />
                                  </Tooltip>
                                </IconButton>
                                <IconButton
                                  loading={categoryWantToDelete === value._id}
                                  className={`${styles.actionEachVoucher} ${styles.actionDeleteVoucher}`}
                                  onClick={() => handleDeleteCategory(value?._id)}
                                >
                                  <Tooltip title="Xóa phân loại">
                                    <DeleteIcon color="error" />
                                  </Tooltip>
                                </IconButton>
                              </ListItemIcon>
                            </ListItem>
                          </Fragment>
                        ))}
                      <Button
                        onClick={() => {
                          handleOpenModalAddCategory(true);
                          setCurrentParentCategory(value);
                        }}
                        startIcon={<AddIcon />}
                        className={styles.addSubCategoryBtn}
                      >
                        Thêm thể loại
                      </Button>
                    </List>
                  </Card>
                </AccordionDetails>
              </Accordion>
            ))}
        </List>
      </div>
    </section>
  );
};

export default Categories;
