/**
 * Error Boundry component is helping us to stop unwanted application crashes
 * if any error come in component then that component error will not put any impact on other components and
 * website/page, The website/page will work fine without any issue.
 */
 import React from 'react';

class ErrorBoundary extends React.Component {
constructor(props) {
    super(props);
    this.state = {
    error: undefined
    };
}

static getDerivedStateFromError(error) {
    return { error };
}
render() {
    if (this.state.error) {
    return false;
    }
    return this.props.children;
}
}

export default ErrorBoundary;