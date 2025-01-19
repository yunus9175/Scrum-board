import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from './ThemeToggle';
import { storage } from '../utils/localStorage';

const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, setUser } = useAuth();
    const isLoginPage = location.pathname === '/';

    const handleLogout = () => {
        setUser(null);
        storage.removeUser();
        navigate('/', { replace: true });
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography
                    variant="h6"
                    component="div"
                    sx={{
                        flexGrow: 1,
                        fontWeight: 500,
                    }}
                >
                    Task Manager
                </Typography>
                <ThemeToggle />
                {user && !isLoginPage && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Typography variant="body1" color="inherit">
                            {user}
                        </Typography>
                        <IconButton
                            color="inherit"
                            onClick={handleLogout}
                            sx={{
                                '&:hover': {
                                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                                },
                            }}
                        >
                            <LogoutIcon />
                        </IconButton>
                    </Box>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
