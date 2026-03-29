import React, { useMemo, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { players, games } from '../data/games.js';
import { PLAYER_COLORS } from '../constants';
import { getMaxNightFromGames } from '../pokerStats';
import {
  ChartCard,
  ChartTitle,
  ChartMeta,
  NightStandingsToolbar,
  NightStandingsLabel,
  FilterSelect
} from './dashboardStyles';

export function NightStandingsWidget() {
  const cumulativeChartMaxNight = useMemo(() => getMaxNightFromGames(), []);

  const [standingsNightId, setStandingsNightId] = useState(() => getMaxNightFromGames());

  const { standingsNightBarData, standingsNightGameCount, standingsNightBarMax } = useMemo(() => {
    const nightGames = games.filter((g) => (g.dayId ?? 1) === standingsNightId);
    const rows = players
      .map((name) => {
        let pts = 0;
        let gamesPlayedThatNight = 0;
        nightGames.forEach((game) => {
          const v = game.pointsByPlayer[name];
          if (typeof v === 'number') {
            pts += v;
            gamesPlayedThatNight += 1;
          }
        });
        return { name, pts, gamesPlayedThatNight };
      })
      .filter((r) => r.gamesPlayedThatNight >= 1)
      .map(({ name, pts }) => ({ name, pts }));
    const sortedLowToHigh = [...rows].sort((a, b) => a.pts - b.pts || a.name.localeCompare(b.name));
    const maxPts = sortedLowToHigh.reduce((m, r) => Math.max(m, r.pts), 0);
    const standingsNightBarMax = Math.max(7, Math.ceil(maxPts / 2) * 2);
    return {
      standingsNightBarData: sortedLowToHigh,
      standingsNightGameCount: nightGames.length,
      standingsNightBarMax
    };
  }, [standingsNightId]);

  return (
    <ChartCard>
      <ChartTitle>Night standings</ChartTitle>
      <ChartMeta>
        Total points that night (all games). Only players who played at least one game appear;
        absent nights are omitted. Best score at the top.
      </ChartMeta>
      <NightStandingsToolbar>
        <NightStandingsLabel>Night</NightStandingsLabel>
        <FilterSelect
          value={String(standingsNightId)}
          onChange={(e) => setStandingsNightId(Number(e.target.value))}
          aria-label="Night for standings chart"
        >
          {Array.from({ length: cumulativeChartMaxNight }, (_, i) => i + 1).map((n) => (
            <option key={n} value={String(n)}>
              Night {n}
            </option>
          ))}
        </FilterSelect>
        <NightStandingsLabel style={{ marginLeft: '4px' }}>
          {standingsNightGameCount} game{standingsNightGameCount === 1 ? '' : 's'}
        </NightStandingsLabel>
      </NightStandingsToolbar>
      {standingsNightGameCount === 0 ? (
        <ChartMeta>No games recorded for this night yet.</ChartMeta>
      ) : standingsNightBarData.length === 0 ? (
        <ChartMeta>No players recorded as playing this night.</ChartMeta>
      ) : (
        <ResponsiveContainer width="100%" minHeight={340} height={360}>
          <BarChart
            layout="vertical"
            data={standingsNightBarData}
            margin={{ top: 4, right: 12, left: 0, bottom: 4 }}
          >
            <XAxis
              type="number"
              domain={[0, standingsNightBarMax]}
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
                const n = row.pts;
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
                      Points this night
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
                        {n === 1 ? 'pt' : 'pts'}
                      </span>
                    </div>
                  </div>
                );
              }}
            />
            <Bar dataKey="pts" radius={[0, 6, 6, 0]} name="Points">
              {standingsNightBarData.map((row) => (
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
