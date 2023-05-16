import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Card, Tab } from '@mui/material';
import React from 'react';

import useSearchParamsCustom from '~/hooks/useSearchParamCustom';
import WareVouchers from '../WareVouchers/WareVouchers';

export default function VoucherWallet() {
    return (
        <Card sx={{ width: '100%' }}>
            <WareVouchers />
        </Card>
    );
}
