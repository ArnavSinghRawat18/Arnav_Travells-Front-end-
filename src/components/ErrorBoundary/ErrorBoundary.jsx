import React from 'react';
import { motion } from 'framer-motion';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    
    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error caught by boundary:', error, errorInfo);
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="error-boundary d-flex direction-column align-center justify-center"
          style={{
            minHeight: '400px',
            padding: '2rem',
            textAlign: 'center',
            background: 'var(--background-color)',
            border: '1px solid var(--container-border-color)',
            borderRadius: 'var(--radius-lg)',
            margin: '2rem'
          }}
        >
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🚫</div>
          <h2 style={{ color: 'var(--error)', marginBottom: '1rem' }}>
            Oops! Something went wrong
          </h2>
          <p style={{ color: 'var(--text-color-secondary)', marginBottom: '2rem' }}>
            We encountered an unexpected error. Please try refreshing the page.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button 
              className="button btn-primary" 
              onClick={this.handleRetry}
              style={{
                padding: '0.75rem 1.5rem',
                borderRadius: 'var(--radius-md)',
                background: 'var(--primary-color)',
                color: 'white',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Try Again
            </button>
            <button 
              className="button btn-outline-primary" 
              onClick={() => window.location.href = '/'}
              style={{
                padding: '0.75rem 1.5rem',
                borderRadius: 'var(--radius-md)',
                background: 'transparent',
                color: 'var(--primary-color)',
                border: '1px solid var(--primary-color)',
                cursor: 'pointer'
              }}
            >
              Go Home
            </button>
          </div>
          {process.env.NODE_ENV === 'development' && this.state.error && (
            <details style={{ marginTop: '2rem', textAlign: 'left', width: '100%' }}>
              <summary style={{ cursor: 'pointer', marginBottom: '1rem' }}>
                Error Details (Development Only)
              </summary>
              <pre style={{ 
                background: 'var(--accent-color)', 
                padding: '1rem', 
                borderRadius: 'var(--radius-md)',
                overflow: 'auto',
                fontSize: '0.875rem'
              }}>
                {this.state.error && this.state.error.toString()}
                <br />
                {this.state.errorInfo.componentStack}
              </pre>
            </details>
          )}
        </motion.div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
