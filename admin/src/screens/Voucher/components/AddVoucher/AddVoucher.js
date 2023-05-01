import React, { Fragment } from 'react';
import styles from './AddVoucher.module.scss';
import { Button, Card, FormControlLabel, InputAdornment, Radio, RadioGroup, TextField } from '@mui/material';
import { MultiInputDateTimeRangeField } from '@mui/x-date-pickers-pro';
import { Controller } from 'react-hook-form';

import { Link } from 'react-router-dom';
import moment from 'moment';
import useAddVoucher from './hook/useAddVoucher';
import AddProductToVoucher from '../AddProductToVoucher/AddProductToVoucher';
import { inputPropsConstants } from '../../../../constants/variants';
import { renderError } from '../../../../utils/errorMessage';
import AddIcon from '@mui/icons-material/Add';

const applyVoucherFor = {
  allProducts: '1',
  selectedProducts: '2',
};

const voucherType = {
  price: 'price',
  percent: 'percent',
};

const DEFAULT_STEP_USABLE_VOUCHER = 7;

export default function AddVoucher() {
  const { control, watch, handleSubmit, handleCreateVoucher } = useAddVoucher();
  return (
    <div className={styles.voucherContainer}>
      <Card className={styles.voucherWrapper}>
        <div className={styles.header}>
          <Link to="/vouchers" className={styles.backBtn}>
            <i className="fas fa-arrow-left" />
          </Link>
          <h2 className={styles.title}>Tạo Mã giảm giá</h2>
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
              rules={{ required: true }}
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
                  ])}
                />
              )}
            />

            <Controller
              name="applyTime"
              control={control}
              render={({ field }) => (
                <MultiInputDateTimeRangeField
                  {...field}
                  size={inputPropsConstants.smallSize}
                  defaultValue={[moment(), moment().add(DEFAULT_STEP_USABLE_VOUCHER, 'days')]}
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
              defaultValue={applyVoucherFor.selectedProducts}
              control={control}
              render={({ field }) => (
                <RadioGroup {...field} row className={styles.applyForProductWrapper}>
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

            {watch('applyFor') === applyVoucherFor.selectedProducts ? <AddProductToVoucher /> : null}
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
                  defaultValue={voucherType.price}
                  row
                >
                  <FormControlLabel
                    value={voucherType.price}
                    control={<Radio size={inputPropsConstants.smallSize} />}
                    label="Giá cố định"
                  />
                  <FormControlLabel
                    value={voucherType.percent}
                    control={<Radio size={inputPropsConstants.smallSize} />}
                    label="Theo %"
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
                        type: 'number',
                        endAdornment: <InputAdornment position="end">VNĐ</InputAdornment>,
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
              <Controller
                name="discount"
                rules={{ required: true, max: 100, min: 0 }}
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    focused={!!fieldState.error}
                    color={fieldState.error ? 'error' : 'info'}
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
                        message: 'Phần trăm phải có giá trị từ 0 tới 100',
                      },
                    ])}
                  />
                )}
              />
            )}

            <Controller
              name="usageLimit"
              control={control}
              rules={{ required: true, max: 100, min: 0, pattern: /^[1-9]\d*$/ }}
              render={({ field, fieldState }) => (
                <TextField
                  focused={!!fieldState.error}
                  color={fieldState.error ? 'error' : 'info'}
                  size={inputPropsConstants.smallSize}
                  className={styles.voucherFormItem}
                  label="Tổng số lượt sử dụng tối đa"
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
                      message: 'Số lượt giảm giá phải là số nguyên lớn hơn 0',
                    },
                  ])}
                />
              )}
            />

            <Controller
              name="usageLimitPer"
              control={control}
              render={({ field }) => (
                <TextField
                  size={inputPropsConstants.smallSize}
                  className={styles.voucherFormItem}
                  label="Lượt sử dụng tối đa/ người mua"
                  value="1"
                  variant={inputPropsConstants.variantOutLine}
                  disabled
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
            <Button type="submit" variant={inputPropsConstants.variantContained} startIcon={<AddIcon />}>
              Tạo mã
            </Button>
          </Card>
        </form>
      </Card>
    </div>
  );
}
