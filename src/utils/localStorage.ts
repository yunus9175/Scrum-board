import { Task } from '../types/task';

const STORAGE_KEYS = {
    USER: 'user',
    TASKS: 'tasks',
} as const;

const storage = {
    // User related
    setUser: (email: string): void => {
        localStorage.setItem(STORAGE_KEYS.USER, email);
    },

    getUser: (): string | null => {
        return localStorage.getItem(STORAGE_KEYS.USER);
    },

    removeUser: (): void => {
        localStorage.removeItem(STORAGE_KEYS.USER);
    },

    // Tasks related
    setTasks: (tasks: Task[]) => {
        try {
            localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
        } catch (error) {
            console.warn('Failed to save tasks to localStorage:', error);
        }
    },

    getTasks: (): Task[] => {
        try {
            const tasks = localStorage.getItem(STORAGE_KEYS.TASKS);
            return tasks ? JSON.parse(tasks) : [];
        } catch (error) {
            console.warn('Failed to get tasks from localStorage:', error);
            return [];
        }
    },

    clearTasks: () => {
        try {
            localStorage.removeItem(STORAGE_KEYS.TASKS);
        } catch (error) {
            console.warn('Failed to clear tasks from localStorage:', error);
        }
    },

    clearAll: (): void => {
        localStorage.clear();
    },
};

export { storage };
