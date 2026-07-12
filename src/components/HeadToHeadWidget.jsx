import React, { useMemo, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PLAYER_COLORS } from '../constants';
import { useSeason } from '../SeasonContext';
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
  const { season, stats } = useSeason();
  const { players } = season;

  const chartSorted = useMemo(
    () =>
      [...stats.computePlayerStats()].sort(
        (a, b) => b.totalPoints - a.totalPoints || b.wins - a.wins
      ),
    [stats]
  );

  const [h2hLeft, setH2hLeft] = useState(() => chartSorted[0]?.name ?? players[0]);
  const [h2hRight, setH2hRight] = useState(() => chartSorted[1]?.name ?? players[1]);

  const h2h = useMemo(
    () => stats.countHeadToHead(h2hLeft, h2hRight),
    [stats, h2hLeft, h2hRight]
  );

  const pieData = useMemo(() => {
    if (h2h.gamesCompared === 0) return [];
    return [
      { name: h2hLeft, value: h2h.winsA },
      { name: h2hRight, value: h2h.winsB },
      ...(h2h.ties > 0 ? [{ name: 'Ties', value: h2h.ties }] : [])
    ];
  }, [h2h, h2hLeft, h2hRight]);

  const leftColor = PLAYER_COLORS[players.indexOf(h2hLeft) % PLAYER_COLORS.length];
  const rightColor = PLAYER_COLORS[players.indexOf(h2hRight) % PLAYER_COLORS.length];

  return (
    <ChartCard>
      <ChartTitle>Head to head</ChartTitle>
      <ChartMeta>
        Compare two players when both finished on the podium in the same game. Higher placement
        wins that game.
      </ChartMeta>
      <H2HFilters>
        <FilterSelect value={h2hLeft} onChange={(e) => setH2hLeft(e.target.value)}>
          {players.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </FilterSelect>
        <H2HVs>vs</H2HVs>
        <FilterSelect value={h2hRight} onChange={(e) => setH2hRight(e.target.value)}>
          {players.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </FilterSelect>
      </H2HFilters>
      <H2HScoreArea>
        <H2HScoreRow>
          <H2HNameLabel $color={leftColor}>{h2hLeft}</H2HNameLabel>
          <H2HScoreNum>{h2h.winsA}</H2HScoreNum>
          <H2HScoreSep>–</H2HScoreSep>
          <H2HScoreNum>{h2h.winsB}</H2HScoreNum>
          <H2HNameLabel $color={rightColor}>{h2hRight}</H2HNameLabel>
        </H2HScoreRow>
        <H2HNamesRow>
          <H2HMeta>
            {h2h.gamesCompared === 0
              ? 'No shared podium games yet'
              : `${h2h.gamesCompared} game${h2h.gamesCompared === 1 ? '' : 's'} counted`}
          </H2HMeta>
        </H2HNamesRow>
      </H2HScoreArea>
      {pieData.length > 0 ? (
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={72}>
              {pieData.map((entry) => {
                let fill = '#64748b';
                if (entry.name === h2hLeft) fill = leftColor;
                else if (entry.name === h2hRight) fill = rightColor;
                return <Cell key={entry.name} fill={fill} />;
              })}
            </Pie>
            <Tooltip
              content={({ active, payload }) => {
                if (!active || !payload?.length) return null;
                const row = payload[0];
                const n = row.value;
                return (
                  <div
                    style={{
                      background: '#0f172a',
                      border: '1px solid #475569',
                      borderRadius: 12,
                      padding: '10px 14px'
                    }}
                  >
                    <div style={{ color: '#e2e8f0', fontWeight: 700 }}>{row.name}</div>
                    <div style={{ color: '#facc15', fontWeight: 700 }}>
                      {n} win{n === 1 ? '' : 's'}
                    </div>
                  </div>
                );
              }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      ) : null}
    </ChartCard>
  );
}
