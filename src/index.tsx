// Suppress specific react-beautiful-dnd warning
const originalError = console.error;
console.error = (...args) => {
    if (args[0]?.includes('defaultProps')) return;
    originalError.call(console, ...args);
};
