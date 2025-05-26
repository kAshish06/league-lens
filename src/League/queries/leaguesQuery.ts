import { useQuery } from "@tanstack/react-query";
import apiClient from "../../api/apiClient";
import { QUERY_KEYS } from "../../constants/queryKeys";

type League = {
  idLeague: string;
  strLeague: string;
  strSport: string;
  strLeagueAlternate?: string;
};

const fetchLeagues = async (): Promise<League[]> => {
  const response = await apiClient.get("/all_leagues.php");
  return response.data.leagues;
};

export const useLeaguesQuery = () =>
  useQuery<League[]>({
    queryKey: [QUERY_KEYS.LEAGUES.ALL],
    queryFn: fetchLeagues,
    staleTime: Infinity, // cache forever for demo
  });
