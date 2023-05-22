import React, { Fragment } from 'react';

import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import BreadcrumbsCustom from '../components/BreadcrumbsCustom/BreadcrumbsCustom';
import Header from '~/components/Header';
import Footer from '~/components/Footer';
import Toast from '~/components/LoadingError/Toast';

export default function DefaultLayout({
    children = <Fragment />,
    header = true,
    sidebar = true,
    name,
    footer = false,
}) {
    document.title = name;
    return (
        <Fragment>
            <LocalizationProvider dateAdapter={AdapterMoment}>
                <Toast />
                {header ? <Header /> : null}

                {children}
                {footer ? <Footer /> : null}
            </LocalizationProvider>
        </Fragment>
    );
}
