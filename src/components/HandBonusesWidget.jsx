import React, { useMemo } from 'react';
import { useSeason } from '../SeasonContext';
import { ChartCard, ChartTitle, ChartMeta, TableWrapper, StandingsTable, Th, Tr, Td } from './dashboardStyles';

export function HandBonusesWidget() {
  const { season, stats } = useSeason();
  const { bonuses, hasPoBonus } = season;

  const events = useMemo(() => {
    const list = stats.buildHandBonusEvents();
    return [...list].sort((a, b) => b.gameId - a.gameId || a.player.localeCompare(b.player));
  }, [stats]);

  const bonusSummary = hasPoBonus
    ? `Royal flush (+${bonuses.RF} pts), straight flush (+${bonuses.SF} pts), and poker (+${bonuses.PO} pt) by game.`
    : `Royal flush (+${bonuses.RF} pts) and straight flush (+${bonuses.SF} pts) by game.`;

  return (
    <ChartCard style={{ display: 'none' }}>
      <ChartTitle>RF / SF{hasPoBonus ? ' / PO' : ''} log</ChartTitle>
      <ChartMeta>
        {bonusSummary} Bonuses are included in totals and night charts when the player played that
        game.
      </ChartMeta>
      {events.length === 0 ? (
        <ChartMeta>No hand bonuses recorded in game data yet.</ChartMeta>
      ) : (
        <TableWrapper>
          <StandingsTable style={{ minWidth: 0 }}>
            <thead>
              <Tr>
                <Th>Game</Th>
                <Th>Night</Th>
                <Th>Player</Th>
                <Th>Type</Th>
                <Th>Pts</Th>
              </Tr>
            </thead>
            <tbody>
              {events.map((ev) => (
                <Tr key={`${ev.gameId}-${ev.type}-${ev.player}`}>
                  <Td>#{ev.gameId}</Td>
                  <Td>Night {ev.dayId}</Td>
                  <Td>{ev.player}</Td>
                  <Td>{ev.type}</Td>
                  <Td>{ev.points}</Td>
                </Tr>
              ))}
            </tbody>
          </StandingsTable>
        </TableWrapper>
      )}
    </ChartCard>
  );
}
