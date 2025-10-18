'use client'

import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, {autocompleteClasses} from '@mui/material/Autocomplete';
import Popper from '@mui/material/Popper';
import {styled} from '@mui/material/styles';
import {AirportsList} from "./list.component";
import {ActiveAirport} from "../../../scripts/generateActiveAirports";
import {matchSorter} from "match-sorter";
import {useContext} from "react";
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

export default function Virtualize({airports}: { airports: ActiveAirport[] }) {

    const aviationContext = useContext(DashboardContext);

    const handleSelection =  (event: React.SyntheticEvent, value: any) => {
        aviationContext?.setAirportCode(value.icao)
    }
    const filterOptions = (options: ActiveAirport[],
                           { inputValue }: FilterOptionsState<ActiveAirport>
    ) => matchSorter(options, inputValue, {
        keys: ['country',"icao", "name" ], threshold: matchSorter.rankings.MATCHES,
    });

    return (<Autocomplete
        className={'w-full'}
        sx={{width: 700}}
        disableListWrap
        options={airports}
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
                component: AirportsList, airports: airports,
            } as any,
        }}
    />);
}