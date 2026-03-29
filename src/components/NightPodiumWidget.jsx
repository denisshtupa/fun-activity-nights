import React, { useMemo, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { players, games } from '../data/games.js';
import { PLAYER_COLORS } from '../constants';
import {
  ChartCard,
  ChartTitle,
  ChartMeta,
  NightStandingsToolbar,
  NightStandingsLabel,
  FilterSelect
} from './dashboardStyles';

const PLACES = [
  { id: 'first', optionLabel: '1st place', pointsValue: 4, shortLabel: '1st places' },
  { id: 'second', optionLabel: '2nd place', pointsValue: 2, shortLabel: '2nd places' },
  { id: 'third', optionLabel: '3rd place', pointsValue: 1, shortLabel: '3rd places' }
];

function countPlaceAcrossGames(name, pointsValue) {
  let n = 0;
  games.forEach((game) => {
    if (game.pointsByPlayer[name] === pointsValue) n += 1;
  });
  return n;
}

export function NightPodiumWidget() {
  const [placeId, setPlaceId] = useState('first');
  const place = PLACES.find((p) => p.id === placeId) ?? PLACES[0];

  const { barData, barMax, gamesCount } = useMemo(() => {
    const rows = players.map((name) => ({
      name,
      count: countPlaceAcrossGames(name, place.pointsValue)
    }));
    const sortedLowToHigh = [...rows].sort(
      (a, b) => a.count - b.count || a.name.localeCompare(b.name)
    );
    const maxCount = sortedLowToHigh.reduce((m, r) => Math.max(m, r.count), 0);
    const barMax = Math.max(4, Math.ceil(maxCount));
    return {
      barData: sortedLowToHigh,
      barMax,
      gamesCount: games.length
    };
  }, [place.pointsValue]);

  return (
    <ChartCard>
      <ChartTitle>Podium finishes</ChartTitle>
      <ChartMeta>
        Pick a position below, counting that position over all games.
      </ChartMeta>
      <NightStandingsToolbar>
        <NightStandingsLabel>Position</NightStandingsLabel>
        <FilterSelect
          value={placeId}
          onChange={(e) => setPlaceId(e.target.value)}
          aria-label="Podium position filter"
        >
          {PLACES.map((p) => (
            <option key={p.id} value={p.id}>
              {p.optionLabel}
            </option>
          ))}
        </FilterSelect>
      </NightStandingsToolbar>
      {gamesCount === 0 ? (
        <ChartMeta>No games recorded yet.</ChartMeta>
      ) : (
        <ResponsiveContainer width="100%" minHeight={340} height={360}>
          <BarChart
            layout="vertical"
            data={barData}
            margin={{ top: 4, right: 12, left: 0, bottom: 4 }}
          >
            <XAxis
              type="number"
              domain={[0, barMax]}
              allowDecimals={false}
              tick={{ fill: '#94a3b8', fontSize: 10 }}
              axisLine={{ stroke: '#475569' }}
              tickLine={{ stroke: '#475569' }}
            />
            <YAxis
              type="category"
              dataKey="name"
              width={78}
              tick={{ fill: '#e2e8f0', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              reversed
            />
            <Tooltip
              cursor={{ fill: 'rgba(148, 163, 184, 0.12)' }}
              content={({ active, payload }) => {
                if (!active || !payload?.length) return null;
                const row = payload[0].payload;
                const n = row.count;
                return (
                  <div
                    style={{
                      background: '#0f172a',
                      border: '1px solid #475569',
                      borderRadius: 12,
                      padding: '12px 16px',
                      boxShadow: '0 12px 28px rgba(0,0,0,0.45)'
                    }}
                  >
                    <div
                      style={{
                        color: '#e2e8f0',
                        fontWeight: 700,
                        fontSize: 13,
                        marginBottom: 8
                      }}
                    >
                      {row.name}
                    </div>
                    <div style={{ color: '#94a3b8', fontSize: 11, marginBottom: 4 }}>
                      Total {place.shortLabel}
                    </div>
                    <div
                      style={{
                        color: '#facc15',
                        fontSize: 22,
                        fontWeight: 800,
                        lineHeight: 1,
                        fontVariantNumeric: 'tabular-nums'
                      }}
                    >
                      {n}
                      <span
                        style={{
                          fontSize: 13,
                          fontWeight: 600,
                          color: '#cbd5e1',
                          marginLeft: 6
                        }}
                      >
                        {n === 1 ? 'time' : 'times'}
                      </span>
                    </div>
                  </div>
                );
              }}
            />
            <Bar dataKey="count" radius={[0, 6, 6, 0]} name={place.optionLabel}>
              {barData.map((row) => (
                <Cell
                  key={row.name}
                  fill={PLAYER_COLORS[players.indexOf(row.name) % PLAYER_COLORS.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </ChartCard>
  );
}
