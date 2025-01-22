import React from 'react';
import { IconButton, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useTheme } from '../context/ThemeContext';

const ToggleButton = styled(IconButton)`
    position: relative;
    width: 40px;
    height: 40px;
    overflow: hidden;
`;

const IconWrapper = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'active',
})<{ active: boolean }>`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%)
        ${({ active }) => (active ? 'scale(1)' : 'scale(0)')};
    transition: transform 0.3s ease-in-out;
    opacity: ${({ active }) => (active ? 1 : 0)};
`;

const ThemeToggle: React.FC = () => {
    const { isDarkMode, toggleTheme } = useTheme();

    return (
        <ToggleButton
            color="inherit"
            onClick={toggleTheme}
            sx={{
                mr: 2,
                '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                },
                fontSize: '0.5rem',
            }}
        >
            <IconWrapper active={!isDarkMode}>
                <LightModeIcon />
            </IconWrapper>
            <IconWrapper active={isDarkMode}>
                <DarkModeIcon />
            </IconWrapper>
        </ToggleButton>
    );
};

export default ThemeToggle;
