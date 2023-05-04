import React, { Suspense } from 'react';

import { CircularProgress } from '@mui/material';
import '../components/styles.scss';
const Loading = () => {
    return (
        <>
            <CircularProgress className="loading__main" />
        </>
    );
};
const TodayProduct = () => {
    window.scrollTo(0, 0);

    // const category = match.params.category;

    return <Suspense fallback={<Loading></Loading>}>{/* <TodayProduct /> */}</Suspense>;
};

export default TodayProduct;
