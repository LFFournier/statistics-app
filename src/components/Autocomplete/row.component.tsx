import {RowComponentProps} from "react-window";
import Typography from "@mui/material/Typography";
import * as React from "react";
import {ActiveAirport} from "../../../scripts/generateActiveAirports";
import {RowGroupComponent} from "@/components/Autocomplete/row.group.component";
import {RowItemComponent} from "@/components/Autocomplete/row.item.component";

export type AirportData = Array<
    | {
    key: number;
    group: string;
    children: React.ReactNode;
}
    | [React.ReactElement, ActiveAirport, number]
>;
export function RowComponent({index, airportData, style}: RowComponentProps & {
    airportData: AirportData;
}) {
    const dataSet = airportData[index];
    const inlineStyle = {
        ...style,
        top: 8,
    };

    if ('group' in dataSet) {
        return (
            <RowGroupComponent
                dataset={dataSet}
                inlineStyle={inlineStyle}
            />
        )
    }

    return <RowItemComponent dataset={dataSet} inlineStyle={inlineStyle}/>;

}
