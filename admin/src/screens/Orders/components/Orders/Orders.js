import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { statusDescription } from '../../../../constants/ordersConstants';
import { formatMoney } from '../../../../utils/formatMoney';

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
          {orders?.orders?.length === 0 && <tr className="">Không có đơn hàng nào</tr>}
          {orders?.orders?.map((order) => {
            const status = order.statusHistory?.at(-1)?.status || order?.status;
            return (
              <tr key={order._id}>
                <td>
                  <b>{order?.username}</b>
                </td>
                <td>{order?.paymentInformation?.paymentMethod === '2' ? 'Momo' : 'Tiền mặt'}</td>
                <td>{formatMoney(order?.totalPayment || 0)}</td>
                <td>{moment(order.createdAt).format('hh:mm MM/DD/YYYY')}</td>
                <td style={{ position: 'relative' }}>
                  {status === 'placed' && (
                    <div
                      style={{
                        position: 'absolute',
                        left: '7px',
                        top: '2px',
                        borderRadius: '50%',
                        fontSize: '0.6rem',
                        display: 'block',
                        backgroundColor: 'red',
                        color: 'white',
                        height: '1.2rem',
                        width: '1.2rem',
                        lineHeight: '1.15rem',
                      }}
                    >
                      Mới
                    </div>
                  )}
                  <span
                    className={`badge rounded-pill 
                     ${status === 'paid' && 'alert-primary'}

                     ${status === 'completed' && 'alert-success'}
                      ${status === 'cancelled' && 'bg-dark text-white'}
                       ${status === 'failed' && 'bg-danger text-white'}
                      text-dark`}
                    style={{ fontSize: '15px' }}
                  >
                    {statusDescription[status]}
                  </span>
                </td>
                <td className="d-flex justify-content-end align-item-center">
                  <Link to={`/orders/${order._id}`} className="text-success">
                    <i className="fas fa-eye"></i>
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
