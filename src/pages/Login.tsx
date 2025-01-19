import React from 'react';
import LoginComponent from '../components/Login';

interface LoginPageProps {
    onLogin: (email: string, password: string) => void;
}

const Login: React.FC<LoginPageProps> = ({ onLogin }) => {
    return <LoginComponent onLogin={onLogin} />;
};

export default Login;
