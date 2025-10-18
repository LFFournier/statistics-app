'use client'
import {DashboardContext} from '@/providers/AviationProvider';
import React, {useContext, useState} from 'react';
import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    SelectChangeEvent,
    Box,
    Typography
} from '@mui/material';

interface AviationOption {
    value: string;
    label: string;
}

const AviationSelect: React.FC = () => {
    const [selectedAircraft, setSelectedAircraft] = useState<string>('');
    const aviationContext = useContext(DashboardContext)
    const aircraftOptions: AviationOption[] = [
        { value: 'CYUL', label: 'Montreal' },
        { value: 'RJAA', label: 'Tokyo' },
        { value: 'LFPG', label: 'Paris' },
        { value: 'WIII', label: 'Jakarta' },
    ];

    const handleChange = (event: SelectChangeEvent) => {
        aviationContext?.setAirportCode(event.target.value);
        setSelectedAircraft(event.target.value);
    };

    return (
        <Box sx={{ minWidth: 300, padding: 2 }}>
            <Typography variant="h6" gutterBottom>
               Airport
            </Typography>

            <FormControl fullWidth>
                <InputLabel id="aircraft-select-label">Select Aircraft</InputLabel>
                <TextField id="outlined-basic" label="Outlined" variant="outlined" onChange={(e) => {console.log(e)}}/>
                <TextField onChange={(e) => {console.log(e.target.value)}}/>
                <Select
                    labelId="aircraft-select-label"
                    id="aircraft-select"
                    value={selectedAircraft}
                    label="Select Aircraft"
                    onChange={handleChange}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {aircraftOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
};

export default AviationSelect;