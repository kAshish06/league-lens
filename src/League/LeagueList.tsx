import { useMemo, useState, useCallback } from "react";
import { useNavigate } from "react-router";
import { useLeaguesQuery } from "./queries/leaguesQuery";
import { ROUTES } from "../routes/routes";
import SearchInput from "../components/SearchInput";
import SportFilter from "../components/SportFilter";
import LeagueCard from "./components/LeagueCard";
import type { Sport } from "./types";

export default function LeagueList() {
  const navigate = useNavigate();
  const { data: leagues, isLoading, isError } = useLeaguesQuery();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSport, setSelectedSport] = useState<Sport | null>(null);

  const handleCardClick = useCallback(
    (id: string) => {
      navigate(ROUTES.LEAGUE_DETAILS.replace(":id", id));
    },
    [navigate]
  );

  // Get unique sports from leagues
  const sports = useMemo(() => {
    if (!leagues) return [];
    const uniqueSports = new Map<string, Sport>();
    leagues.forEach((league) => {
      if (!uniqueSports.has(league.strSport)) {
        uniqueSports.set(league.strSport, {
          id: league.strSport,
          name: league.strSport,
        });
      }
    });
    return Array.from(uniqueSports.values());
  }, [leagues]);

  const filteredLeagues = useMemo(() => {
    if (!leagues) return [];

    return leagues.filter((league) => {
      const matchesSearch =
        !searchTerm.trim() ||
        league.strLeague.toLowerCase().includes(searchTerm.toLowerCase()) ||
        league.strSport.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (league.strLeagueAlternate &&
          league.strLeagueAlternate
            .toLowerCase()
            .includes(searchTerm.toLowerCase()));

      const matchesSport =
        !selectedSport || league.strSport === selectedSport.id;

      return matchesSearch && matchesSport;
    });
  }, [leagues, searchTerm, selectedSport]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong.</p>;

  return (
    <div className="container p-4">
      {/* Search and Filter Section */}
      <div className="max-w-4xl mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SearchInput
            onChange={setSearchTerm}
            placeholder="Search leagues..."
          />
          <SportFilter
            sports={sports}
            selectedSport={selectedSport}
            onChange={setSelectedSport}
          />
        </div>
      </div>

      {/* Results Count */}
      <p className="text-gray-600 mb-4">
        {filteredLeagues.length}{" "}
        {filteredLeagues.length === 1 ? "league" : "leagues"} found
      </p>

      {/* Leagues Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredLeagues.map((league) => (
          <LeagueCard
            key={league.idLeague}
            idLeague={league.idLeague}
            strLeague={league.strLeague}
            strSport={league.strSport}
            strLeagueAlternate={league.strLeagueAlternate}
            onCardClick={handleCardClick}
          />
        ))}
      </div>

      {/* No Results Message */}
      {filteredLeagues.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">
            No leagues found matching your search.
          </p>
        </div>
      )}
    </div>
  );
}
