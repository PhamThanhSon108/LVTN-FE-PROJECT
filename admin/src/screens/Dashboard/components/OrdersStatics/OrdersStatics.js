import React from 'react';

const OrdersStatistics = () => {
  return (
    <div className="col-xl-12 col-lg-12">
      <div className="card mb-4 shadow-sm">
        <article className="card-body" style={{ boxShadow: 'none' }}>
          <iframe
            title="OrdersStatistic"
            style={{
              background: '#FFFFFF',
              border: 'none',
              borderRadius: '2px',
              // boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)',
              width: '100%',
              height: '350px',
            }}
            src="https://charts.mongodb.com/charts-fashionshop-soddq/embed/charts?id=727925e8-9815-49b5-9ce2-a628f9c0eff0&maxDataAge=1800&theme=light&autoRefresh=true"
          ></iframe>
        </article>
      </div>
    </div>
  );
};

export default OrdersStatistics;
