import React, { useEffect, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { listOrders } from '../../Redux/Actions/OrderActions';
import Loading from '../../components/LoadingError/Loading';
import Message from '../../components/LoadingError/Error';
import Orders from './components/Orders/Orders';
import { dateFilter, statusFilter } from '../../constants/ordersConstants';
import { CircularProgress, Divider, Pagination } from '@mui/material';
import { useHistory, useLocation } from 'react-router-dom';

const OrdersScreen = (props) => {
  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;
  const dispatch = useDispatch();

  let history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [page] = useState(searchParams.get('page') || 1);

  const [dateOrder] = useState(searchParams.get('sort-by-date') || '');
  const [orderStatus] = useState(searchParams.get('status') || '');

  const handleOrderStatus = (e) => {
    if (e.target.value !== undefined) {
      searchParams.set('status', e.target.value);
      searchParams.set('page', 1);
      history.replace(`?${searchParams.toString()}`);
    }
  };

  const handleDateOrder = (e) => {
    if (e.target.value !== undefined) {
      searchParams.set('sort-by-date', e.target.value);
      searchParams.set('page', 1);
      history.replace(`?${searchParams.toString()}`);
    }
  };

  const handleChangePage = (page) => {
    if (page !== searchParams.get('page')) searchParams.set('page', page);
    history.replace(`?${searchParams.toString()}`);
  };

  useEffect(() => {
    dispatch(listOrders({ page: page - 1, orderStatus, dateOrder }));
  }, [dispatch]);
  return (
    <section>
      <div className="content-header">
        <h2 className="content-title">Danh sách đơn hàng</h2>
      </div>

      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <div className="row d-flex justify-content-end mb-2">
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
          <Divider />
          <div className="table-responsive" style={{ minHeight: '15rem' }}>
            {loading ? (
              <div className="col-12 d-flex justify-content-center mt-3">
                <CircularProgress />
              </div>
            ) : error ? (
              <Message variant="alert-danger mt-2">Không tìm thấy đơn hàng nào</Message>
            ) : (
              <Orders orders={orders} />
            )}
            {!loading && (
              <div className="col-12 d-flex justify-center" style={{ display: 'flex', justifyContent: 'end' }}>
                <nav aria-label="...">
                  <ul class="pagination">
                    <Pagination
                      color="primary"
                      page={orders?.page + 1 || page}
                      count={orders?.pages}
                      onChange={(e, page) => {
                        handleChangePage(page);
                      }}
                    />
                  </ul>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrdersScreen;
