import { useQuery } from "@tanstack/react-query";
import apiClient from "../../api/apiClient";
import { QUERY_KEYS } from "../../constants/queryKeys";

export type Season = {
  strSeason: string;
  strBadge?: string;
};

const fetchLeagueBadge = async (leagueId: string): Promise<Season[]> => {
  const response = await apiClient.get(
    `/search_all_seasons.php?badge=1&id=${leagueId}`
  );
  return response.data.seasons || [];
};

export const useLeagueBadgeQuery = (leagueId: string) => {
  return useQuery<Season[]>({
    queryKey: QUERY_KEYS.LEAGUE_BADGE.BY_ID(leagueId),
    queryFn: () => fetchLeagueBadge(leagueId),
    enabled: !!leagueId,
    staleTime: Infinity, // cache forever for demo
  });
};
