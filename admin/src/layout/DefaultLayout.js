import React, { Fragment } from 'react';
import Sidebar from '../components/sidebar';
import Header from '../components/Header';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

export default function DefaultLayout({ children = <Fragment />, header = true, sidebar = true }) {
  return (
    <Fragment>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        {sidebar ? <Sidebar /> : null}
        <main className="main-wrap">
          {header ? <Header /> : null}
          {children}
        </main>
      </LocalizationProvider>
    </Fragment>
  );
}
