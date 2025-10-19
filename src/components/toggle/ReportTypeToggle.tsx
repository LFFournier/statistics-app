'use client';

import { DashboardContext, ReportTypeEnum } from '@/providers/AviationProvider';
import React, { useContext } from 'react';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';

const ReportTypeToggle: React.FC = () => {
    const aviationContext = useContext(DashboardContext);

    const [selectedReports, setSelectedReports] = React.useState<ReportTypeEnum[]>([
        ReportTypeEnum.TAF,
        ReportTypeEnum.METAR,
    ]);

    const handleReports = (
        event: React.MouseEvent<HTMLElement>,
        newReports: ReportTypeEnum[],
    ) => {
        if (!newReports.length) {
            return;
        }
        console.log(newReports)

        setSelectedReports(newReports);
        if (aviationContext) {
            aviationContext.setReportType({
                taf: newReports.includes(ReportTypeEnum.TAF),
                metar: newReports.includes(ReportTypeEnum.METAR),
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
            <ToggleButton size="large" value={ReportTypeEnum.TAF} color="primary" aria-label="TAF">
                TAF
            </ToggleButton>
            <ToggleButton size="large" value={ReportTypeEnum.METAR} color="secondary" aria-label="METAR" >
                METAR
            </ToggleButton>
        </ToggleButtonGroup>
    );
};

export default ReportTypeToggle;