import { memo } from "react";
import type { League } from "../types"; // Correct import path

interface LeagueCardProps {
  idLeague: League["idLeague"]; // Use League type
  strLeague: League["strLeague"]; // Use League type
  strSport: League["strSport"]; // Use League type
  strLeagueAlternate?: League["strLeagueAlternate"]; // Use League type
  onCardClick: (id: string) => void;
}

function LeagueCard({
  idLeague,
  strLeague,
  strSport,
  strLeagueAlternate,
  onCardClick,
}: LeagueCardProps) {
  return (
    <div
      onClick={() => onCardClick(idLeague)}
      className="bg-white p-4 rounded shadow cursor-pointer hover:shadow-lg min-w-[280px]"
      role="button"
      aria-label={`View details for ${strLeague} (${strSport})`}
      tabIndex={0}
    >
      <h2 className="text-lg font-semibold">{strLeague}</h2>
      <p className="text-sm text-gray-600">{strSport}</p>
      {strLeagueAlternate && (
        <p className="text-xs text-gray-400 italic">{strLeagueAlternate}</p>
      )}
    </div>
  );
}

export default memo(LeagueCard);
