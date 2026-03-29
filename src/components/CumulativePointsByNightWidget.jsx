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
import { players } from '../data/games.js';
import { PLAYER_COLORS } from '../constants';
import { buildCumulativeLineDataByNight } from '../pokerStats';
import { ChartCard, ChartTitle, ChartMeta } from './dashboardStyles';

export function CumulativePointsByNightWidget() {
  const { cumulativeLineData, cumulativeChartMaxNight, cumulativeChartMaxY } = useMemo(() => {
    const { rows: lineData, maxNight } = buildCumulativeLineDataByNight();
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
  }, []);

  return (
    <ChartCard>
      <ChartTitle>Cumulative Points by Night</ChartTitle>
      <ChartMeta>
        Running totals after each night (all {players.length} players). Axis shows Night 1–
        {cumulativeChartMaxNight} from your data ({cumulativeChartMaxNight} night
        {cumulativeChartMaxNight === 1 ? '' : 's'}).
      </ChartMeta>
      <ResponsiveContainer width="100%" height="100%" minHeight={500}>
        <LineChart data={cumulativeLineData} margin={{ top: 10, right: 6, left: -10, bottom: 36 }}>
          <XAxis
            dataKey="night"
            tick={{ fill: '#9ca3af', fontSize: 9 }}
            angle={-40}
            textAnchor="end"
            height={54}
            interval={0}
            axisLine={{ stroke: '#475569' }}
            tickLine={{ stroke: '#475569' }}
          />
          <YAxis
            domain={[0, cumulativeChartMaxY]}
            ticks={Array.from(
              { length: Math.floor(cumulativeChartMaxY / 10) + 1 },
              (_, i) => i * 10
            )}
            tick={{ fill: '#94a3b8', fontSize: 10 }}
            tickLine={{ stroke: '#475569' }}
            axisLine={{ stroke: '#475569' }}
            width={48}
            allowDecimals={false}
          />
          <Tooltip
            content={({ active, label, payload }) => {
              if (!active || !payload?.length) return null;
              const sorted = [...payload].sort((a, b) => {
                const va = Number(a.value);
                const vb = Number(b.value);
                const na = Number.isFinite(va) ? va : 0;
                const nb = Number.isFinite(vb) ? vb : 0;
                if (nb !== na) return nb - na;
                return String(a.name ?? a.dataKey).localeCompare(String(b.name ?? b.dataKey));
              });
              return (
                <div
                  style={{
                    background: '#0f172a',
                    border: '1px solid #475569',
                    borderRadius: 12,
                    padding: '12px 14px',
                    boxShadow: '0 12px 28px rgba(0,0,0,0.45)',
                    minWidth: 160
                  }}
                >
                  <div
                    style={{
                      color: '#94a3b8',
                      fontSize: 11,
                      fontWeight: 600,
                      marginBottom: 10,
                      letterSpacing: '0.02em'
                    }}
                  >
                    {label}
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 6
                    }}
                  >
                    {sorted.map((entry) => {
                      const pts = entry.value;
                      const n = Number(pts);
                      const text =
                        pts == null || pts === '' || !Number.isFinite(n)
                          ? '—'
                          : `${n} pt${n === 1 ? '' : 's'}`;
                      return (
                        <div
                          key={String(entry.dataKey)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: 16,
                            fontSize: 12
                          }}
                        >
                          <span
                            style={{
                              color: entry.color ?? '#e2e8f0',
                              fontWeight: 600
                            }}
                          >
                            {entry.name}
                          </span>
                          <span
                            style={{
                              color: '#e2e8f0',
                              fontVariantNumeric: 'tabular-nums',
                              fontWeight: 700
                            }}
                          >
                            {text}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            }}
          />
          <Legend
            verticalAlign="bottom"
            align="center"
            layout="horizontal"
            height={72}
            iconType="circle"
            iconSize={8}
            wrapperStyle={{
              paddingTop: 8,
              fontSize: 10,
              color: '#e2e8f0',
              lineHeight: 1.5,
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '4px 12px',
              maxHeight: 68,
              overflowY: 'auto'
            }}
          />
          {players.map((name, index) => (
            <Line
              key={name}
              type="monotone"
              dataKey={name}
              name={name}
              stroke={PLAYER_COLORS[index % PLAYER_COLORS.length]}
              strokeWidth={1}
              dot={false}
              activeDot={{ r: 6 }}
              connectNulls
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
