import {AviationProvider} from "@/providers/AviationProvider";
import {Container, Typography} from "@mui/material";
import TestAviationAutocompleteVirtualized from "@/components/Autocomplete/AviationAutocompleteVirtualized";
import SelectedAirport from "@/components/SelectedAirport";
import MetarAviationDashboard from "@/components/dashboard/MetarAviationDashboard";
import * as React from "react";
import ReportTypeToggle from "@/components/toggle/ReportTypeToggle";
import AirportInformationDashboard from "@/components/dashboard/AirportInformationDashboard";
import WeatherAviationDashboard from "@/components/dashboard/WeatherAviationDashboard";

export const dynamic = 'force-static'

export default function Page() {

    return (
        <div
            className="font-sans grid grid-rows-[20px_1fr_20px] items-start justify-items-center min-h-screen p-8 pb-20">
            <main className="flex w-full flex-col gap-[32px] row-start-2 items-center sm:items-start">
                <AviationProvider>
                    <Container
                        className={'bg-gray-50 dark:bg-gray-800 rounded-lg p-4 shadow-md flex flex-col gap-[32px] row-start-2 items-center sm:items-start'}>
                        <Typography variant="h2" component="h2" gutterBottom>
                            Aviation Dashboard
                        </Typography>
                        <SelectedAirport/>
                    </Container>
                    <Container
                        className={'bg-gray-50 dark:bg-gray-800 rounded-lg p-4 shadow-md flex flex-col gap-[32px] row-start-2 items-center sm:items-start'}>
                        <div className={'flex flex-row gap-[32px] w-full'}>
                            <TestAviationAutocompleteVirtualized/>
                            <ReportTypeToggle/>
                        </div>
                    </Container>
                    <Container
                        className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 shadow-md flex flex-col gap-8 row-start-2 items-center sm:items-start">
                        <AirportInformationDashboard/>
                    </Container>
                    <Container
                        className={'bg-gray-50 dark:bg-gray-800 rounded-lg p-4 shadow-md flex flex-col gap-[32px] row-start-2 items-center sm:items-start'}>
                        <WeatherAviationDashboard/>
                    </Container>
                </AviationProvider>
            </main>
        </div>
    );
}
