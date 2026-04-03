import React, { useMemo } from 'react';
import { RF_BONUS_POINTS, SF_BONUS_POINTS } from '../constants';
import { buildHandBonusEvents } from '../pokerStats';
import { ChartCard, ChartTitle, ChartMeta, TableWrapper, StandingsTable, Th, Tr, Td } from './dashboardStyles';

export function HandBonusesWidget() {
  const events = useMemo(() => {
    const list = buildHandBonusEvents();
    return [...list].sort((a, b) => b.gameId - a.gameId || a.player.localeCompare(b.player));
  }, []);

  return (
    <ChartCard style={{ display: 'none' }}>
      <ChartTitle>RF / SF log</ChartTitle>
      <ChartMeta>
        Royal flush (+{RF_BONUS_POINTS} pts) and straight flush (+{SF_BONUS_POINTS} pts) by game.
        Bonuses are included in totals and night charts when the player played that game.
      </ChartMeta>
      {events.length === 0 ? (
        <ChartMeta>No RF or SF recorded in game data yet.</ChartMeta>
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
