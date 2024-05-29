'use client'

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
            // light: '#BAE9FE',
            // main: '#8FCEED',
            main: '#1D6087',
            contrastText: '#ffffff'
        },
        secondary: {
            main: '#8FCEED',
            contrastText: '#000'
        }
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
        },
        MuiTab: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    minWidth: '0 !important',
                    
                }
            }
        },
        MuiBreadcrumbs: {
            styleOverrides: {
                li: {
                    fontWeight: 600
                }
            }
        }
    }
});

export default appTheme;
