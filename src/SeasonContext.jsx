import React, { createContext, useContext, useMemo, useState } from 'react';
import { createPokerStatsEngine } from './pokerStats';
import { SEASONS } from './seasons';

const SeasonContext = createContext(null);

export function SeasonProvider({ children }) {
  const [seasonId, setSeasonId] = useState(3);
  const season = SEASONS[seasonId] ?? SEASONS[3];
  const stats = useMemo(() => createPokerStatsEngine(season), [seasonId]);

  const value = useMemo(
    () => ({
      seasonId,
      setSeasonId,
      season,
      stats
    }),
    [seasonId, season, stats]
  );

  return <SeasonContext.Provider value={value}>{children}</SeasonContext.Provider>;
}

export function useSeason() {
  const ctx = useContext(SeasonContext);
  if (!ctx) {
    throw new Error('useSeason must be used within SeasonProvider');
  }
  return ctx;
}
