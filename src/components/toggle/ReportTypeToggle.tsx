'use client';

import { DashboardContext, ReportTypeEnum } from '@/providers/AviationProvider';
import React, { useContext } from 'react';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';

const ReportTypeToggle: React.FC = () => {
    const aviationContext = useContext(DashboardContext);

    const [selectedReports, setSelectedReports] = React.useState<ReportTypeEnum[]>([
        ReportTypeEnum.METAR,
        ReportTypeEnum.TAF,
    ]);

    const handleReports = (
        event: React.MouseEvent<HTMLElement>,
        newReports: ReportTypeEnum[],
    ) => {
        setSelectedReports(newReports);
        if (aviationContext) {
            aviationContext.setReportType({
                metar: newReports.includes(ReportTypeEnum.METAR),
                taf: newReports.includes(ReportTypeEnum.TAF),
            });
        }
    };

    return (
        <ToggleButtonGroup
            value={selectedReports}
            onChange={handleReports}
            aria-label="report type"
            fullWidth={true}
            sx={{width: '100%', maxWidth: 300, margin: 'auto'}}
        >
            <ToggleButton size="large" value={ReportTypeEnum.METAR} color="primary" aria-label="METAR">
                METAR
            </ToggleButton>
            <ToggleButton size="large" value={ReportTypeEnum.TAF} color="secondary" aria-label="TAF" >
                TAF
            </ToggleButton>
        </ToggleButtonGroup>
    );
};

export default ReportTypeToggle;