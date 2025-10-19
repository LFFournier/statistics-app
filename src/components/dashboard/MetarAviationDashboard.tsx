'use client'
import React, {useContext} from "react";
import {DashboardContext} from "@/providers/AviationProvider";
import {Typography, Box, Paper, Grid, Divider, CircularProgress} from "@mui/material";

const MetarAviationDashboard: React.FC = () => {
    const aviationContext = useContext(DashboardContext);

    if (aviationContext?.loading) {
        return (
            <Box display="flex" justifyContent="center" p={3}>
                <CircularProgress/>
            </Box>
        );
    }

    if (aviationContext?.error) {
        return (
            <Typography color="error">
                Error loading data: {aviationContext.error.message}
            </Typography>
        );
    }

    if (!aviationContext?.data?.metar || !Array.isArray(aviationContext?.data?.metar)) {
        return <Typography>No data available</Typography>;
    }

    const latestReport = aviationContext?.data?.metar[0];

    return (
        <Box>
            <Typography variant="h5" gutterBottom>
                {latestReport?.name || 'Unknown Airport'}
            </Typography>

            <Grid container spacing={2}>
                {/* Latest METAR Report */}
                <Grid size={{xs: 12}} >
                    <Paper elevation={2} sx={{p: 2}}>
                        <Typography variant="subtitle2" color="textSecondary">
                            Latest METAR
                        </Typography>
                        <Typography variant="body2" sx={{fontFamily: 'monospace', mt: 1}}>
                            {latestReport?.rawOb}
                        </Typography>
                    </Paper>
                </Grid>

                {/* Weather Details */}
                <Grid size={{xs: 12, md: 6}} >
                    <Paper elevation={2} sx={{p: 2}}>
                        <Typography variant="h6" gutterBottom>
                            Current Conditions
                        </Typography>
                        <Box sx={{display: 'flex', flexDirection: 'column', gap: 1}}>
                            <Box>
                                <Typography variant="body2" color="textSecondary">
                                    Temperature / Dewpoint
                                </Typography>
                                <Typography variant="body1">
                                    {latestReport?.temp}°C / {latestReport?.dewp}°C
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant="body2" color="textSecondary">
                                    Wind
                                </Typography>
                                <Typography variant="body1">
                                    {latestReport?.wdir}° at {latestReport?.wspd} kt
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant="body2" color="textSecondary">
                                    Visibility
                                </Typography>
                                <Typography variant="body1">
                                    {latestReport?.visib} SM
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant="body2" color="textSecondary">
                                    Altimeter
                                </Typography>
                                <Typography variant="body1">
                                    {latestReport?.altim} hPa
                                </Typography>
                            </Box>
                        </Box>
                    </Paper>
                </Grid>

                {/* Cloud Coverage */}
                <Grid size={{xs: 12, md: 6}} >
                    <Paper elevation={2} sx={{p: 2}}>
                        <Typography variant="h6" gutterBottom>
                            Sky Conditions
                        </Typography>
                        <Box sx={{display: 'flex', flexDirection: 'column', gap: 1}}>
                            <Box>
                                <Typography variant="body2" color="textSecondary">
                                    Flight Category
                                </Typography>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        fontWeight: 'bold',
                                        color: latestReport?.fltCat === 'VFR' ? 'green' :
                                            latestReport?.fltCat === 'IFR' ? 'red' : 'orange'
                                    }}
                                >
                                    {latestReport?.fltCat}
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant="body2" color="textSecondary">
                                    Cloud Layers
                                </Typography>
                                {latestReport?.clouds && latestReport.clouds.length > 0 ? (
                                    latestReport.clouds.map((cloud: any, index: number) => (
                                        <Typography key={index} variant="body1">
                                            {cloud.cover} at {cloud.base} ft
                                        </Typography>
                                    ))
                                ) : (
                                    <Typography variant="body1">Clear</Typography>
                                )}
                            </Box>
                        </Box>
                    </Paper>
                </Grid>

                {/* Station Info */}
                <Grid size={{xs: 12}}>
                    <Paper elevation={2} sx={{p: 2}}>
                        <Typography variant="subtitle2" gutterBottom>
                            Station Information
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid size={{xs: 6, sm: 3}}>
                                <Typography variant="body2" color="textSecondary">
                                    ICAO Code
                                </Typography>
                                <Typography variant="body1">
                                    {latestReport?.icaoId}
                                </Typography>
                            </Grid>
                            <Grid size={{xs: 6, sm: 3}}>
                                <Typography variant="body2" color="textSecondary">
                                    Coordinates
                                </Typography>
                                <Typography variant="body1">
                                    {latestReport?.lat?.toFixed(3)}, {latestReport?.lon?.toFixed(3)}
                                </Typography>
                            </Grid>
                            <Grid size={{xs: 6, sm: 3}}>
                                <Typography variant="body2" color="textSecondary">
                                    Elevation
                                </Typography>
                                <Typography variant="body1">
                                    {latestReport?.elev} m
                                </Typography>
                            </Grid>
                            <Grid size={{xs: 6, sm: 3}}>
                                <Typography variant="body2" color="textSecondary">
                                    Report Time
                                </Typography>
                                <Typography variant="body1">
                                    {new Date(latestReport?.reportTime).toLocaleTimeString()}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>

                {/* Historical Data */}
                {aviationContext?.data?.metar.length > 1 && (
                    <Grid size={{xs: 12}}>
                        <Divider sx={{my: 2}}/>
                        <Typography variant="h6" gutterBottom>
                            Recent Reports
                        </Typography>
                        {aviationContext?.data?.metar.slice(1, 4).map((report: any, index: number) => (
                            <Paper key={index} elevation={2} sx={{ p: 2, mb: 1 }}>
                                <Grid container spacing={2} alignItems="center" component="div">
                                    <Grid size={{xs: 12, sm: 4}} component="div">
                                        <Typography variant="body2" color="textSecondary">
                                            {new Date(report.reportTime).toLocaleString()}
                                        </Typography>
                                    </Grid>
                                    <Grid size={{xs: 12, sm: 8}} component="div">
                                        <Typography variant="body2">
                                            Temp: {report.temp}°C | Wind: {report.wdir}°/{report.wspd}kt
                                            Vis: {report.visib}SM | {report.fltCat}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Paper>
                        ))}
                    </Grid>
                )}
            </Grid>
        </Box>
    );
}
export default MetarAviationDashboard;