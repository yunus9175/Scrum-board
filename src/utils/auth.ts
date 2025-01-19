const STORAGE_KEY = 'user';

export const auth = {
    login: (email: string): void => {
        localStorage.setItem(STORAGE_KEY, email);
    },

    logout: (): void => {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem('tasks'); // Also clear tasks on logout
    },

    isAuthenticated: (): boolean => {
        return localStorage.getItem(STORAGE_KEY) !== null;
    },

    getUser: (): string | null => {
        return localStorage.getItem(STORAGE_KEY);
    },
};
