import React, { createContext, useContext, useState, useEffect } from 'react';
import { storage } from '../utils/localStorage';

interface AuthContextType {
    user: string | null;
    setUser: (user: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [user, setUser] = useState<string | null>(() => {
        // Initialize from localStorage
        return storage.getUser();
    });

    useEffect(() => {
        if (user) {
            storage.setUser(user);
        } else {
            storage.removeUser();
        }
    }, [user]);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
