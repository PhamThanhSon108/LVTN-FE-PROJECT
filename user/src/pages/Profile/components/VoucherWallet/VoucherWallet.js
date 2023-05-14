import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Card, Tab } from '@mui/material';
import React from 'react';

import useSearchParamsCustom from '~/hooks/useSearchParamCustom';
import WareVouchers from '../WareVouchers/WareVouchers';

const TabPanelStyles = { padding: '0px 0px 24px' };
export default function VoucherWallet() {
    const { getParamValue, replaceParams } = useSearchParamsCustom();
    const [tab] = React.useState(getParamValue('tab') || 'ware');
    const handleChange = (_, newTab) => {
        replaceParams([{ key: 'tab', value: newTab }]);
    };
    return (
        <Card sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={tab}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange}>
                        <Tab label="Kho voucher" value="ware" />
                        <Tab label="Voucher của tôi" value="my-voucher" />
                    </TabList>
                </Box>
                <TabPanel sx={TabPanelStyles} value="ware">
                    <WareVouchers />
                </TabPanel>
                <TabPanel sx={TabPanelStyles} value="my-voucher"></TabPanel>
            </TabContext>
        </Card>
    );
}
