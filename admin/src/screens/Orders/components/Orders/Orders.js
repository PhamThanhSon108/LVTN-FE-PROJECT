import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { statusDescription, stepShipping } from '../../../../constants/ordersConstants';
import { formatMoney } from '../../../../utils/formatMoney';
import { Badge, Chip, Tooltip, Typography } from '@mui/material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
const Orders = (props) => {
  const { orders } = props;

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Tên</th>
            <th scope="col">Thanh toán</th>
            <th scope="col">Tổng thanh toán</th>
            <th scope="col">Ngày đặt</th>
            <th>Trạng thái</th>
            <th scope="col" className="text-end"></th>
          </tr>
        </thead>
        <tbody>
          {orders?.orders?.length === 0 && (
            <tr className="" style={{ height: '150px' }}>
              Không có đơn hàng nào
            </tr>
          )}
          {orders?.orders?.map((order) => {
            const status = order?.statusHistory?.at(-1)?.status || order?.status;
            return (
              <tr key={order._id}>
                <td className="col-2">
                  <Typography noWrap variant="body1">
                    {order?.username}
                  </Typography>
                </td>
                <td>{order?.paymentInformation?.paymentMethod === '2' ? 'Momo' : 'Tiền mặt'}</td>
                <td>
                  <Typography variant="body1" color="error">
                    {formatMoney(order?.totalPayment || 0)}
                  </Typography>
                </td>
                <td>
                  <Typography noWrap variant="body1">
                    {moment(order.createdAt).format('hh:mm MM/DD/YYYY')}
                  </Typography>
                </td>
                <td style={{ position: 'relative' }}>
                  <Badge badgeContent={order?.status === 'placed' ? 'Mới' : null} color="error">
                    <Chip
                      size="small"
                      color={stepShipping[status]?.color || 'default'}
                      variant="outlined"
                      label={stepShipping[status]?.labelActive || ''}
                    />
                  </Badge>
                </td>
                <td className="d-flex justify-content-end align-item-center">
                  <Link to={`/orders/${order._id}`} className="text-success">
                    <Tooltip title="Xem chi tiết đơn hàng">
                      <RemoveRedEyeIcon color="primary" />
                    </Tooltip>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* <Pagination pages={pages} page={page}  keyword={keyword ? keyword : ''} /> */}
    </>
  );
};

export default Orders;
