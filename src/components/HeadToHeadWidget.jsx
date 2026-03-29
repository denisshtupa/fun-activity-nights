import React, { useMemo, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { players } from '../data/games.js';
import { PLAYER_COLORS } from '../constants';
import { computePlayerStats, countHeadToHead } from '../pokerStats';
import {
  ChartCard,
  ChartTitle,
  ChartMeta,
  H2HFilters,
  FilterSelect,
  H2HVs,
  H2HScoreArea,
  H2HScoreRow,
  H2HNameLabel,
  H2HNamesRow,
  H2HScoreNum,
  H2HScoreSep,
  H2HMeta
} from './dashboardStyles';

export function HeadToHeadWidget() {
  const chartSorted = useMemo(
    () => [...computePlayerStats()].sort((a, b) => b.totalPoints - a.totalPoints || b.wins - a.wins),
    []
  );

  const [h2hLeft, setH2hLeft] = useState(() => chartSorted[0]?.name ?? players[0]);
  const [h2hRight, setH2hRight] = useState(() => chartSorted[1]?.name ?? players[1]);

  const h2h = useMemo(() => countHeadToHead(h2hLeft, h2hRight), [h2hLeft, h2hRight]);

  return (
    <ChartCard>
      <ChartTitle>Head to head</ChartTitle>
      <ChartMeta>
        Games where both players scored podium points (1st / 2nd / 3rd). Whoever had more points
        that game wins the matchup (+1).
      </ChartMeta>
      <H2HFilters>
        <FilterSelect
          value={h2hLeft}
          onChange={(e) => setH2hLeft(e.target.value)}
          aria-label="Head to head player 1"
        >
          {players.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </FilterSelect>
        <H2HVs>VS</H2HVs>
        <FilterSelect
          value={h2hRight}
          onChange={(e) => setH2hRight(e.target.value)}
          aria-label="Head to head player 2"
        >
          {players.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </FilterSelect>
      </H2HFilters>
      <H2HScoreArea>
        {h2hLeft === h2hRight ? (
          <H2HMeta>Select two different players to compare head to head.</H2HMeta>
        ) : (
          <>
            <H2HNamesRow>
              <H2HNameLabel>{h2hLeft}</H2HNameLabel>
              <H2HNameLabel>{h2hRight}</H2HNameLabel>
            </H2HNamesRow>
            <H2HScoreRow>
              <H2HScoreNum>{h2h.winsA}</H2HScoreNum>
              <H2HScoreSep>—</H2HScoreSep>
              <H2HScoreNum>{h2h.winsB}</H2HScoreNum>
            </H2HScoreRow>
            <H2HMeta>
              {h2h.gamesCompared === 0
                ? 'No games yet where both finished on the podium together.'
                : `${h2h.gamesCompared} game${h2h.gamesCompared === 1 ? '' : 's'} counted`}
              {h2h.ties > 0 ? ` · ${h2h.ties} tied` : ''}
            </H2HMeta>
            <ResponsiveContainer width="100%" height={160}>
              <PieChart margin={{ top: 4, right: 4, bottom: 4, left: 4 }}>
                <Pie
                  data={[
                    { name: h2hLeft, value: h2h.winsA },
                    { name: h2hRight, value: h2h.winsB }
                  ]}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={0}
                  outerRadius="78%"
                  paddingAngle={0}
                  stroke="none"
                >
                  <Cell fill={PLAYER_COLORS[players.indexOf(h2hLeft) % PLAYER_COLORS.length]} />
                  <Cell fill={PLAYER_COLORS[players.indexOf(h2hRight) % PLAYER_COLORS.length]} />
                </Pie>
                <Tooltip
                  cursor={false}
                  content={({ active, payload }) => {
                    if (!active || !payload?.length) return null;
                    const row = payload[0];
                    const n = Number(row.value);
                    const winsLabel = `${n} win${n === 1 ? '' : 's'}`;
                    return (
                      <div
                        style={{
                          background: '#0f172a',
                          border: '1px solid #475569',
                          borderRadius: 12,
                          padding: '10px 14px',
                          boxShadow: '0 12px 28px rgba(0,0,0,0.45)'
                        }}
                      >
                        <div
                          style={{
                            color: '#e2e8f0',
                            fontWeight: 700,
                            fontSize: 13,
                            marginBottom: 6
                          }}
                        >
                          {row.name}
                        </div>
                        <div
                          style={{
                            color: '#facc15',
                            fontSize: 18,
                            fontWeight: 700,
                            fontVariantNumeric: 'tabular-nums'
                          }}
                        >
                          {winsLabel}
                        </div>
                      </div>
                    );
                  }}
                />
                <Legend
                  verticalAlign="bottom"
                  height={28}
                  wrapperStyle={{ fontSize: 10, paddingTop: 4 }}
                />
              </PieChart>
            </ResponsiveContainer>
          </>
        )}
      </H2HScoreArea>
    </ChartCard>
  );
}
