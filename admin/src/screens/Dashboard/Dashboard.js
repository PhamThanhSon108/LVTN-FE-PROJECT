import { React, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../../Redux/Actions/ProductActions';
import TotalSales from './components/TotalSales/TotalSales';
import SaleStatistics from './components/SaleStatistics/SaleStatistics';
import ProductsStatistics from './components/ProductsStatistics/ProductsStatistics';
import LatestOrder from './components/LatestOrder/LatestOrder';

const Dashboard = () => {
  const dispatch = useDispatch();
  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;
  const productList = useSelector((state) => state.productList);
  const { countProducts } = productList;
  const userList = useSelector((state) => state.userList);
  const { users } = userList;
  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <>
      <section>
        <div className="content-header">
          <h2 className="content-title"> Dashboard </h2>
        </div>
        {/* Top Total */}
        <TotalSales orders={orders} countProducts={countProducts} countUsers={users ? users.length : 0} />

        <div className="row">
          {/* STATICS */}
          <SaleStatistics />
          <ProductsStatistics />
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
