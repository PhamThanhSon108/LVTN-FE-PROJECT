import React from 'react';
import { formatMoney } from '../../../../utils/formatMoney';

const TotalSales = (props) => {
  const { orders, countProducts } = props;
  let totalSale = 0;
  if (orders) {
    orders?.orders?.reduce((totalSale, order) => {
      if (order.status === 'Completed') return totalSale + order.totalPrice;
      return totalSale;
    }, 0);
  }
  return (
    <div className="row">
      <div className="col-lg-4">
        <div className="card card-body mb-4 shadow-sm">
          <article className="icontext">
            <span className="icon icon-sm rounded-circle alert-primary">
              <i className="text-primary fas fa-usd-circle"></i>
            </span>
            <div className="text">
              <h6 className="mb-1">Tổng doanh thu</h6> <span>{formatMoney(totalSale) || 0}</span>
            </div>
          </article>
        </div>
      </div>
      <div className="col-lg-4">
        <div className="card card-body mb-4 shadow-sm">
          <article className="icontext">
            <span className="icon icon-sm rounded-circle alert-success">
              <i className="text-success fas fa-bags-shopping"></i>
            </span>
            <div className="text">
              <h6 className="mb-1">Tổng số đơn</h6>
              {orders ? <span>{orders?.orders?.length || 0}</span> : <span>0</span>}
            </div>
          </article>
        </div>
      </div>
      <div className="col-lg-4">
        <div className="card card-body mb-4 shadow-sm">
          <article className="icontext">
            <span className="icon icon-sm rounded-circle alert-warning">
              <i className="text-warning fas fa-shopping-basket"></i>
            </span>
            <div className="text">
              <h6 className="mb-1">Tổng số sản phẩm</h6>
              {countProducts ? <span>{countProducts}</span> : <span>0</span>}
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};

export default TotalSales;
