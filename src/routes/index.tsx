import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router";
import { ROUTES } from "./routes";
import LoadingSpinner from "../components/LoadingSpinner";

// Lazy load components
const LeagueList = lazy(() => import("../League/LeagueList"));
const LeagueDetails = lazy(() => import("../League/LeagueDetails"));

// Wrap components with Suspense
const withSuspense = (Component: React.ComponentType) => (
  <Suspense fallback={<LoadingSpinner />}>
    <Component />
  </Suspense>
);

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: withSuspense(LeagueList),
  },
  {
    path: ROUTES.LEAGUES,
    element: withSuspense(LeagueList),
  },
  {
    path: ROUTES.LEAGUE_DETAILS,
    element: withSuspense(LeagueDetails),
  },
]);
