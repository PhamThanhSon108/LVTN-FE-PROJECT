import React from 'react';
import styles from './Voucher.module.scss';
import { Button, Card, Divider, FormControlLabel, MenuItem, Radio, RadioGroup, Select, TextField } from '@mui/material';
import { MultiInputDateTimeRangeField } from '@mui/x-date-pickers-pro';
import useVoucher from './hook/useVoucher';
import { Controller } from 'react-hook-form';
import { inputPropsConstants } from '../../constants/variants';
import AddProductToVoucher from './components/AddProductToVoucher/AddProductToVoucher';

const applyVoucherFor = {
  allProducts: '1',
  selectedProducts: '2',
};

export default function Voucher() {
  const { control, watch, handleSubmit, handleCreateVoucher } = useVoucher();
  return (
    <div className={styles.voucherContainer}>
      <Card className={styles.voucherWrapper}>
        <h2 className={styles.title}>Tạo Mã giảm giá</h2>
        <form className={styles.voucherForm} onSubmit={handleSubmit(handleCreateVoucher)}>
          <Controller
            name="name"
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
            rules={[{ required: true, message: 'Bạn chưa nhập trường này' }]}
            name="code"
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
            name="applyTime"
            control={control}
            render={({ field }) => (
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
          <Divider className={styles.divider} />
          <Controller
            name="discountType"
            control={control}
            render={({ field }) => (
              <RadioGroup
                label="Loại giảm giá"
                placeholder="Chọn thể loại"
                {...field}
                className={styles.applyForProductWrapper}
                defaultValue="price"
                row
              >
                <FormControlLabel
                  value="price"
                  control={<Radio size={inputPropsConstants.smallSize} />}
                  label="Giá cố định"
                />
                <FormControlLabel
                  value="percent"
                  control={<Radio size={inputPropsConstants.smallSize} />}
                  label="Theo %"
                />
              </RadioGroup>
            )}
          />

          <Controller
            name="usageLimit"
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
          <Divider className={styles.divider} />
          <Button type="submit">Tạo mã</Button>
        </form>
      </Card>
    </div>
  );
}
