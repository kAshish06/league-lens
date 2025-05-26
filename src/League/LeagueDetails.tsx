import { useState, useCallback } from "react";
import { useParams } from "react-router";
import { useLeagueBadgeQuery } from "./queries/leagueBadgeQuery";
import LoadingSpinner from "../components/LoadingSpinner";
import SeasonCard from "./components/SeasonCard";
import type { Season } from "./types";
import { STRINGS } from "../constants/strings";

export default function LeagueDetails() {
  const { id } = useParams();
  const { data: seasons, isLoading, isError } = useLeagueBadgeQuery(id || "");
  const [selectedSeason, setSelectedSeason] = useState<Season | null>(null);
  const [isMainImageLoaded, setIsMainImageLoaded] = useState(false);
  const [mainImageError, setMainImageError] = useState(false);

  const handleSeasonSelect = useCallback((season: Season) => {
    setSelectedSeason(season);
  }, []);

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <p>{STRINGS.ERROR_LOADING_LEAGUE_BADGE}</p>;
  if (!seasons?.length) return <p>{STRINGS.NO_SEASONS_FOUND}</p>;

  // Set initial season if not set
  if (!selectedSeason) {
    setSelectedSeason(seasons[0]);
  }

  return (
    <div className="h-screen flex flex-col">
      <div className="flex-none bg-white shadow-sm">
        <div className="container mx-auto p-4">
          <div className="flex flex-col items-center">
            <div className="w-72 h-48">
              {!isMainImageLoaded && !mainImageError && (
                <div className="w-full h-full bg-gray-200 animate-pulse rounded" />
              )}

              {mainImageError && (
                <div className="w-full h-full bg-gray-100 flex items-center justify-center rounded">
                  <span className="text-gray-400">
                    {STRINGS.NO_BADGE_AVAILABLE}
                  </span>
                </div>
              )}

              {selectedSeason?.strBadge && !mainImageError && (
                <img
                  src={selectedSeason.strBadge}
                  alt={`${STRINGS.SEASON_BADGE_ALT_TEXT_PREFIX} ${selectedSeason.strSeason} Badge`}
                  className={`w-full h-full object-contain ${
                    isMainImageLoaded ? "opacity-100" : "opacity-0"
                  }`}
                  onLoad={() => setIsMainImageLoaded(true)}
                  onError={() => setMainImageError(true)}
                />
              )}
            </div>
            <h2 className="text-xl font-semibold mt-4">
              {selectedSeason?.strSeason}
            </h2>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="container mx-auto p-4">
          <h3 className="text-lg font-medium mb-4">
            {STRINGS.ALL_SEASONS_TITLE}
          </h3>
          <div className="w-full max-w-2xl mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {seasons.map((season, index) => (
                <SeasonCard
                  key={`${season.strSeason}-${index}`}
                  season={season}
                  isSelected={season.strSeason === selectedSeason?.strSeason}
                  onClick={handleSeasonSelect}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
