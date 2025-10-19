'use client';
import {createTheme} from '@mui/material/styles';

const darkTheme = createTheme({
    typography: {
        fontFamily: 'var(--font-roboto)',
    },
    palette: {
        mode: 'dark',
        primary: {
            main: '#E3D026',
            light: '#E9DB5D',
            dark: '#A29415',
            contrastText: '#242105',

        },
        secondary: {
            main: '#9e99ff',
            light: '#624ee8',
            dark: '#0d178c',
            contrastText: '#242105',
        }
    }
});

export default darkTheme;
