'use client';
import {createContext, ReactNode, useEffect, useState} from 'react';
import {ActiveAirport} from "../../scripts/generateActiveAirports";

interface DashboardData {
    [key: string]: any;
}

interface DashboardContextType {
    data: DashboardData | null;
    loading: boolean;
    error: Error | null;
    activeAirport: ActiveAirport | null;
    setActiveAirport: (code: ActiveAirport) => void;
    reportType: reportType;
    setReportType: (type: reportType) => void;
}

export const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

interface DashboardProviderProps {
    children: ReactNode;
}

export enum ReportTypeEnum {
    METAR = 'metar',
    TAF = 'taf',
}

interface reportType {
    [ReportTypeEnum.METAR]: boolean;
    [ReportTypeEnum.TAF]: boolean;
}

export function AviationProvider({children}: DashboardProviderProps) {
    const [data, setData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(false);
    const [activeAirport, setActiveAirport] = useState<ActiveAirport | null>(null);
    const [reportType, setReportType] = useState<reportType>({metar: true, taf: true});

    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (!activeAirport) return;
        // setLoading(true);
        // setError(null);
        //
        // fetch(`/api/aviation/${airportCode}`)
        //     .then((response) => {
        //         if (!response.ok) {
        //             throw new Error(`HTTP error! status: ${response.status}`);
        //         }
        //         return response.json();
        //     })
        //     .then((jsonData: unknown) => {
        //         setData(jsonData as DashboardData);
        //         setLoading(false);
        //     })
        //     .catch((error) => {
        //         console.error('Error fetching dashboard data:', error);
        //         setError(error instanceof Error ? error : new Error('Unknown error occurred'));
        //         setLoading(false);
        //     });
    }, [activeAirport]);

    return (
        <DashboardContext value={{
            data, loading, error,
            activeAirport, setActiveAirport, reportType, setReportType
        }}>
            {children}
        </DashboardContext>
    );
}
