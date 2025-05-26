import { Component } from "react";
import type { ErrorInfo, ReactNode } from "react";
import { STRINGS } from "../constants/strings";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
    error: null,
  };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
              <h2 className="text-2xl font-bold text-red-600 mb-4">
                {STRINGS.ERROR_BOUNDARY_TITLE}
              </h2>
              <p className="text-gray-600 mb-4">
                {this.state.error?.message ||
                  STRINGS.ERROR_BOUNDARY_FALLBACK_MESSAGE}
              </p>
              <button
                onClick={() => window.location.reload()}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                aria-label={STRINGS.ERROR_BOUNDARY_REFRESH_BUTTON}
              >
                {STRINGS.ERROR_BOUNDARY_REFRESH_BUTTON}
              </button>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
