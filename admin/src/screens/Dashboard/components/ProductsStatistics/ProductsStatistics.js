import React from 'react';

const ProductsStatistics = () => {
  return (
    <div className="col-xl-12 col-lg-12">
      <div className="card mb-4 shadow-sm">
        <article className="card-body" style={{ boxShadow: 'none' }}>
          <iframe
            title="productsStatistic"
            style={{
              background: '#FFFFFF',
              border: 'none',
              borderRadius: '2px',
              // boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)',
              width: '100%',
              height: '350px',
            }}
            src="https://charts.mongodb.com/charts-fashionshop-soddq/embed/charts?id=646984bc-a471-4224-8c8c-ad936c8895b0&maxDataAge=300&theme=light&autoRefresh=true"
          ></iframe>
        </article>
      </div>
    </div>
  );
};

export default ProductsStatistics;
