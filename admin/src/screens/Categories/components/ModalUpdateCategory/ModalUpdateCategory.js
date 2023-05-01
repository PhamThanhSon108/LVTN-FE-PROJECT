import * as React from 'react';
import Modal from '@mui/material/Modal';
import { Controller, useForm } from 'react-hook-form';
import { Button, Card, CardActions, TextField, Typography } from '@mui/material';

import styles from '../../Categories.module.scss';

import { useDispatch } from 'react-redux';

import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';
import AutorenewOutlinedIcon from '@mui/icons-material/AutorenewOutlined';
import { toast } from 'react-toastify';
import { FetchCategoriesTree, UpdateCategory } from '../../../../Redux/Actions/CategoryActions';
import { ToastObject } from '../../../../components/LoadingError/ToastObject';
import { inputPropsConstants } from '../../../../constants/variants';
import { renderError } from '../../../../utils/errorMessage';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ModalUpdateCategory({ isOpenModal, handleOpenModal, currentCategory }) {
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
  const updateCategoryStatus = {
    success: () => {
      toast.success('Cập nhật thể loại thành công', ToastObject);
      dispatch(FetchCategoriesTree());
      handleOpenModal(false);
      reset();
    },
    error: (message) => {
      toast.error(message || 'Có lỗi trong quá trình xử lý', ToastObject);
    },
    finally: () => {
      setIsLoadingAddCategory(false);
    },
  };
  const handleSubmitUpdateCategory = (data) => {
    setIsLoadingAddCategory(true);
    dispatch(
      UpdateCategory({
        id: currentCategory._id,
        category: { ...data },
        updateCategoryStatus,
      }),
    );
  };

  React.useEffect(() => {
    reset(currentCategory);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCategory?._id]);
  return (
    <div>
      <Modal
        open={isOpenModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card sx={style}>
          <Typography variant="h5" fontSize="xl" sx={{ mb: 3 }}>
            Cập nhật thể loại
          </Typography>

          <form onSubmit={handleSubmit(handleSubmitUpdateCategory)} className={styles.formWrapper}>
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
                  label="Mô tả thể loại"
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
                startIcon={<AutorenewOutlinedIcon />}
              >
                Cập nhật
              </LoadingButton>
            </CardActions>
          </form>
        </Card>
      </Modal>
    </div>
  );
}
