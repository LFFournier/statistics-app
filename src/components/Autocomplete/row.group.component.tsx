import ListSubheader from "@mui/material/ListSubheader";
import * as React from "react";
import { hasFlag } from 'country-flag-icons'
import getUnicodeFlagIcon from 'country-flag-icons/unicode'

interface RowGroupComponentProps {
    dataset?: any
    inlineStyle: React.CSSProperties
}

export function RowGroupComponent({dataset, inlineStyle}: RowGroupComponentProps) {
    if (hasFlag(dataset.group)) {
        const flag = getUnicodeFlagIcon(dataset.group);
        return (
            <ListSubheader key={dataset.key} component="div" style={inlineStyle}>
                {dataset.group} - {flag}
            </ListSubheader>
        );
    }
    return (
        <ListSubheader key={dataset.key} component="div" style={inlineStyle}>
            {dataset.group}
        </ListSubheader>
    );
}