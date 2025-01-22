import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';
import './index.css';

// Suppress react-beautiful-dnd warning
const originalError = console.error;
console.error = (...args) => {
    if (args[0]?.includes('defaultProps')) return;
    originalError.call(console, ...args);
};

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <React.Fragment>
            <App />
        </React.Fragment>
    </Provider>
);
