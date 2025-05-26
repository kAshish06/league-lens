export const ROUTES = {
  HOME: "/",
  LEAGUES: "/leagues",
  LEAGUE_DETAILS: "/leagues/:id",
};

export type RouteKey = keyof typeof ROUTES;
