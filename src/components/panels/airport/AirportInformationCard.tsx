'use client'
import React, {useContext} from "react";
import {DashboardContext} from "@/providers/AviationProvider";
import {Typography, Box, Paper, Grid, Divider} from "@mui/material";
import SelectedAirport from "@/components/SelectedAirport";
import Chip from "@mui/material/Chip";
import Maps from "@/components/panels/maps/mapsComponent"
const AirportInformationCard: React.FC = () => {
    const aviationContext = useContext(DashboardContext);
    const airport = aviationContext?.activeAirport;

    if (!airport) {
        return (
            <Box className="flex justify-center items-center p-6">
                <Typography variant="body1" color="textSecondary">
                    No active airport selected
                </Typography>
            </Box>
        );
    }

    return (

                <Paper
                    className="p-6 rounded-2xl shadow-md bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 h-[300px]">
                    <Typography variant="h5" className="mb-2 font-semibold text-sky-800 dark:text-sky-200">
                        {airport.name} ({airport.iata || airport.icao})
                    </Typography>
                    <Typography variant="subtitle1" className="mb-4 text-gray-600 dark:text-gray-400">
                        {airport.city}, {airport.state}, {airport.country}
                    </Typography>

                    <Divider className="mb-4"/>

                    <Grid container spacing={2}>
                        <Grid size={{xs: 12, md: 6}}>
                            <Typography className="text-gray-700 dark:text-gray-300">
                                <strong>ICAO:</strong> {airport.icao}
                            </Typography>
                            <Typography className="text-gray-700 dark:text-gray-300">
                                <strong>IATA:</strong> {airport.iata || "—"}
                            </Typography>
                            <Typography className="text-gray-700 dark:text-gray-300">
                                <strong>Elevation:</strong> {airport.elevation} ft
                            </Typography>
                        </Grid>

                        <Grid size={{xs: 12, md: 6}}>
                            <Typography className="text-gray-700 dark:text-gray-300">
                                <strong>Latitude:</strong> {airport.lat}
                            </Typography>
                            <Typography className="text-gray-700 dark:text-gray-300">
                                <strong>Longitude:</strong> {airport.lon}
                            </Typography>
                        </Grid>
                    </Grid>

                    <Divider className="my-4"/>
                    <Grid size={{xs: 12, md: 6}}>
                    <Box className="flex flex-row justify-end gap-4 p-2 ">
                        <div className="flex gap-1">
                            {airport.reports.taf && (
                                <Chip
                                    component={'a'}
                                    href={`#taf`}
                                    label="TAF"
                                    color="primary"
                                    size="small"
                                    className="!px-1 !py-0.5 text-xs"
                                />
                            )}
                            {airport.reports.metar && (
                                <Chip
                                    component={'a'}
                                    href={`#metar`}
                                    rel="noopener noreferrer"
                                    label="METAR"
                                    color="secondary"
                                    size="small"
                                    className="!px-1 !py-0.5 text-xs"
                                />
                            )}
                        </div>
                    </Box>
                    </Grid>
                </Paper>

    );
};

export default AirportInformationCard;
