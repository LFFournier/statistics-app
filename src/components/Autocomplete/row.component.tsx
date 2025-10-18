import {RowComponentProps} from "react-window";
import Typography from "@mui/material/Typography";
import * as React from "react";
import {ActiveAirport} from "../../../scripts/generateActiveAirports";
import {RowGroupComponent} from "@/components/Autocomplete/row.group.component";

type ItemData = Array<
    | {
    key: number;
    group: string;
    children: React.ReactNode;
}
    | [React.ReactElement, string, number]
>;
export function RowComponent({index, itemData, style}: RowComponentProps & {
    itemData: ItemData;
}) {
    console.log(itemData);
    const dataSet = itemData[index];
    const inlineStyle = {
        ...style,
        top: (style.top as number) + 8,
    };

    if ('group' in dataSet) {
        return (
            <RowGroupComponent
                dataset={dataSet}
                inlineStyle={inlineStyle}
            />
        )
    }
    const {key, ...optionProps} = dataSet[0];

    return (
        <Typography key={key} component="li" {...optionProps} noWrap style={inlineStyle}>
            {`${dataSet[1].icao} - ${dataSet[1].name}`}
        </Typography>
    );
}
