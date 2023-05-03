import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import ProfileTab from '../ProfileTab/ProfileTab';
import { UpdatePasswordTab } from '../UpdatePasswordTab/UpdatePasswordTab';
import { Card } from '@mui/material';
import AddressTab from '../AddressTab/AddressTab';

import { useHistory, useLocation } from 'react-router-dom';

const TabPanelStyles = { padding: '0px 0px 24px' };
export default function MyAccount() {
    const location = useLocation();
    const history = useHistory();
    const searchParams = new URLSearchParams(location.search);
    const [tab] = React.useState(searchParams.get('tab') || 'profile');
    const handleChange = (_, newTab) => {
        history.replace(`?tab=${newTab}`);
    };

    return (
        <Card sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={tab}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange}>
                        <Tab label="Hồ sơ" value="profile" />
                        <Tab label="Địa chỉ" value="address" />
                        <Tab label="Đổi mật khẩu" value="update-password" />
                    </TabList>
                </Box>
                <TabPanel sx={TabPanelStyles} value="profile">
                    <ProfileTab />
                </TabPanel>
                <TabPanel sx={TabPanelStyles} value="address">
                    <AddressTab />
                </TabPanel>
                <TabPanel sx={TabPanelStyles} value="update-password">
                    <UpdatePasswordTab />
                </TabPanel>
            </TabContext>
        </Card>
    );
}
