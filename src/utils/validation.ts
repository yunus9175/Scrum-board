export const validateEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const validatePassword = (password: string): boolean => {
    const passwordRules = {
        minLength: 8,
        hasUpperCase: /[A-Z]/,
        hasLowerCase: /[a-z]/,
        hasNumber: /\d/,
        hasSpecialChar: /[@$!%*?&]/
    };

    return (
        password.length >= passwordRules.minLength &&
        passwordRules.hasUpperCase.test(password) &&
        passwordRules.hasLowerCase.test(password) &&
        passwordRules.hasNumber.test(password) &&
        passwordRules.hasSpecialChar.test(password)
    );
};

export const getPasswordErrorMessage = (): string => {
    return 'Password must contain at least 8 characters, including uppercase, lowercase, number and special character (@$!%*?&)';
}; 