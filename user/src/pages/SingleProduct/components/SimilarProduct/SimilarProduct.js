import { Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';

import Product from '~/components/Product/Product';

export default function SimilarProduct({ similarProductRef }) {
    const similarProduct = useSelector((state) => state.similarProduct);
    const { loading, error, products } = similarProduct;
    return (
        <div className="col-12 mt-4" style={{ padding: '0px 0px' }}>
            <Typography ref={similarProductRef} variant="h6" className="mb-2 ">
                Sản phẩm tương tự
            </Typography>
            <div className="col-12 d-flex flex-wrap">
                {products.map((product) => (
                    <div
                        className={`col-lg-2 col-md-3 col-sm-6  mb-3`}
                        style={{
                            paddingLeft: 4,
                            paddingRight: 4,
                        }}
                        key={product._id}
                    >
                        <Product product={product} findSimilar={false} />
                    </div>
                ))}
            </div>
        </div>
    );
}
