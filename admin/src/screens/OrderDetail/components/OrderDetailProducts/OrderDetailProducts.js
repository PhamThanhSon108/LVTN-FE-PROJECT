import React from 'react';
import { Link } from 'react-router-dom';
import { statusDescription, stepShipping } from '../../../../constants/ordersConstants';
import { formatMoney } from '../../../../utils/formatMoney';
import { Badge, Chip } from '@mui/material';

const OrderDetailProducts = (props) => {
  const { order, loading } = props;
  const itemsPrice = 0;
  const statusOfOrder = order?.statusHistory?.at(-1)?.status || order?.status;
  if (!loading) {
    // Calculate Price
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };
    if (order) order.itemsPrice = 0;
  }

  return (
    <>
      <table className="table border table-lg">
        <thead>
          <tr>
            <th style={{ width: '40%' }}>Sản phẩm</th>
            <th style={{ width: '15%' }}>Giá / Sản phẩm</th>

            <th style={{ width: '20%' }}>Phân loại hàng</th>
            <th style={{ width: '15%' }}>Số lượng</th>
            <th style={{ width: '10%' }} className="text-end">
              Tổng
            </th>
          </tr>
        </thead>
        <tbody>
          {order?.orderItems?.map((item, index) => (
            <tr key={index}>
              <td>
                <Link className="itemside" to="#">
                  <div className="left">
                    <img
                      src={item?.image}
                      alt={item?.name}
                      style={{ width: '40px', height: '40px' }}
                      className="img-xs"
                    />
                  </div>
                  <div className="info">{item?.name}</div>
                </Link>
              </td>
              <td>{formatMoney(item?.price || 0)} </td>
              <td>
                {item?.attributes?.[0]?.value}, {item?.attributes?.[1]?.value}{' '}
              </td>

              <td>{item?.quantity || 0} </td>
              <td className="text-end"> {formatMoney(item?.quantity * item?.price || 0)}</td>
            </tr>
          ))}

          <tr>
            <td colSpan="8">
              <article className="float-end">
                <dl className="dlist">
                  <dt className="text-muted">Trạng thái:</dt>
                  <dd>
                    <Badge badgeContent={order?.status === 'placed' ? 'Mới' : null} color="error">
                      <Chip
                        size="medium"
                        color={stepShipping[order?.status]?.color || 'default'}
                        variant="filled"
                        label={stepShipping[order?.status]?.labelActive || ''}
                      />
                    </Badge>
                  </dd>
                </dl>
              </article>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default OrderDetailProducts;
