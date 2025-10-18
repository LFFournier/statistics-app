import {AviationProvider} from "@/providers/AviationProvider";
import {Container, Typography} from "@mui/material";
import TestAviationAutocompleteVirtualized from "@/components/Autocomplete/AviationAutocompleteVirtualized";
import SelectedAirport from "@/components/SelectedAirport";
import {ActiveAirport} from "../../../scripts/generateActiveAirports";
import fs from "fs";
import AviationDashboard from "@/pages/AviationDashboard";

export default function Page() {

    const activeAirportsJsonPath = './data/activeAirports.json';
    const airports: ActiveAirport[] = JSON.parse(fs.readFileSync(activeAirportsJsonPath, 'utf8'));

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
                        <AviationDashboard />
                    </Container>
                </AviationProvider>
            </main>
        </div>
    );
}
