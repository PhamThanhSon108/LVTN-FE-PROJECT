import React, { Suspense } from 'react';
import Header from '../../components/Header';
import ContactInfo from '../../components/homeComponents/ContactInfo';
import CalltoActionSection from '../../components/homeComponents/CalltoActionSection';
import Footer from '../../components/Footer';
import { CircularProgress } from '@mui/material';

import useQuery from '~/hooks/useQuery';

import './HomeScreen.scss';
import CategorySlider from './components/CategorySlider/CategorySlider';
import ShopSection from './components/ShopSection';
import Vouchers from './components/Vouchers/Vouchers';

const NewProductRecommend = React.lazy(() => import('../../components/SlideCorousel/NewProductRecommend'));
const CorouselOder = React.lazy(() => import('../../components/SlideCorousel/CourouselOder'));

const Sliders = React.lazy(() => import('../../components/Sliders'));
const Loading = () => {
    return (
        <>
            <CircularProgress className="loading__main" />
        </>
    );
};

const HomeScreen = () => {
    window.scrollTo(0, 0);
    const query = useQuery();
    const category = query.get('category') || '';
    const keyword = query.get('keyword') || '';
    const pageNumber = query.get('page');
    // const category = match.params.category;

    return (
        <Suspense fallback={<Loading></Loading>}>
            <div className="wrap-homescreen">
                <div className="wrap-homescreen-products">
                    {!category && !keyword ? <Sliders /> : null}
                    {!category && !keyword && <CategorySlider />}
                    {!category && !keyword ? <NewProductRecommend /> : null}
                    {!category && !keyword && <Vouchers />}
                    {!category && !keyword ? <CorouselOder /> : null}
                    <ShopSection keyword={keyword} pageNumber={pageNumber} queryCategory={category} />
                </div>

                <CalltoActionSection />
                <ContactInfo />
                <Footer />
            </div>
        </Suspense>
    );
};

export default HomeScreen;
