import { createTheme, Theme } from '@mui/material/styles';

export const getTheme = (isDarkMode: boolean): Theme =>
    createTheme({
        palette: {
            mode: isDarkMode ? 'dark' : 'light',
            primary: {
                main: '#1976d2',
            },
            background: {
                default: isDarkMode ? '#1a1a1a' : '#f5f5f5',
                paper: isDarkMode ? '#2d2d2d' : '#ffffff',
            },
            text: {
                primary: isDarkMode ? '#ffffff' : '#000000',
                secondary: isDarkMode
                    ? 'rgba(255, 255, 255, 0.7)'
                    : 'rgba(0, 0, 0, 0.6)',
            },
        },
        components: {
            MuiAppBar: {
                styleOverrides: {
                    root: {
                        backgroundColor: isDarkMode ? '#2d2d2d' : '#1976d2',
                        backgroundImage: 'none',
                    },
                },
            },
            MuiPaper: {
                styleOverrides: {
                    root: {
                        backgroundImage: 'none',
                        ...(isDarkMode && {
                            border: '1px solid rgba(255, 255, 255, 0.12)',
                        }),
                    },
                },
            },
            MuiButton: {
                styleOverrides: {
                    root: {
                        textTransform: 'none',
                        borderRadius: 8,
                        height: '44px',
                    },
                },
            },
            MuiTextField: {
                styleOverrides: {
                    root: {
                        '& .MuiOutlinedInput-root': {
                            height: '56px',
                            ...(isDarkMode && {
                                '& fieldset': {
                                    borderColor: 'rgba(255, 255, 255, 0.23)',
                                },
                                '&:hover fieldset': {
                                    borderColor: 'rgba(255, 255, 255, 0.4)',
                                },
                            }),
                        },
                    },
                },
            },
            MuiCard: {
                styleOverrides: {
                    root: {
                        backgroundColor: isDarkMode ? '#2d2d2d' : '#ffffff',
                        borderRadius: 8,
                    },
                },
            },
        },
    });
