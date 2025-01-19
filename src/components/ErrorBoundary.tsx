import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
    };

    public static getDerivedStateFromError(): State {
        return { hasError: true };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        if (!error.message.includes('defaultProps')) {
            console.error('Uncaught error:', error, errorInfo);
        }
    }

    public render() {
        if (this.state.hasError) {
            return (
                <React.Fragment>
                    <h1>Sorry.. there was an error</h1>
                </React.Fragment>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
