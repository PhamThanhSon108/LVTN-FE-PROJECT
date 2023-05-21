import { Alert, CircularProgress, Typography } from '@mui/material';
import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';

import Product from '~/components/Product/Product';

const MainSection = ({ children, similarProductRef }) => {
    return (
        <div className="col-12 mt-4" style={{ padding: '0px 0px' }}>
            <Typography ref={similarProductRef} variant="h6" className="mb-2 ">
                Sản phẩm tương tự
            </Typography>
            {children}
        </div>
    );
};

export default function SimilarProduct({ similarProductRef }) {
    const similarProduct = useSelector((state) => state.similarProduct);
    const { loading, error, products } = similarProduct;
    if (loading)
        return (
            <MainSection similarProductRef={similarProductRef}>
                <div style={{ height: '289px', width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress />
                </div>
            </MainSection>
        );

    if (error)
        return (
            <MainSection similarProductRef={similarProductRef}>
                <Alert severity="error">Có lỗi trong quá trình xử lý</Alert>
            </MainSection>
        );

    if (products?.length === 0)
        return (
            <MainSection similarProductRef={similarProductRef}>
                <Alert severity="warning">Không tìm thấy sản phẩm tương tự nào</Alert>
            </MainSection>
        );

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
