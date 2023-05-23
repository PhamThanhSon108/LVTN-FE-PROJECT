import { React, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts, listProducts } from '../../Redux/Actions/ProductActions';
import TotalSales from './components/TotalSales/TotalSales';
import SaleStatistics from './components/SaleStatistics/SaleStatistics';
import ProductsStatistics from './components/ProductsStatistics/ProductsStatistics';
import LatestOrder from './components/LatestOrder/LatestOrder';
import { getSummary } from '../../Redux/Actions/SummaryAction';
import OrdersStatistics from './components/OrdersStatics/OrdersStatics';

const Dashboard = () => {
  const dispatch = useDispatch();
  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;
  const productList = useSelector((state) => state.productList);
  const { countProducts } = productList;
  const userList = useSelector((state) => state.userList);
  const { users } = userList;
  const { loadingGetAll, allProducts } = productList;

  const summaryReducer = useSelector((state) => state.summary);
  const { summary } = summaryReducer;
  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getSummary());
  }, [dispatch]);

  return (
    <>
      <section>
        <div className="content-header">
          <h2 className="content-title"> Dashboard </h2>
        </div>
        {/* Top Total */}
        <TotalSales
          totalOrder={summary?.totalOrder || 0}
          totalProduct={summary?.totalProduct || 0}
          totalUser={summary?.totalUser || 0}
          totalRevenue={summary?.totalRevenue || 0}
        />
        <div className="row">
          {/* STATICS */}
          <div className="col-4">
            <SaleStatistics />
          </div>
          <div className="col-4">
            <OrdersStatistics />
          </div>
          <div className="col-4">
            <ProductsStatistics />
          </div>
        </div>

        {/* LATEST ORDER */}
        {/* <div className="card mb-4 shadow-sm">
          <LatestOrder orders={orders} loading={loading} error={error} />
        </div> */}
      </section>
    </>
  );
};

export default Dashboard;
