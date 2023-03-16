import React, { Suspense } from 'react';
import Header from '../components/Header';
import ShopSection from '../components/homeComponents/ShopSection';
import ContactInfo from '../components/homeComponents/ContactInfo';
import CalltoActionSection from '../components/homeComponents/CalltoActionSection';
import Footer from '../components/Footer';
import { CircularProgress } from '@mui/material';
import CategorySlider from '~/components/SlideCorousel/CategorySlider';
import useQuery from '~/hooks/useQuery';

// import Sliders from '../components/Sliders';
// import Corousel from '../components/SlideCorousel/Corousel';
// import CorouselOder from '../components/SlideCorousel/CourouselOder';

const Corousel = React.lazy(() => import('../components/SlideCorousel/Corousel'));
const CorouselOder = React.lazy(() => import('../components/SlideCorousel/CourouselOder'));

const Sliders = React.lazy(() => import('../components/Sliders'));
const Loading = () => {
    return (
        <>
            <CircularProgress className="loading__main" />
        </>
    );
};

const HomeScreen = ({ match }) => {
    window.scrollTo(0, 0);
    const query = useQuery();
    const category = query.get('category') || '';
    const keyword = query.get('keyword') || '';
    const pageNumber = query.get('page');
    // const category = match.params.category;

    return (
        <Suspense fallback={<Loading></Loading>}>
            <div>
                <Header keyword={keyword} />

                {!category && !keyword ? <Sliders /> : null}
                {!category && !keyword && <CategorySlider />}
                {!category && !keyword ? <Corousel /> : null}
                {!category && !keyword ? <CorouselOder /> : null}

                <ShopSection keyword={keyword} pageNumber={pageNumber} queryCategory={category} />

                <CalltoActionSection />
                <ContactInfo />
                <Footer />
            </div>
        </Suspense>
    );
};

export default HomeScreen;
