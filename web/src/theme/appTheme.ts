import { createTheme } from '@mui/material/styles';

const appTheme = createTheme({
    // breakpoints: {
    //     values: {
    //         xs: 0,
    //         sm: 600,
    //         md: 960,
    //         lg: 1440,
    //         xl: 1720
    //     }
    // },
    palette: {
        primary: {
            light: '#5469a4',
            main: '#1A237E',
            // main: '#004d40',
            // main: '#D6453D',
            dark: '#001949',
            contrastText: '#ffffff'
        },
        // success: {
        //     main: '#2E8540'
        // },
        // error: {
        //     main: '#D8292F'
        // },
        // text: {
        //     primary: '#313132',
        //     secondary: '#757575'
        // }
    },
    typography: {
        fontFamily: ['Montserrat', 'Arial', 'sans-serif'].join(', '),
        // fontFamily: ['BCSans', 'Verdana', 'Arial', 'sans-serif'].join(','),
        // h1: {
        //     fontSize: '2.25rem',
        //     fontWeight: 700
        // },
        // h2: {
        //     fontSize: '1.875rem',
        //     fontWeight: 700
        // },
        // h3: {
        //     fontSize: '1.5rem',
        //     fontWeight: 700
        // },
        // h4: {
        //     fontSize: '1.25rem',
        //     fontWeight: 700
        // },
        // h5: {
        //     fontSize: '1rem',
        //     fontWeight: 700
        // },
        // h6: {
        //     fontWeight: 700
        // }
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    'textTransform': 'none'
                }
            }
        },
        MuiToggleButton: {
            styleOverrides: {
                root: {
                    'textTransform': 'none'
                }
            }
        },
        MuiTypography: {
            styleOverrides: {
                root: {
                    '& a': {
                        textDecoration: 'none'
                    }
                }
            }
        }

    }
});

export default appTheme;
