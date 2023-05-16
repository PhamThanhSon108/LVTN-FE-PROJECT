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
  LinearProgress,
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
import moment from 'moment';
import { formatMoney } from '../../utils/formatMoney';
export default function Voucher() {
  const { vouchers, loading } = useVoucher();
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
      <div style={{ height: 2.5 }}>
        {loading ? (
          <LinearProgress sx={{ borderTopLeftRadius: 50, borderTopRightRadius: 50, height: '2.5px' }} />
        ) : null}
      </div>
      <Card className={styles.voucherListWrapper}>
        <CardHeader
          className={styles.vouchersHeader}
          avatar={
            <div className={styles.vouchersHeaderFilter}>
              <TextField
                className={styles.searchVouchers}
                label="Tìm kiếm voucher"
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
          {vouchers?.map((value) => {
            const labelId = `transfer-list-all-item-${value}-label`;

            return (
              <ListItem key={value} role="listitem" button>
                <ListItemAvatar>
                  <Avatar alt={value?.name} src={'/images/voucherTemplate.jpg'} />
                </ListItemAvatar>
                <ListItemText className="col-2" id={labelId} primary={value?.code || 'Mã code'} />

                <ListItemText
                  className="col-3"
                  id={labelId}
                  primary={`${value?.used || 'Đã sử dụng'} / ${
                    value?.isUsageLimit ? value?.usageLimit : 'Không giới hạn'
                  }`}
                />

                <ListItemText
                  className="col-3"
                  id={labelId}
                  primary={value?.discountType === '1' ? formatMoney(value?.discount) : value?.discount + ' %'}
                />
                <ListItemText
                  className="col-3"
                  id={labelId}
                  primary={`${moment(value?.startDate).format('HH:MM DD/MM/YYYY')} - ${moment(value?.endDate).format(
                    'HH:MM DD/MM/YYYY',
                  )}`}
                />
                <ListItemIcon>
                  <div className={`${styles.actionEachVoucher} ${styles.actionEditVoucher}`}>
                    <Link to={`/vouchers/${value?._id}/edit`}>
                      <Tooltip title="Chỉnh sửa mã giảm giá">
                        <i className="fas fa-pencil color-red" />
                      </Tooltip>
                    </Link>
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
        {/* <CardActions className={styles.pagination}>
          <Pagination variant="outlined" shape="rounded" />
        </CardActions> */}
      </Card>
    </div>
  );
}
