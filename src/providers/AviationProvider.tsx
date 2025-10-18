'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface DashboardData {
    [key: string]: any;
}

interface DashboardContextType {
    data: DashboardData | null;
    loading: boolean;
    error: Error | null;
    airportCode: string;
    setAirportCode: (code: string) => void;
}

export const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

interface DashboardProviderProps {
    children: ReactNode;
    oaciCode?: string;
}

export function AviationProvider({ children, oaciCode = 'CYUL' }: DashboardProviderProps) {
    const [data, setData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);
    const [airportCode, setAirportCode] = useState<string>(oaciCode);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        setLoading(true);
        setError(null);
        
        fetch(`/api/aviation/${airportCode}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((jsonData: unknown) => {
                setData(jsonData as DashboardData);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching dashboard data:', error);
                setError(error instanceof Error ? error : new Error('Unknown error occurred'));
                setLoading(false);
            });
    }, [airportCode]);

    return (
        <DashboardContext value={{ data, loading, error,airportCode , setAirportCode }}>
            {children}
        </DashboardContext>
    );
}
