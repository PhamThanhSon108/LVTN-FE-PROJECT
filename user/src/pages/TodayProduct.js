import React, { Suspense } from 'react';
import Header from '../components/Header';
import ShopSection from '../components/homeComponents/ShopSection';
import Footer from '../components/Footer';
import { CircularProgress } from '@mui/material';
import '../components/styles.scss';
import TodayProductSection from '~/components/homeComponents/TodayProductSection';
const Loading = () => {
    return (
        <>
            <CircularProgress className="loading__main" />
        </>
    );
};
const TodayProduct = ({ match }) => {
    window.scrollTo(0, 0);
    const keyword = match.params.keyword;
    const pageNumber = match.params.pageNumber;
    // const category = match.params.category;

    return (
        <Suspense fallback={<Loading></Loading>}>
            <div>
                <Header keyword={keyword} />
                <TodayProductSection keyword={keyword} pageNumber={pageNumber} />
                <Footer />
            </div>
        </Suspense>
    );
};

export default TodayProduct;
