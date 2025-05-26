import { useState, memo } from "react";
import { STRINGS } from "../../constants/strings";

interface SeasonCardProps {
  season: {
    strSeason: string;
    strBadge?: string;
  };
  isSelected: boolean;
  onClick: (season: { strSeason: string; strBadge?: string }) => void;
}

function SeasonCard({ season, isSelected, onClick }: SeasonCardProps) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  return (
    <button
      onClick={() => onClick(season)}
      className={`flex flex-col items-center p-2 rounded-lg ${
        isSelected ? "bg-blue-100 ring-2 ring-blue-500" : "hover:bg-gray-100"
      }`}
      aria-label={`Select ${season.strSeason} season${
        isSelected ? " (currently selected)" : ""
      }`}
    >
      <div className="w-16 h-16">
        {!isImageLoaded && !imageError && (
          <div className="w-full h-full bg-gray-200 animate-pulse rounded" />
        )}

        {imageError && (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center rounded">
            <span className="text-gray-400 text-xs">
              {STRINGS.NO_IMAGE_AVAILABLE}
            </span>
          </div>
        )}

        {season.strBadge && !imageError && (
          <img
            src={season.strBadge}
            alt={`${STRINGS.SEASON_BADGE_ALT_TEXT_PREFIX} ${season.strSeason}${STRINGS.SEASON_BADGE_ALT_TEXT_SUFFIX}`}
            className={`w-full h-full object-contain ${
              isImageLoaded ? "opacity-100" : "opacity-0"
            }`}
            loading="lazy"
            onLoad={() => setIsImageLoaded(true)}
            onError={() => setImageError(true)}
          />
        )}
      </div>
      <span className="text-sm">{season.strSeason}</span>
    </button>
  );
}

export default memo(SeasonCard);
