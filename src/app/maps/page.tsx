import activeAirports from '@data/activeAirports.json';
import * as React from "react";
import {ActiveAirport} from "../../../scripts/generateActiveAirports";
import Maps from "@/components/panels/maps/mapsComponent";


export const dynamic = 'force-static'

export default function Page() {

    const airports = activeAirports as ActiveAirport[];

    return (
        <div
            className="font-sans grid grid-rows-[20px_1fr_20px] items-start justify-items-center min-h-screen p-8 pb-20">
            <main className="flex w-full flex-col gap-[32px] row-start-2 items-center sm:items-start">
                <Maps/>
            </main>
        </div>
    );
}
