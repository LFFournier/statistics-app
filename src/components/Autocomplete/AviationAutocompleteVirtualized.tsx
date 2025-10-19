'use client'

import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, {autocompleteClasses} from '@mui/material/Autocomplete';
import Popper from '@mui/material/Popper';
import {styled} from '@mui/material/styles';
import {AirportsList} from "./list.component";
import {ActiveAirport} from "../../../scripts/generateActiveAirports";
import {matchSorter} from "match-sorter";
import {useContext, useEffect, useMemo, useState} from "react";
import {DashboardContext} from "@/providers/AviationProvider";
import {FilterOptionsState} from "@mui/material";

const LISTBOX_PADDING = 8;

const StyledPopper = styled(Popper)({
    [`& .${autocompleteClasses.listbox}`]: {
        boxSizing: 'border-box', '& ul': {
            padding: 0, margin: 0,
        },
    },
});

export default function Virtualize() {
    const [airports, setAirports] = useState<any[]>([]);

    useEffect(() => {
        fetch('/api/data/activeAirports.json')
            .then(res => res.json() as Promise<any[]>)
            .then(setAirports);
    }, []);

    const aviationContext = useContext(DashboardContext);
    const activeAirports = useMemo(() => {
        if (!aviationContext) return [];

        return airports.filter(({ reports }) =>
            !aviationContext?.reportType.taf && !aviationContext?.reportType.metar
                ? !reports.taf && !reports.metar
                : (aviationContext?.reportType.taf && reports.taf) || (aviationContext?.reportType.metar && reports.metar)
        );
    }, [airports, aviationContext?.reportType]);
    const handleSelection =  (event: React.SyntheticEvent, value: any) => {
        aviationContext?.setActiveAirport(value)
    }
    const filterOptions = (options: ActiveAirport[],
                           { inputValue }: FilterOptionsState<ActiveAirport>
    ) => matchSorter(options, inputValue, {
        keys: ['country',"icao", "name" ], threshold: matchSorter.rankings.MATCHES,
    });

    return (<Autocomplete
        className={'w-full bg-red-500/25'}
        sx={{width: 700}}
        disableListWrap
        disabled={activeAirports.length === 0}
        options={activeAirports}
        filterOptions={filterOptions}
        groupBy={(option) => option.country.toUpperCase()}
        renderInput={(params) => <TextField {...params} label="Airports"/>}
        renderOption={(props, option, state) => [props, option, state.index] as React.ReactNode}
        getOptionLabel={(option) => {
            return `${option.icao} - ${option.name}`
        }}
        onChange={handleSelection}
        renderGroup={(params) => params as any}
        slots={{
            popper: StyledPopper,
        }}
        slotProps={{
            listbox: {
                component: AirportsList, airports: activeAirports,
            } as any,
        }}
    />);
}