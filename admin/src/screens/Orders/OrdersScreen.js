import React, { useEffect, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { listOrders } from '../../Redux/Actions/OrderActions';
import Loading from '../../components/LoadingError/Loading';
import Message from '../../components/LoadingError/Error';
import Orders from './components/Orders/Orders';
import { dateFilter, statusFilter } from '../../constants/ordersConstants';
import { Pagination } from '@mui/material';

const OrdersScreen = (props) => {
  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;
  const dispatch = useDispatch();

  const [dateOrder, setDateOrder] = useState('');
  const [orderStatus, setOrderStatus] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const handleOrderStatus = (e) => {
    setOrderStatus(e.target.value);
  };

  const handleDateOrder = (e) => {
    setDateOrder(e.target.value);
  };
  useEffect(() => {
    setPageNumber('1');
  }, [orderStatus, dateOrder]);
  useEffect(() => {
    dispatch(listOrders(dateOrder, orderStatus, pageNumber));
  }, [dispatch, orderStatus, dateOrder, pageNumber]);
  return (
    <section>
      <div className="content-header">
        <h2 className="content-title">Danh sách đơn hàng</h2>
      </div>

      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <div className="row d-flex justify-content-end">
            <div className="col-lg-2 col-6 col-md-3" style={{ marginBottom: '5px' }}>
              <select className="form-select" value={dateOrder} onChange={handleDateOrder}>
                {dateFilter?.map((item) => (
                  <option value={item.status}>{item.description}</option>
                ))}
              </select>
            </div>
            <div className="col-lg-2 col-6 col-md-3" style={{ marginBottom: '5px' }}>
              <select className="form-select" value={orderStatus} onChange={handleOrderStatus}>
                {statusFilter?.map((item) => (
                  <option value={item.status}>{item.description}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="table-responsive">
            {loading ? (
              <Loading />
            ) : error ? (
              <Message variant="alert-danger">{error}</Message>
            ) : (
              <Orders orders={orders} />
            )}
          </div>
        </div>
      </div>
      {!loading && (
        <div className="col-12 d-flex justify-center" style={{ display: 'flex', justifyContent: 'center' }}>
          <nav aria-label="...">
            <ul class="pagination">
              <Pagination
                color="primary"
                defaultPage={pageNumber || 1}
                count={orders?.pages}
                onChange={(e, page) => {
                  setPageNumber(page);
                }}
              />
            </ul>
          </nav>
        </div>
      )}
    </section>
  );
};

export default OrdersScreen;
