'use client'
import * as React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import {useTheme} from '@mui/material/styles';
import {List, ListImperativeAPI,} from 'react-window';
import {ActiveAirport} from "../../../scripts/generateActiveAirports";
import {AirportData, RowComponent} from "@/components/Autocomplete/row.component";

export const AirportsList = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLElement> & {
    internalListRef?: React.Ref<ListImperativeAPI>;
    onItemsBuilt: (optionIndexMap: Map<ActiveAirport, number>) => void;
}
>(function ListboxComponent(props, ref) {
    const {children, internalListRef, onItemsBuilt, ...other} = props;
    const airports: AirportData = [];
    const optionIndexMap = React.useMemo(() => new Map<ActiveAirport, number>(), []);

    (children as AirportData).forEach((item) => {
        airports.push(item);
        if ('children' in item && Array.isArray(item.children)) {
            airports.push(...item.children);
        }
    });

    airports.forEach((item, index) => {
        if (Array.isArray(item) && item[1]) {
            optionIndexMap.set(item[1], index);
        }
    });

    React.useEffect(() => {
        if (onItemsBuilt) {
            onItemsBuilt(optionIndexMap);
        }
    }, [onItemsBuilt, optionIndexMap]);

    const theme = useTheme();
    const smUp = useMediaQuery(theme.breakpoints.up('sm'), {
        noSsr: true,
    });
    const itemCount = airports.length;
    const itemSize = smUp ? 36 : 48;

    const getChildSize = (child: AirportData[number]) => {
        if (child.hasOwnProperty('group')) {
            return 48;
        }
        return itemSize;
    };

    const getHeight = () => {
        if (itemCount > 8) {
            return 8 * itemSize;
        }
        return airports.map(getChildSize).reduce((a, b) => a + b, 0);
    };

    const {className, style, ...otherProps} = other;

    return (
        <div ref={ref} {...otherProps}>
            <List
                className={className}
                listRef={internalListRef}
                key={itemCount}
                rowCount={itemCount}
                rowHeight={(index) => getChildSize(airports[index])}
                rowComponent={RowComponent}
                rowProps={{airportData: airports}}
                style={{
                    height: getHeight() + 2 * 8,
                    width: '100%',
                }}
                overscanCount={5}
                tagName="ul"
            />
        </div>
    );
});