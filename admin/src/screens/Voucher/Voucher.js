import React from 'react';
import styles from './Voucher.module.scss';
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  InputAdornment,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Pagination,
  Select,
  TextField,
  Tooltip,
} from '@mui/material';
import useVoucher from './hook/useVoucher';
import { inputPropsConstants } from '../../constants/variants';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
export default function Voucher() {
  const { control, watch, handleSubmit, handleCreateVoucher } = useVoucher();
  return (
    <div className={styles.voucherContainer}>
      <div className={styles.header}>
        <h2 className={styles.title}>Danh sách mã giảm giá</h2>
        <Link to="/vouchers/add">
          <Button type="submit" variant={inputPropsConstants.variantContained} startIcon={<AddIcon />}>
            Tạo mã
          </Button>
        </Link>
      </div>
      <Card className={styles.voucherListWrapper}>
        <CardHeader
          className={styles.vouchersHeader}
          avatar={
            <div className={styles.vouchersHeaderFilter}>
              <TextField
                className={styles.searchVouchers}
                label="Tìm kiếm sản phẩm"
                size={inputPropsConstants.smallSize}
                variant={inputPropsConstants.variantOutLine}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <i className="fas fa-search" />
                    </InputAdornment>
                  ),
                }}
              />
              <Select
                className={styles.searchVouchers}
                size={inputPropsConstants.smallSize}
                placeholder="Chọn thể loại"
              >
                <MenuItem value="-1">Tất cả thể loại</MenuItem>
                {/* {categories.map((category) => (
                  <MenuItem value={category?._id}>{category?.name || ''}</MenuItem>
                ))} */}
              </Select>
            </div>
          }
        />
        <Divider />

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
          {[1, 2, 3, 4].map((value) => {
            const labelId = `transfer-list-all-item-${value}-label`;

            return (
              <ListItem key={value} role="listitem" button>
                <ListItemAvatar>
                  <Avatar alt={value?.name} src={value?.images?.[0]} />
                </ListItemAvatar>
                <ListItemText id={labelId} primary={value?.name || 'Tên sản phẩm'} />
                <ListItemText id={labelId} primary={value?.category?.name || 'Thể loại sản phẩm'} />
                <ListItemText id={labelId} primary={value?.price + ' VNĐ' || 'Giá sản phẩm'} />
                <ListItemIcon>
                  <div className={`${styles.actionEachVoucher} ${styles.actionEditVoucher}`}>
                    <Tooltip title="Chỉnh sửa mã giảm giá">
                      <i className="fas fa-pencil color-red" />
                    </Tooltip>
                  </div>
                  <div className={`${styles.actionEachVoucher} ${styles.actionDeleteVoucher}`}>
                    <Tooltip title="Xóa mã giảm giá">
                      <i className="fas fa-trash-alt color-red" />
                    </Tooltip>
                  </div>
                </ListItemIcon>
              </ListItem>
            );
          })}
        </List>
        <CardActions className={styles.pagination}>
          <Pagination variant="outlined" shape="rounded" />
        </CardActions>
      </Card>
    </div>
  );
}
