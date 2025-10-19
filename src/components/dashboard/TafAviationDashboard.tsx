'use client';
import React, { useContext } from "react";
import { DashboardContext } from "@/providers/AviationProvider";
import { Typography, Box, Paper, Grid, Divider, CircularProgress } from "@mui/material";

const TafAviationDashboard: React.FC = () => {
    const aviationContext = useContext(DashboardContext);

    if (aviationContext?.loading) {
        return (
            <Box display="flex" justifyContent="center" p={3}>
                <CircularProgress color="secondary" />
            </Box>
        );
    }

    if (aviationContext?.error) {
        return (
            <Typography color="error">
                Error loading TAF: {aviationContext.error.message}
            </Typography>
        );
    }

    if (!aviationContext?.data?.taf || !Array.isArray(aviationContext?.data?.taf)) {
        return <Typography>No TAF data available</Typography>;
    }

    const tafReport = aviationContext.data.taf[0];

    return (
        <Box>
            <Typography variant="h5" gutterBottom>
                {tafReport?.name || "Unknown Airport"}
            </Typography>

            <Grid container spacing={2}>
                {/* Raw TAF */}
                <Grid size={{ xs: 12 }}>
                    <Paper elevation={2} sx={{ p: 2 }}>
                        <Typography variant="subtitle2" color="textSecondary">
                            Raw TAF
                        </Typography>
                        <Typography variant="body2" sx={{ fontFamily: "monospace", mt: 1 }}>
                            {tafReport?.rawTAF}
                        </Typography>
                    </Paper>
                </Grid>

                {/* Forecast Validity */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Paper elevation={2} sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Forecast Period
                        </Typography>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                            <Typography variant="body2" color="textSecondary">
                                Valid From
                            </Typography>
                            <Typography variant="body1">
                                {new Date(tafReport?.validTimeFrom * 1000).toLocaleString()}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                                Valid To
                            </Typography>
                            <Typography variant="body1">
                                {new Date(tafReport?.validTimeTo * 1000).toLocaleString()}
                            </Typography>
                        </Box>
                    </Paper>
                </Grid>

                {/* Station Info */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Paper elevation={2} sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Station Info
                        </Typography>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                            <Typography variant="body2" color="textSecondary">
                                ICAO
                            </Typography>
                            <Typography variant="body1">{tafReport?.icaoId}</Typography>

                            <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                                Coordinates
                            </Typography>
                            <Typography variant="body1">
                                {tafReport?.lat?.toFixed(3)}, {tafReport?.lon?.toFixed(3)}
                            </Typography>

                            <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                                Elevation
                            </Typography>
                            <Typography variant="body1">{tafReport?.elev} m</Typography>
                        </Box>
                    </Paper>
                </Grid>

                {/* Forecast Segments */}
                {tafReport?.fcsts?.length > 0 && (
                    <Grid size={{ xs: 12 }}>
                        <Divider sx={{ my: 2 }} />
                        <Typography variant="h6" gutterBottom>
                            Forecast Details
                        </Typography>

                        {tafReport.fcsts.map((fcst: any, index: number) => (
                            <Paper key={index} elevation={2} sx={{ p: 2, mb: 1 }}>
                                <Grid container spacing={2}>
                                    <Grid size={{ xs: 12, sm: 4 }}>
                                        <Typography variant="body2" color="textSecondary">
                                            From:
                                        </Typography>
                                        <Typography variant="body1">
                                            {new Date(fcst.timeFrom * 1000).toLocaleTimeString()}
                                        </Typography>

                                        <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                                            To:
                                        </Typography>
                                        <Typography variant="body1">
                                            {new Date(fcst.timeTo * 1000).toLocaleTimeString()}
                                        </Typography>
                                    </Grid>

                                    <Grid size={{ xs: 12, sm: 8 }}>
                                        {fcst.fcstChange && (
                                            <Typography variant="body2">
                                                <strong>Change:</strong> {fcst.fcstChange}{" "}
                                                {fcst.probability ? `${fcst.probability}%` : ""}
                                            </Typography>
                                        )}
                                        {fcst.wxString && (
                                            <Typography variant="body2">
                                                <strong>Weather:</strong> {fcst.wxString}
                                            </Typography>
                                        )}
                                        {fcst.wdir && fcst.wspd && (
                                            <Typography variant="body2">
                                                <strong>Wind:</strong> {fcst.wdir}° at {fcst.wspd} kt
                                            </Typography>
                                        )}
                                        {fcst.visib && (
                                            <Typography variant="body2">
                                                <strong>Visibility:</strong> {fcst.visib} SM
                                            </Typography>
                                        )}
                                        {fcst.clouds?.length > 0 && (
                                            <Typography variant="body2">
                                                <strong>Clouds:</strong>{" "}
                                                {fcst.clouds
                                                    .map(
                                                        (c: any) =>
                                                            `${c.cover}${c.base ? ` at ${c.base} ft` : ""}`
                                                    )
                                                    .join(", ")}
                                            </Typography>
                                        )}
                                    </Grid>
                                </Grid>
                            </Paper>
                        ))}
                    </Grid>
                )}
            </Grid>
        </Box>
    );
};

export default TafAviationDashboard;
