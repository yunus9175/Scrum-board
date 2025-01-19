import { SxProps, Theme } from '@mui/material';

export const commonStyles = {
    flexCenter: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    flexBetween: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    fullHeight: {
        height: '100%',
    },
    scrollable: {
        overflowY: 'auto',
        '&::-webkit-scrollbar': {
            width: '6px',
        },
        '&::-webkit-scrollbar-track': {
            bgcolor: 'rgba(0,0,0,0.1)',
            borderRadius: '3px',
        },
        '&::-webkit-scrollbar-thumb': {
            bgcolor: 'rgba(0,0,0,0.2)',
            borderRadius: '3px',
            '&:hover': {
                bgcolor: 'rgba(0,0,0,0.3)',
            },
        },
    },
} as const;

export const getTransitionStyle = (property: string): SxProps<Theme> => ({
    transition: (theme) =>
        theme.transitions.create(property, {
            duration: theme.transitions.duration.standard,
        }),
});
