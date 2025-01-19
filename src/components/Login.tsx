import React, { useState } from 'react';
import {
    Box,
    TextField,
    Button,
    Typography,
    Paper,
    InputAdornment,
    IconButton,
} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

interface LoginProps {
    onLogin: (email: string, password: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({ email: '', password: '' });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({ email: '', password: '' });

        let hasErrors = false;
        const newErrors = { email: '', password: '' };

        if (!email) {
            newErrors.email = 'Email is required';
            hasErrors = true;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Email is invalid';
            hasErrors = true;
        }

        if (!password) {
            newErrors.password = 'Password is required';
            hasErrors = true;
        } else if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
            hasErrors = true;
        }

        setErrors(newErrors);

        if (!hasErrors) {
            onLogin(email, password);
        }
    };

    return (
        <Box
            sx={{
                height: '90vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'background.default',
                overflow: 'hidden',
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    p: 4,
                    width: '100%',
                    maxWidth: 400,
                    bgcolor: 'background.paper',
                    borderRadius: 2,
                    mx: 2,
                }}
            >
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 3,
                    }}
                >
                    <Box sx={{ textAlign: 'center', mb: 2 }}>
                        <LockIcon
                            sx={{
                                fontSize: 40,
                                color: 'primary.main',
                                mb: 1,
                            }}
                        />
                        <Typography variant="h5" component="h1">
                            Login
                        </Typography>
                    </Box>

                    <TextField
                        fullWidth
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            if (errors.email)
                                setErrors({ ...errors, email: '' });
                        }}
                        error={!!errors.email}
                        helperText={errors.email}
                        required={false}
                        autoFocus
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '&.Mui-focused fieldset': {
                                    borderColor: 'primary.main',
                                },
                                '&.Mui-error fieldset': {
                                    borderColor: 'error.main',
                                },
                            },
                        }}
                    />

                    <TextField
                        fullWidth
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            if (errors.password)
                                setErrors({ ...errors, password: '' });
                        }}
                        error={!!errors.password}
                        helperText={errors.password}
                        required={false}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                        edge="end"
                                    >
                                        {showPassword ? (
                                            <VisibilityOff />
                                        ) : (
                                            <Visibility />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '&.Mui-focused fieldset': {
                                    borderColor: 'primary.main',
                                },
                                '&.Mui-error fieldset': {
                                    borderColor: 'error.main',
                                },
                            },
                        }}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        fullWidth
                        sx={{
                            mt: 2,
                            height: 46,
                            borderRadius: 1,
                            textTransform: 'none',
                            fontSize: '1rem',
                        }}
                    >
                        Login
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
};

export default Login;
