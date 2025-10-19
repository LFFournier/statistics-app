import ListSubheader from "@mui/material/ListSubheader";
import * as React from "react";
import { hasFlag } from 'country-flag-icons'
import getUnicodeFlagIcon from 'country-flag-icons/unicode'
import Typography from "@mui/material/Typography";
import {ActiveAirport} from "../../../scripts/generateActiveAirports";
import Chip from "@mui/material/Chip";

interface RowComponentProps {
    dataset?: any
    inlineStyle: React.CSSProperties
}

export function RowItemComponent({dataset, inlineStyle}: RowComponentProps) {

    const {key, ...optionProps} = dataset[0];
    const airport = dataset[1] as ActiveAirport;

    return (
        <Typography key={key} component="li" {...optionProps} noWrap style={inlineStyle}  className={'w-full'}>
            <div className="flex justify-between items-center">
                <span>{`${dataset[1].icao} - ${dataset[1].name}`}</span>

                <div className="flex gap-1">
                    {airport.reports.taf && (
                        <Chip
                            label="TAF"
                            color="primary"
                            size="small"
                            className="!px-1 !py-0.5 text-xs"
                        />
                    )}
                    {airport.reports.metar && (
                        <Chip
                            label="METAR"
                            color="secondary"
                            size="small"
                            className="!px-1 !py-0.5 text-xs"
                        />
                    )}
                </div>
            </div>

        </Typography>
    );
}