import React, { Fragment } from 'react';
import styles from './AddVoucher.module.scss';
import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';

import {
  Button,
  Card,
  FormControlLabel,
  InputAdornment,
  LinearProgress,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material';
import { MultiInputDateTimeRangeField } from '@mui/x-date-pickers-pro';
import { Controller } from 'react-hook-form';

import { Link } from 'react-router-dom';
import useAddVoucher from './hook/useAddVoucher';
import AddProductToVoucher from '../AddProductToVoucher/AddProductToVoucher';
import { inputPropsConstants } from '../../../../constants/variants';
import { renderError } from '../../../../utils/errorMessage';
import AddIcon from '@mui/icons-material/Add';

export const applyVoucherFor = {
  allProducts: 1,
  selectedProducts: 2,
};

export const voucherType = {
  price: '1',
  percent: '2',
};
export const isUsageLimit = {
  notLimit: 0,
  limit: 1,
};

export default function AddVoucher() {
  const { loadingDetail, id, loadingAdd, control, setValue, watch, handleSubmit, errors, handleCreateVoucher } =
    useAddVoucher();

  return (
    <div className={styles.voucherContainer}>
      <div className={styles.voucherWrapper}>
        <div className={styles.header}>
          <h2 className={styles.title}> {id ? 'Chỉnh sửa mã giảm giá' : 'Tạo mã giảm giá'}</h2>
        </div>
        <div style={{ height: 2.5 }}>
          {loadingDetail ? (
            <LinearProgress sx={{ borderTopLeftRadius: 50, borderTopRightRadius: 50, height: '2.5px' }} />
          ) : null}
        </div>
        <form className={styles.voucherForm} onSubmit={handleSubmit(handleCreateVoucher)}>
          <Card sx={{ boxShadow: 3 }} className={styles.voucherPropertyArea}>
            <h5 className={styles?.subTitle}>Thông tin cơ bản</h5>
            <Controller
              name="name"
              control={control}
              rules={{ required: true }}
              render={({ field, fieldState }) => (
                <TextField
                  focused={!!fieldState.error}
                  color={fieldState.error ? 'error' : 'info'}
                  className={styles.voucherFormItem}
                  label="Tên chương trình giảm giá"
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
              name="code"
              control={control}
              rules={{ required: true, pattern: /^[A-Za-z0-9]{6,20}$/ }}
              render={({ field, fieldState }) => (
                <TextField
                  focused={!!fieldState.error}
                  color={fieldState.error ? 'error' : 'info'}
                  className={styles.voucherFormItem}
                  label="Mã voucher"
                  {...field}
                  variant={inputPropsConstants.variantOutLine}
                  size={inputPropsConstants.smallSize}
                  helperText={renderError([
                    { error: fieldState?.error?.type === 'required', message: 'Bạn chưa nhập trường này' },
                    {
                      error: fieldState?.error?.type === 'min' || fieldState?.error?.type === 'pattern',
                      message:
                        'Mã giảm giá chỉ chứa chữ cái từ a-z, A-Z và chữ số từ 0 đến 9 và độ dài từ 6 đến 20 ký tự',
                    },
                  ])}
                />
              )}
            />

            <Controller
              name="applyTime"
              control={control}
              render={({ field, fieldState }) => (
                <MultiInputDateTimeRangeField
                  {...field}
                  size={inputPropsConstants.smallSize}
                  slotProps={{
                    textField: ({ position }) => ({
                      className: styles.voucherFormItem,
                      size: inputPropsConstants.smallSize,
                      label: position === 'start' ? 'Có hiệu lực từ' : 'Ngày hết hạn',
                    }),
                  }}
                />
              )}
            />

            <Controller
              name="applyFor"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  {...field}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                    if (field.value?._id) {
                      setValue('applicableProducts', []);
                    }
                  }}
                  row
                  className={styles.applyForProductWrapper}
                >
                  <FormControlLabel
                    value={applyVoucherFor.allProducts}
                    control={<Radio size={inputPropsConstants.smallSize} />}
                    label="Áp dụng cho tất cả sản phẩm"
                  />
                  <FormControlLabel
                    value={applyVoucherFor.selectedProducts}
                    control={<Radio size={inputPropsConstants.smallSize} />}
                    label="Chọn sản phẩm"
                  />
                </RadioGroup>
              )}
            />

            {Number(watch('applyFor')) === applyVoucherFor.selectedProducts ? (
              <Controller
                name="applicableProducts"
                control={control}
                render={({ field }) => <AddProductToVoucher field={field} voucherId={id} />}
              />
            ) : null}
          </Card>
          <Card sx={{ boxShadow: 3 }} bo className={styles.voucherPropertyArea}>
            <h5 className={styles?.subTitle}>Thiết lập khuyến mãi</h5>
            <Controller
              name="discountType"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  label="Loại giảm giá"
                  placeholder="Chọn thể loại"
                  {...field}
                  className={styles.applyForProductWrapper}
                  // defaultValue={voucherType.price}
                  row
                >
                  <FormControlLabel
                    value={voucherType.price}
                    control={<Radio size={inputPropsConstants.smallSize} />}
                    label="Giảm giá cố định"
                  />
                  <FormControlLabel
                    value={voucherType.percent}
                    control={<Radio size={inputPropsConstants.smallSize} />}
                    label="Giảm theo phần trăm(%)"
                  />
                </RadioGroup>
              )}
            />
            {watch('discountType') === voucherType.price ? (
              <Fragment>
                <Controller
                  name="discount"
                  control={control}
                  rules={{ required: true, max: 1000000000000, min: 0.01 }}
                  render={({ field, fieldState }) => (
                    <TextField
                      color={fieldState.error ? 'warning' : 'info'}
                      size={inputPropsConstants.smallSize}
                      className={styles.voucherFormItem}
                      label="Giảm giá"
                      InputProps={{
                        endAdornment: <InputAdornment position="end">VNĐ</InputAdornment>,
                        type: 'number',
                      }}
                      {...field}
                      variant={inputPropsConstants.variantOutLine}
                      helperText={renderError([
                        { error: fieldState?.error?.type === 'required', message: 'Bạn chưa nhập trường này' },
                        {
                          error: fieldState?.error?.type === 'min',
                          message: 'Giảm giá phải có giá trị lớn hơn 0',
                        },
                        {
                          error: fieldState?.error?.type === 'max',
                          message: 'Giá trị giảm giá quá lớn',
                        },
                      ])}
                    />
                  )}
                />
              </Fragment>
            ) : (
              <Fragment>
                <Controller
                  name="discount"
                  rules={{ required: true, max: 100, min: 0 }}
                  control={control}
                  render={({ field, fieldState }) => (
                    <TextField
                      focused={!!fieldState.error}
                      color={fieldState.error ? 'error' : 'info'}
                      rules={{ required: true, max: 100, min: 1 }}
                      size={inputPropsConstants.smallSize}
                      className={styles.voucherFormItem}
                      label="Giảm giá"
                      InputProps={{
                        endAdornment: <InputAdornment position="end">%</InputAdornment>,
                        type: 'number',
                      }}
                      {...field}
                      variant={inputPropsConstants.variantOutLine}
                      helperText={renderError([
                        { error: fieldState?.error?.type === 'required', message: 'Bạn chưa nhập trường này' },
                        {
                          error: fieldState?.error?.type === 'max' || fieldState?.error?.type === 'min',
                          message: 'Phần trăm phải có giá trị từ 1 tới 100',
                        },
                      ])}
                    />
                  )}
                />

                <Controller
                  name="maximumDiscount"
                  control={control}
                  rules={{ required: true, max: 1000000000000, min: 0.01 }}
                  render={({ field, fieldState }) => (
                    <TextField
                      color={fieldState.error ? 'warning' : 'info'}
                      size={inputPropsConstants.smallSize}
                      className={styles.voucherFormItem}
                      label="Giảm giá tối đa"
                      InputProps={{
                        endAdornment: <InputAdornment position="end">VNĐ</InputAdornment>,
                        type: 'number',
                      }}
                      {...field}
                      variant={inputPropsConstants.variantOutLine}
                      helperText={renderError([
                        { error: fieldState?.error?.type === 'required', message: 'Bạn chưa nhập trường này' },
                        {
                          error: fieldState?.error?.type === 'min',
                          message: 'Giảm giá phải có giá trị lớn hơn 0',
                        },
                        {
                          error: fieldState?.error?.type === 'max',
                          message: 'Giá trị giảm giá quá lớn',
                        },
                      ])}
                    />
                  )}
                />
              </Fragment>
            )}
            <Controller
              name="isUsageLimit"
              control={control}
              render={({ field }) => (
                <RadioGroup label="Lượt sử dụng mã giảm giá" {...field} className={styles.applyForProductWrapper} row>
                  <FormControlLabel
                    value={isUsageLimit.notLimit}
                    control={<Radio size={inputPropsConstants.smallSize} />}
                    label="Không giới hạn"
                  />
                  <FormControlLabel
                    value={isUsageLimit.limit}
                    control={<Radio size={inputPropsConstants.smallSize} />}
                    label="Giới hạn"
                  />
                </RadioGroup>
              )}
            />
            {Number(watch('isUsageLimit')) === isUsageLimit.limit ? (
              <Controller
                name="usageLimit"
                control={control}
                rules={{ required: true, min: 1, pattern: /^[1-9]\d*$/ }}
                render={({ field, fieldState }) => (
                  <TextField
                    focused={!!fieldState.error}
                    color={fieldState.error ? 'error' : 'info'}
                    size={inputPropsConstants.smallSize}
                    className={styles.voucherFormItem}
                    label="Số lượt sử dụng của mã giảm giá"
                    {...field}
                    variant={inputPropsConstants.variantOutLine}
                    InputProps={{
                      endAdornment: <InputAdornment position="end">Lượt</InputAdornment>,
                      type: 'number',
                    }}
                    helperText={renderError([
                      { error: fieldState?.error?.type === 'required', message: 'Bạn chưa nhập trường này' },
                      {
                        error: fieldState?.error?.type === 'min' || fieldState?.error?.type === 'pattern',
                        message: 'Số lượt giảm giá phải là số nguyên lớn hơn hoặc bằng 1',
                      },
                    ])}
                  />
                )}
              />
            ) : null}
            <Controller
              name="userUseMaximum"
              control={control}
              rules={{ required: true, min: 1, pattern: /^[1-9]\d*$/ }}
              render={({ field, fieldState }) => (
                <TextField
                  focused={!!fieldState.error}
                  color={fieldState.error ? 'error' : 'info'}
                  size={inputPropsConstants.smallSize}
                  className={styles.voucherFormItem}
                  label="Lượt sử dụng tối đa của mỗi khách hàng"
                  variant={inputPropsConstants.variantOutLine}
                  {...field}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">Lượt</InputAdornment>,
                    type: 'number',
                  }}
                  helperText={renderError([
                    { error: fieldState?.error?.type === 'required', message: 'Bạn chưa nhập trường này' },
                    {
                      error: fieldState?.error?.type === 'min' || fieldState?.error?.type === 'pattern',
                      message: 'Số lượt sử dụng phải là số nguyên lớn hơn hoặc bằng 1',
                    },
                  ])}
                />
              )}
            />
          </Card>
          <Card className={styles.voucherAction} sx={{ boxShadow: 3 }}>
            <Link to="/vouchers">
              <Button
                className={styles.cancelBtn}
                variant={inputPropsConstants.variantOutLine}
                startIcon={<i className="fas fa-mark" />}
              >
                Hủy
              </Button>
            </Link>
            <LoadingButton
              loading={loadingAdd}
              type="submit"
              variant={inputPropsConstants.variantContained}
              startIcon={<AddIcon />}
            >
              Lưu
            </LoadingButton>
          </Card>
        </form>
      </div>
    </div>
  );
}
