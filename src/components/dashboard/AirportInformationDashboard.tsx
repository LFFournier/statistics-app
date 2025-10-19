'use client'
import React, {useContext} from "react";
import {DashboardContext} from "@/providers/AviationProvider";
import {Box, Typography} from "@mui/material";
import Maps from "@/components/panels/maps/mapsComponent"
import AirportInformationCard from "@/components/panels/airport/AirportInformationCard";

const AirportInformationDashboard: React.FC = () => {
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
        <div className="flex flex-row gap-[32px] w-full p-4">
            <div className="w-1/2 rounded-lg">
                <AirportInformationCard/>
            </div>
            <div className="w-1/2 rounded-lg">
                <Maps/>
            </div>
        </div>
    );
};

export default AirportInformationDashboard;
