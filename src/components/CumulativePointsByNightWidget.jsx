import React, { useMemo } from 'react';
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend
} from 'recharts';
import { PLAYER_COLORS } from '../constants';
import { useSeason } from '../SeasonContext';
import { ChartCard, ChartTitle, ChartMeta } from './dashboardStyles';

export function CumulativePointsByNightWidget() {
  const { season, stats } = useSeason();
  const { players } = season;

  const { cumulativeLineData, cumulativeChartMaxNight, cumulativeChartMaxY } = useMemo(() => {
    const { rows: lineData, maxNight } = stats.buildCumulativeLineDataByNight();
    let maxPoints = 0;
    lineData.forEach((row) => {
      players.forEach((p) => {
        maxPoints = Math.max(maxPoints, row[p] ?? 0);
      });
    });
    const cumulativeChartMaxY = Math.max(70, Math.ceil(maxPoints / 10) * 10);
    return {
      cumulativeLineData: lineData,
      cumulativeChartMaxNight: maxNight,
      cumulativeChartMaxY
    };
  }, [stats, players]);

  return (
    <ChartCard>
      <ChartTitle>Cumulative points by night</ChartTitle>
      <ChartMeta>
        Running total after each night ({cumulativeChartMaxNight} night
        {cumulativeChartMaxNight === 1 ? '' : 's'}).
      </ChartMeta>
      {cumulativeLineData.length === 0 ? (
        <ChartMeta>No games recorded yet.</ChartMeta>
      ) : (
        <ResponsiveContainer width="100%" minHeight={360} height={400}>
          <LineChart data={cumulativeLineData} margin={{ top: 8, right: 16, left: 0, bottom: 4 }}>
            <XAxis
              dataKey="night"
              tick={{ fill: '#94a3b8', fontSize: 10 }}
              axisLine={{ stroke: '#475569' }}
              tickLine={{ stroke: '#475569' }}
            />
            <YAxis
              domain={[0, cumulativeChartMaxY]}
              tick={{ fill: '#94a3b8', fontSize: 10 }}
              axisLine={{ stroke: '#475569' }}
              tickLine={{ stroke: '#475569' }}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (!active || !payload?.length) return null;
                const sorted = [...payload].sort((a, b) => (b.value ?? 0) - (a.value ?? 0));
                return (
                  <div
                    style={{
                      background: '#0f172a',
                      border: '1px solid #475569',
                      borderRadius: 12,
                      padding: '12px 16px',
                      boxShadow: '0 12px 28px rgba(0,0,0,0.45)',
                      maxWidth: 280
                    }}
                  >
                    <div
                      style={{
                        color: '#e2e8f0',
                        fontWeight: 700,
                        fontSize: 13,
                        marginBottom: 10
                      }}
                    >
                      {label}
                    </div>
                    {sorted.map((entry) => {
                      const n = entry.value ?? 0;
                      return (
                        <div
                          key={entry.dataKey}
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            gap: 16,
                            fontSize: 12,
                            marginBottom: 4,
                            color: '#cbd5e1'
                          }}
                        >
                          <span style={{ color: entry.color }}>{entry.dataKey}</span>
                          <span style={{ fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>
                            {n === 0
                              ? '0'
                              : `${n} pt${n === 1 ? '' : 's'}`}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                );
              }}
            />
            <Legend />
            {players.map((name, i) => (
              <Line
                key={name}
                type="monotone"
                dataKey={name}
                stroke={PLAYER_COLORS[i % PLAYER_COLORS.length]}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      )}
    </ChartCard>
  );
}
