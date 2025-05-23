export const QUERY_KEYS = {
  LEAGUES: {
    ALL: "allLeagues",
  },
  LEAGUE_BADGE: {
    BY_ID: (id: string) => ["leagueBadge", id],
  },
} as const;
