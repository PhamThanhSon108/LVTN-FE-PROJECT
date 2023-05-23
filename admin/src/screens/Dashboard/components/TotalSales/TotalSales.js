import React from 'react';
import { formatMoney } from '../../../../utils/formatMoney';
import PersonIcon from '@mui/icons-material/Person';
import CategoryIcon from '@mui/icons-material/Category';
const TotalSales = (props) => {
  const { totalOrder, totalProduct, totalUser, totalRevenue } = props;
  let totalSale = 0;

  return (
    <div className="row">
      <div className="col-lg-3">
        <div className="card card-body mb-4 shadow-sm">
          <article className="icontext">
            <span className="icon icon-sm rounded-circle alert-primary">
              <i className="text-primary fas fa-usd-circle"></i>
            </span>
            <div className="text">
              <h6 className="mb-1">Tổng doanh thu</h6> <span>{formatMoney(totalRevenue || 0) || 0}</span>
            </div>
          </article>
        </div>
      </div>
      <div className="col-lg-3">
        <div className="card card-body mb-4 shadow-sm">
          <article className="icontext">
            <span className="icon icon-sm rounded-circle alert-success">
              <i className="text-success fas fa-bags-shopping"></i>
            </span>
            <div className="text">
              <h6 className="mb-1">Tổng số đơn</h6>
              <span>{totalOrder}</span>
            </div>
          </article>
        </div>
      </div>
      <div className="col-lg-3">
        <div className="card card-body mb-4 shadow-sm">
          <article className="icontext">
            <span className="icon icon-sm rounded-circle alert-warning">
              <i className="text-warning fas fa-product"></i>
              <CategoryIcon className="text-warning" />
            </span>
            <div className="text">
              <h6 className="mb-1">Tổng số sản phẩm</h6>
              <span>{totalProduct}</span>
            </div>
          </article>
        </div>
      </div>
      <div className="col-lg-3">
        <div className="card card-body mb-4 shadow-sm">
          <article className="icontext">
            <span className="icon icon-sm rounded-circle alert-secondary">
              <i className="text-warning fas fa-fa-user"></i>
              <PersonIcon className="text" />
            </span>
            <div className="text">
              <h6 className="mb-1">Tổng số người dùng</h6>
              <span>{totalUser}</span>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};

export default TotalSales;
