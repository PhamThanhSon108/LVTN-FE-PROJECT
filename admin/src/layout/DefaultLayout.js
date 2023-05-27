import React, { Fragment } from 'react';
import Sidebar from '../components/sidebar';
import Header from '../components/Header';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import BreadcrumbsCustom from '../components/BreadcrumbsCustom/BreadcrumbsCustom';

export default function DefaultLayout({
  children = <Fragment />,
  header = true,
  sidebar = true,
  name,
  breadcrumbs = true,
}) {
  document.title = name;
  return (
    <Fragment>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        {sidebar ? <Sidebar /> : null}
        <main className="main-wrap">
          {header ? <Header /> : null}
          <section className="content-main">
            {breadcrumbs ? (
              <div className="breadcrumbs-custom">
                <BreadcrumbsCustom />
              </div>
            ) : null}
            {children}
          </section>
        </main>
      </LocalizationProvider>
    </Fragment>
  );
}
