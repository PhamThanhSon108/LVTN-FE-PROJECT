import * as React from 'react';

import Modal from '@mui/material/Modal';
import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

import { inputPropsConstants } from '../../../../constants/variants';
import { renderError } from '../../../../utils/errorMessage';
import { ToastObject } from '../../../../components/LoadingError/ToastObject';
import { AddCategory, FetchCategoriesTree } from '../../../../Redux/Actions/CategoryActions';
import styles from '../../Categories.module.scss';
import CloseIcon from '@mui/icons-material/Close';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 1,
};

export default function ModalAddCategoryChild({ isOpenModal, handleOpenModal, currentParentCategory }) {
  const dispatch = useDispatch();
  const [isLoadingAddCategory, setIsLoadingAddCategory] = React.useState(false);

  const { reset, control, handleSubmit } = useForm({
    defaultValues: {
      name: '',
      parent: '',
      description: '',
      level: 2,
      image: 'https://cf.shopee.vn/file/c3f3edfaa9f6dafc4825b77d8449999d_tn',
    },
  });
  const handleClose = () => {
    handleOpenModal(false);
  };
  const createCategoryStatus = {
    success: () => {
      toast.success('Tạo thể loại thành công', ToastObject);
      dispatch(FetchCategoriesTree());
      handleOpenModal(false);
      reset();
    },
    error: (message) => {
      toast.error(message || 'Có lỗi trong quá trình tạo', ToastObject);
    },
    finally: () => {
      setIsLoadingAddCategory(false);
    },
  };
  const handleSubmitAddCategory = (data) => {
    setIsLoadingAddCategory(true);
    dispatch(AddCategory({ category: { ...data, parent: currentParentCategory?._id }, createCategoryStatus }));
  };
  return (
    <div>
      <Modal
        open={isOpenModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card sx={style}>
          <CardHeader
            title={
              <Typography variant="h6" fontSize="xl" className={styles.titleModal}>
                <Tooltip title={currentParentCategory?.name || ''}>
                  <Typography noWrap={true} variant="h6" gutterBottom>
                    Thêm thể loại con cho "{currentParentCategory?.name || ''}"
                  </Typography>
                </Tooltip>
              </Typography>
            }
            action={
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            }
          />
          <Divider />
          <CardContent>
            <form onSubmit={handleSubmit(handleSubmitAddCategory)} className={styles.formWrapper}>
              <Controller
                name="name"
                control={control}
                rules={{ required: true }}
                render={({ field, fieldState }) => (
                  <TextField
                    className={styles.formItem}
                    focused={!!fieldState.error}
                    color={fieldState.error ? 'error' : 'info'}
                    label="Tên thể loại"
                    {...field}
                    variant={inputPropsConstants.variantOutLine}
                    size={inputPropsConstants.smallSize}
                    helperText={renderError([
                      { error: fieldState?.error?.type === 'required', message: 'Bạn chưa nhập trường này' },
                    ])}
                  />
                )}
              />

              <Controller
                name="description"
                control={control}
                rules={{ required: true }}
                render={({ field, fieldState }) => (
                  <TextField
                    focused={!!fieldState.error}
                    color={fieldState.error ? 'error' : 'info'}
                    label="Mô tả về thể loại"
                    {...field}
                    variant={inputPropsConstants.variantOutLine}
                    size={inputPropsConstants.smallSize}
                    helperText={renderError([
                      { error: fieldState?.error?.type === 'required', message: 'Bạn chưa nhập trường này' },
                    ])}
                    multiline
                    rows={4}
                  />
                )}
              />
              <CardActions className={styles.actionWrapper}>
                <Button variant={inputPropsConstants.variantOutLine} size="small" onClick={handleClose}>
                  Hủy
                </Button>
                <LoadingButton
                  loading={isLoadingAddCategory}
                  type="submit"
                  variant={inputPropsConstants.variantContained}
                  size="small"
                  startIcon={<AddIcon />}
                >
                  Thêm thể loại
                </LoadingButton>
              </CardActions>
            </form>
          </CardContent>
        </Card>
      </Modal>
    </div>
  );
}
