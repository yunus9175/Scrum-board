// src/App.tsx
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material';
import { getTheme } from './theme';
import { ThemeProvider } from './context/ThemeContext';
import { useTheme } from './context/ThemeContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import { useNavigate } from 'react-router-dom';

const App: React.FC = () => {
    return (
        <ThemeProvider>
            <AuthProvider>
                <Router>
                    <AppContent />
                </Router>
            </AuthProvider>
        </ThemeProvider>
    );
};

const AppContent = () => {
    const { isDarkMode } = useTheme();
    const theme = getTheme(isDarkMode);
    const { setUser, user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/dashboard', { replace: true });
        }
    }, [user, navigate]);

    const handleLogin = (email: string, password: string) => {
        // Email validation using regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValidEmail = emailRegex.test(email);

        // Password validation: at least 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char
        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        const isStrongPassword = passwordRegex.test(password);

        if (isValidEmail && isStrongPassword) {
            setUser(email);
            navigate('/dashboard', { replace: true });
        } else {
            let errorMessage = 'Please check your credentials:\n';
            if (!isValidEmail)
                errorMessage += '- Enter a valid email address\n';
            if (!isStrongPassword) {
                errorMessage += '- Password must contain at least:\n';
                errorMessage += '  • 8 characters\n';
                errorMessage += '  • One uppercase letter\n';
                errorMessage += '  • One lowercase letter\n';
                errorMessage += '  • One number\n';
                errorMessage += '  • One special character';
            }
            alert(errorMessage);
        }
    };

    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <Navbar />
            <Routes>
                <Route path="/" element={<Login onLogin={handleLogin} />} />
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </MuiThemeProvider>
    );
};

export default App;
