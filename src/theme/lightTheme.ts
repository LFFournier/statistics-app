'use client';
import {createTheme} from '@mui/material/styles';

const lightTheme = createTheme({
    typography: {
        fontFamily: 'var(--font-roboto)',
    },
    palette: {
        mode: 'light',
    }
});



export default lightTheme;
