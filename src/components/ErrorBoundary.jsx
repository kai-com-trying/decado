import React from 'react';
import styles from './ErrorBoundary.module.css'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Error caught in boundary:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return <p style={{ color: "red" }} className={styles.error}>Something went wrong. Please try again later.</p>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
