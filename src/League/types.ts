export interface League {
  idLeague: string;
  strLeague: string;
  strSport: string;
  strLeagueAlternate?: string | null;
}

export interface Sport {
  id: string;
  name: string;
}

export interface Season {
  strSeason: string;
  strBadge?: string;
}
