import { RouterProvider } from "react-router";
import { router } from "./routes";
import "./App.css";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-3xl font-bold text-blue-600 text-center">
          🏆 League Lens
        </h1>
        <p className="text-gray-700 text-center mt-2">
          Explore sports leagues with filters and badges
        </p>
        <RouterProvider router={router} />
      </div>
    </ErrorBoundary>
  );
}

export default App;
