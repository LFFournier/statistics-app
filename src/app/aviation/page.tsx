import {AviationProvider} from "@/providers/AviationProvider";
import {Container, Typography} from "@mui/material";
import TestAviationAutocompleteVirtualized from "@/components/Autocomplete/AviationAutocompleteVirtualized";
import SelectedAirport from "@/components/SelectedAirport";
import AviationDashboard from "@/pages/AviationDashboard";
import activeAirports from '@data/activeAirports.json';
import * as React from "react";

export const dynamic = 'force-static'
export default function Page() {

    const airports = activeAirports;

    return (
        <div
            className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
            <main className="flex w-full flex-col gap-[32px] row-start-2 items-center sm:items-start">
                <AviationProvider>
                    <Container
                        className={'bg-yellow-700 rounded-lg p-4 shadow-md flex flex-col gap-[32px] row-start-2 items-center sm:items-start'}>
                        <Typography variant="h2" component="h2" gutterBottom>
                            Aviation Dashboard
                        </Typography>
                        <SelectedAirport/>
                    </Container>
                    <Container
                        className={'bg-yellow-700 rounded-lg p-4 shadow-md flex flex-col gap-[32px] row-start-2 items-center sm:items-start'}>
                        <TestAviationAutocompleteVirtualized airports={airports}/>
                    </Container>
                    <Container
                        className={'bg-yellow-500/75 rounded-lg p-4 shadow-md flex flex-col gap-[32px] row-start-2 items-center sm:items-start'}>
                        <AviationDashboard/>
                    </Container>
                </AviationProvider>
            </main>
        </div>
    );
}
