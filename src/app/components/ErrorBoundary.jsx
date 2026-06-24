import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service here
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div style={{ padding: "40px", textAlign: "center", fontFamily: "sans-serif" }}>
          <h1 style={{ color: "#13206d" }}>Something went wrong.</h1>
          <p style={{ color: "gray" }}>An unexpected error occurred in the application.</p>
          <button 
            onClick={() => window.location.reload()} 
            style={{ 
              marginTop: "20px", 
              padding: "10px 20px", 
              backgroundColor: "#84FBA2", 
              border: "none", 
              borderRadius: "5px", 
              color: "#13206D",
              fontWeight: "bold",
              cursor: "pointer"
            }}
          >
            Refresh Page
          </button>
          
          {/* Detailed error in development - optional but helpful */}
          {import.meta.env.DEV && (
            <div style={{ marginTop: "30px", textAlign: "left", backgroundColor: "#f8f9fa", padding: "20px", borderRadius: "5px", overflowX: "auto" }}>
              <h3 style={{ color: "red" }}>{this.state.error && this.state.error.toString()}</h3>
              <pre style={{ color: "gray", fontSize: "12px" }}>
                {this.state.errorInfo && this.state.errorInfo.componentStack}
              </pre>
            </div>
          )}
        </div>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
