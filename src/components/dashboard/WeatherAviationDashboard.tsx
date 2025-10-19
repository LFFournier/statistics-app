'use client'

import React, { useState, useContext, useEffect } from 'react';
import { Box, Tabs, Tab, Paper } from '@mui/material';
import { DashboardContext } from '@/providers/AviationProvider';
import MetarAviationDashboard from './MetarAviationDashboard';
import TafAviationDashboard from './TafAviationDashboard';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => (
    <div
        role="tabpanel"
        hidden={value !== index}
        id={`weather-tabpanel-${index}`}
        aria-labelledby={`weather-tab-${index}`}
    >
        {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </div>
);

const a11yProps = (index: number) => ({
    id: `weather-tab-${index}`,
    'aria-controls': `weather-tabpanel-${index}`,
});

const WeatherAviationDashboard: React.FC = () => {
    const aviationContext = useContext(DashboardContext);

    const tabs: { label: string; component: React.ReactNode; disabled: boolean }[] = [];

    tabs.push({ label: 'METAR', component: <MetarAviationDashboard />, disabled: !aviationContext?.data?.metar });
    tabs.push({ label: 'TAF', component: <TafAviationDashboard />, disabled: !aviationContext?.data?.taf });


    const [tabValue, setTabValue] = useState(!aviationContext?.data?.metar ? 1 : 0);

    useEffect(() => {
        if (tabValue >= tabs.length) setTabValue(tabValue);
    }, [tabs.length, tabValue]);

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    if (!aviationContext?.data || (!aviationContext?.data?.metar && !aviationContext?.data?.taf)) {
        return <Paper className="bg-secondary-dark p-2">No weather data available</Paper>;
    }

    return (
        <Paper className="bg-secondary-dark">

            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs textColor={tabValue ? "primary" : "secondary"}
                      indicatorColor={tabValue ? 'primary' : 'secondary'}
                      value={tabValue} onChange={handleChange} aria-label="Weather Tabs">
                    {tabs.map((tab, index) => (
                        <Tab key={tab.label} label={tab.label} disabled={tab.disabled} {...a11yProps(index)} />
                    ))}
                </Tabs>
            </Box>


            {tabs.map((tab, index) => (
                <div key={tab.label}>
                    <TabPanel  value={tabValue} index={index}>
                        {tab.component}
                    </TabPanel>
                </div>
            ))}
        </Paper>
    );
};

export default WeatherAviationDashboard;
