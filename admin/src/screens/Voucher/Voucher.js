import React from 'react';
import styles from './Voucher.module.scss';
import Typography from '@material-ui/core/Typography';
import { Card, Input, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import useVoucher from './hook/useVoucher';
import { Controller } from 'react-hook-form';
import { inputPropsConstants } from '../../constants/variants';

export default function Voucher() {
  const { control, handleSubmit, handleCreateVoucher } = useVoucher();
  return (
    <div className={styles.voucherContainer}>
      <Typography className={styles.title}>Tạo mã giảm giá mới</Typography>
      <Card className={styles.voucherWrapper}>
        <h2>Thông tin cơ bản</h2>
        <form className={styles.voucherForm} onSubmit={handleSubmit(handleCreateVoucher)}>
          <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              <TextField
                className={styles.voucherFormItem}
                label="Tên chương trình giảm giá"
                {...field}
                variant={inputPropsConstants.variantOutLine}
                size={inputPropsConstants.smallSize}
              />
            )}
          />
          <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              <TextField
                className={styles.voucherFormItem}
                label="Mã voucher"
                {...field}
                variant={inputPropsConstants.variantOutLine}
                size={inputPropsConstants.smallSize}
              />
            )}
          />

          <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              <TextField
                className={styles.voucherFormItem}
                select
                label="Loại giảm giá"
                {...field}
                variant={inputPropsConstants.variantOutLine}
                size={inputPropsConstants.smallSize}
              >
                <option value="price">Giá cố định</option>
                <option value="percent">Theo %</option>
                <option value="percent">Theo %</option>
              </TextField>
            )}
          />

          <Controller
            name="startDate"
            control={control}
            render={({ field }) => (
              <TextField
                className={styles.voucherFormItem}
                select
                label="Loại giảm giá"
                {...field}
                variant={inputPropsConstants.variantOutLine}
                size={inputPropsConstants.smallSize}
              >
                <option value="price">Giá cố định</option>
                <option value="percent">Theo %</option>
                <option value="percent">Theo %</option>
              </TextField>
            )}
          />

          <Controller
            name="startDate"
            control={control}
            render={({ field }) => (
              <TextField
                className={styles.voucherFormItem}
                select
                label="Loại giảm giá"
                {...field}
                variant={inputPropsConstants.variantOutLine}
                size={inputPropsConstants.smallSize}
              >
                <option value="price">Giá cố định</option>
                <option value="percent">Theo %</option>
                <option value="percent">Theo %</option>
              </TextField>
            )}
          />

          <Select
            size={inputPropsConstants.smallSize}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Age"
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
          <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              <TextField
                size={inputPropsConstants.smallSize}
                className={styles.voucherFormItem}
                label="Tổng số lượt sử dụng tối đa"
                {...field}
                variant={inputPropsConstants.variantOutLine}
              />
            )}
          />

          <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              <TextField
                size={inputPropsConstants.smallSize}
                className={styles.voucherFormItem}
                label="Lượt sử dụng tối đa/ người mua"
                {...field}
                variant={inputPropsConstants.variantOutLine}
              />
            )}
          />
        </form>
      </Card>
    </div>
  );
}
