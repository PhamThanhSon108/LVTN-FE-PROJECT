import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteCategory, FetchCategoriesTree } from '../../Redux/Actions/CategoryActions';
import Toast from '../LoadingError/Toast';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import {
  Avatar,
  Button,
  Card,
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
import ModalAddCategoryChild from './ModalAddCategoryChild';
import ModalAddCategoryParent from './ModalAddCategoryParent';
import { inputPropsConstants } from '../../constants/variants';
import { toast } from 'react-toastify';
import { ToastObject } from '../LoadingError/ToastObject';
import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';
import ModalUpdateCategory from './ModalUpdateCategory';

const CategoriesTable = () => {
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
    dispatch(FetchCategoriesTree());
  }, [dispatch]);
  return (
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

      <div className="content-header">
        <h2 className="content-title">Danh sách thể loại</h2>
        <Button
          variant={inputPropsConstants.variantContained}
          startIcon={<i className="fas fa-plus-circle" />}
          onClick={() => handleOpenModalAddCategoryParent(true)}
        >
          Tạo thể loại
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
          bgcolor: 'background.paper',
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
                <AccordionSummary className={styles.categoryParent} sx={{ height: 56 }} expandIcon={<ExpandMoreIcon />}>
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
                        <Tooltip title={value?.description || 'Mô tả của thể loại'}>
                          <Typography noWrap={true} variant="subtitle2" gutterBottom>
                            {value?.description || 'Mô tả của thể loại'}
                          </Typography>
                        </Tooltip>
                      }
                      sx={{ width: '20%', maxWidth: 'calc(100% - 350px)', pr: 2 }}
                    />

                    <ListItemIcon>
                      <div
                        onClick={() => handleOpenModalUpdateCategory(value)}
                        className={`${styles.actionEachVoucher} ${styles.actionEditVoucher}`}
                      >
                        <Tooltip title="Chỉnh sửa phân loại">
                          <i className="fas fa-pencil color-red" />
                        </Tooltip>
                      </div>

                      <LoadingButton
                        disabled={value?.children?.length > 0}
                        loading={categoryWantToDelete === value._id}
                        className={`${styles.actionEachVoucher} ${styles.actionDeleteVoucher}`}
                        onClick={() => handleDeleteCategory(value?._id)}
                      >
                        <Tooltip title="Xóa phân loại">
                          <i className="fas fa-trash-alt color-red" />
                        </Tooltip>
                      </LoadingButton>
                    </ListItemIcon>
                  </ListItem>
                </AccordionSummary>
              </Card>

              <AccordionDetails sx={{ ml: 8, pl: 2, pr: 0 }}>
                <Card>
                  <List dense component="div" role="list" className={styles.categoryChildren}>
                    {value?.children &&
                      value?.children?.map((value) => (
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
                              <Tooltip title={value?.description || 'Mô tả của thể loại'}>
                                <Typography noWrap={true} variant="subtitle2" gutterBottom>
                                  {value?.description || 'Mô tả của thể loại'}
                                </Typography>
                              </Tooltip>
                            }
                            sx={{ width: '20%', maxWidth: 'calc(100% - 350px)', pr: 2 }}
                          />

                          <ListItemIcon>
                            <div
                              onClick={() => handleOpenModalUpdateCategory(value)}
                              className={`${styles.actionEachVoucher} ${styles.actionEditVoucher}`}
                            >
                              <Tooltip title="Chỉnh sửa phân loại">
                                <i className="fas fa-pencil color-red" />
                              </Tooltip>
                            </div>
                            <LoadingButton
                              loading={categoryWantToDelete === value._id}
                              className={`${styles.actionEachVoucher} ${styles.actionDeleteVoucher}`}
                              onClick={() => handleDeleteCategory(value?._id)}
                            >
                              <Tooltip title="Xóa phân loại">
                                <i className="fas fa-trash-alt color-red" />
                              </Tooltip>
                            </LoadingButton>
                          </ListItemIcon>
                        </ListItem>
                      ))}
                    <Button
                      onClick={() => {
                        handleOpenModalAddCategory(true);
                        setCurrentParentCategory(value);
                      }}
                      startIcon={<i className="fas fa-plus-circle" />}
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
  );
};

export default CategoriesTable;
