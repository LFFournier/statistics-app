'use client'

import React, {useContext, useState} from "react";
import {DashboardContext} from "@/providers/AviationProvider";
import {Container, Typography} from "@mui/material";
const AviationSelect: React.FC = () => {

    const aviationContext = useContext(DashboardContext)
    const [selectedAircraft, setSelectedAircraft] = useState<string>(aviationContext.airportcode);
    return (
        <Typography>
            {aviationContext?.data && aviationContext.data[0]?.name}
        </Typography>
    );
}
export default AviationSelect;