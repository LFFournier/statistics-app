'use client'

import React, {useState} from 'react';
import {Container, Typography} from '@mui/material';
import Button from "@mui/material/Button";
import {LineChart, LineSeries} from '@mui/x-charts/LineChart';

function randomInRange(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function dataGenerator(count: number, range: number = 0): DataPoint[] {
    const data = [];
    for (let i = 1; i <= count; i++) {
        data.push({
            x: i,
            y: randomInRange(range, count + range)
        });
    }
    return data;
}

interface DataPoint {
    [key: string]: string | number | Date | null | undefined;
    x: number | string;
    y: number | string;
}

const RandomDashboard: React.FC = () => {
    const [data, setData] = useState<DataPoint[]>([]);


    return (
        <>
            <Container>
                <Button
                    variant="contained"
                    onClick={() => setData(dataGenerator(12))}
                >Hello world</Button>
            </Container>
            <Container>
                <Typography variant="h4" component="h1" gutterBottom>
                    <LineChart
                        localeText={{noData: 'Press  the button to generate Data'}}
                        dataset={
                            data
                        }
                        xAxis={[{dataKey: 'x'}]}
                        series={
                            [{dataKey: 'y'}] as LineSeries[]}
                        height={300}
                        width={600}
                    />
                </Typography>
            </Container>
        </>
    );
};

export default RandomDashboard;