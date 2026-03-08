import React, { useMemo, useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { players, games } from './data/games.js';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';

const TOTAL_TOURNAMENT_NIGHTS = 15;

const PLAYER_COLORS = [
  '#ff6b6b',
  '#feca57',
  '#1dd1a1',
  '#54a0ff',
  '#5f27cd',
  '#ff9ff3',
  '#48dbfb',
  '#00d2d3',
  '#ff9f43',
  '#ee5253'
];

const AppContainer = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 32px 20px 40px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Header = styled.header`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
`;
  
const TitleGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Title = styled.h1`
  font-size: 1.9rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: #e2e8f0;
`;

const Subtitle = styled.p`
  color: var(--muted);
  max-width: 520px;
  font-size: 0.95rem;
`;

const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: radial-gradient(circle at top left, #22c55e, #16a34a);
  color: #e5f9ed;
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
`;

const Layout = styled.main`
  display: grid;
  grid-template-columns: minmax(0, 1.3fr) minmax(0, 1.7fr);
  gap: 24px;

  @media (max-width: 960px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

const Card = styled.section`
  background: radial-gradient(circle at top left, #111827, #020617 55%, #000 100%);
  border-radius: var(--card-radius);
  border: 1px solid rgba(148, 163, 184, 0.2);
  box-shadow:
    0 18px 40px rgba(15, 23, 42, 0.7),
    0 0 0 1px rgba(15, 23, 42, 0.6) inset;
  padding: 18px 20px 16px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  backdrop-filter: blur(16px);
`;

const CardHeader = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
`;

const CardTitle = styled.h2`
  font-size: 1.05rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: #e5e7eb;
`;

const CardMeta = styled.p`
  font-size: 0.8rem;
  color: var(--muted);
`;

const TableWrapper = styled.div`
  border-radius: 14px;
  overflow: auto;
  border: 1px solid rgba(30, 64, 175, 0.7);
  box-shadow: 0 0 0 1px rgba(15, 23, 42, 0.8);
`;

const StandingsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.84rem;
  min-width: 560px;
  background: #020617;
`;

const Th = styled.th`
  text-align: left;
  padding: 10px 12px;
  font-weight: 600;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 0.7rem;
  border-bottom: 1px solid rgba(55, 65, 81, 0.9);
`;

const Tr = styled.tr`
  &:nth-child(even) {
    background: rgba(15, 23, 42, 0.95);
  }

  &:hover {
    background: rgba(30, 64, 175, 0.4);
  }
`;

const Td = styled.td`
  padding: 8px 12px;
  border-bottom: 1px solid rgba(31, 41, 55, 0.7);
  color: #e5e7eb;
`;

const RankPill = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 700;
  color: #020617;
  ${({ rank }) => {
    if (rank === 1) return 'background: linear-gradient(135deg, #22c55e, #16a34a); color: #fff;';
    if (rank === 2) return 'background: linear-gradient(135deg, #facc15, #eab308); color: #020617;';
    if (rank === 3) return 'background: linear-gradient(135deg, #f97316, #ea580c); color: #fff;';
    if (rank === 7 || rank === 8) return 'background: rgba(239, 68, 68, 0.45); color: #fecaca;';
    if (rank === 9 || rank === 10) return 'background: linear-gradient(135deg, #dc2626, #b91c1c); color: #fff;';
    return 'background: #1f2937; color: #e5e7eb;';
  }}
`;

const PlayerName = styled.span`
  font-weight: 500;
`;

const StatPill = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 24px;
  padding: 3px 8px;
  border-radius: 999px;
  background: rgba(15, 23, 42, 0.9);
  border: 1px solid rgba(55, 65, 81, 0.9);
  font-size: 0.7rem;
  color: #e5e7eb;
`;

const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  grid-auto-rows: 240px;
  gap: 16px;

  @media (max-width: 960px) {
    grid-template-columns: minmax(0, 1fr);
  }

  @media (max-width: 640px) {
    grid-auto-rows: 220px;
  }
`;

const ChartCard = styled(Card)`
  padding: 14px 14px 10px;
`;

const ChartTitle = styled.h3`
  font-size: 0.8rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #9ca3af;
  margin-bottom: 6px;
`;

const ChartMeta = styled.p`
  font-size: 0.75rem;
  color: var(--muted);
  margin-bottom: 8px;
`;

const FiltersRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  margin-bottom: 8px;
`;

const FilterSelect = styled.select`
  background: #020617;
  border-radius: 999px;
  border: 1px solid rgba(55, 65, 81, 0.9);
  color: #e5e7eb;
  padding: 4px 12px;
  font-size: 0.75rem;
  outline: none;
  cursor: pointer;
`;

const NightDropdownWrap = styled.div`
  position: relative;
  margin-bottom: 8px;
`;

const NightSelectButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #020617;
  border-radius: 999px;
  border: 1px solid rgba(55, 65, 81, 0.9);
  color: #e5e7eb;
  padding: 6px 14px;
  font-size: 0.75rem;
  outline: none;
  cursor: pointer;
  min-width: 140px;

  &:hover {
    border-color: rgba(99, 102, 241, 0.6);
  }
`;

const NightDropdownPanel = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 4px;
  background: #0f172a;
  border: 1px solid rgba(55, 65, 81, 0.9);
  border-radius: 12px;
  padding: 8px 0;
  min-width: 160px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  z-index: 10;
`;

const NightOption = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  font-size: 0.8rem;
  color: #e5e7eb;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    background: rgba(30, 64, 175, 0.3);
  }

  input {
    accent-color: #6366f1;
    cursor: pointer;
  }
`;

const MiniStatRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 4px;
  font-size: 0.75rem;
  color: var(--muted);
`;

const MiniStat = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
`;

const Dot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: ${({ color }) => color || '#6366f1'};
`;

function computePlayerStats() {
  return players.map((name) => {
    let totalPoints = 0;
    let gamesPlayed = 0;
    let wins = 0;
    let seconds = 0;
    let thirds = 0;

    games.forEach((game) => {
      const value = game.pointsByPlayer[name];
      if (value === 'x') return;
      gamesPlayed += 1;
      const numeric = typeof value === 'number' ? value : 0;
      totalPoints += numeric;
      if (numeric === 4) wins += 1;
      else if (numeric === 2) seconds += 1;
      else if (numeric === 1) thirds += 1;
    });

    const avgPoints = gamesPlayed ? totalPoints / gamesPlayed : 0;

    return {
      name,
      totalPoints,
      gamesPlayed,
      wins,
      seconds,
      thirds,
      avgPoints: Number(avgPoints.toFixed(2))
    };
  });
}

function buildCumulativeLineData(sortedPlayers) {
  const topNames = sortedPlayers.slice(0, 4).map((p) => p.name);
  const cumulative = Object.fromEntries(topNames.map((n) => [n, 0]));

  return games.map((game, index) => {
    const pointObject = {};
    topNames.forEach((name) => {
      const value = game.pointsByPlayer[name];
      const numeric = typeof value === 'number' ? value : 0;
      cumulative[name] += numeric;
      pointObject[name] = cumulative[name];
    });

    return {
      game: `G${index + 1}`,
      ...pointObject
    };
  });
}

function buildPerGamePotDistribution() {
  return games.map((game, index) => {
    let pot = 0;
    Object.values(game.pointsByPlayer).forEach((val) => {
      if (typeof val === 'number') pot += val;
    });
    return {
      totalPot: pot
    };
  });
}

function buildPointsByDay() {
  const byDay = {};
  games.forEach((game) => {
    const dayId = game.dayId ?? 1;
    if (!byDay[dayId]) {
      byDay[dayId] = { dayId, day: `Night ${dayId}`, totalPoints: 0, gamesCount: 0 };
    }
    byDay[dayId].gamesCount += 1;
    Object.values(game.pointsByPlayer).forEach((val) => {
      if (typeof val === 'number') byDay[dayId].totalPoints += val;
    });
  });
  return Object.keys(byDay)
    .map(Number)
    .sort((a, b) => a - b)
    .map((dayId) => byDay[dayId]);
}

function buildPointsByDayByPlayer() {
  const dayIds = [...new Set(games.map((g) => g.dayId ?? 1))].sort((a, b) => a - b);
  return dayIds.map((dayId) => {
    const dayGames = games.filter((g) => (g.dayId ?? 1) === dayId);
    const pointsByPlayer = {};
    players.forEach((name) => {
      pointsByPlayer[name] = dayGames.reduce((sum, game) => {
        const v = game.pointsByPlayer[name];
        return sum + (typeof v === 'number' ? v : 0);
      }, 0);
    });
    return {
      day: `Night ${dayId}`,
      dayId,
      ...pointsByPlayer
    };
  });
}

const App = () => {
  const [highlightedPlayer, setHighlightedPlayer] = useState('ALL');
  const [selectedNightIds, setSelectedNightIds] = useState([]);
  const [nightsDropdownOpen, setNightsDropdownOpen] = useState(false);
  const nightsDropdownRef = useRef(null);

  useEffect(() => {
    if (!nightsDropdownOpen) return;
    const handleClickOutside = (e) => {
      if (nightsDropdownRef.current && !nightsDropdownRef.current.contains(e.target)) {
        setNightsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [nightsDropdownOpen]);

  const {
    sortedStats,
    barData,
    pieData,
    participationData,
    cumulativeLineData,
    potDistribution,
    pointsByDay,
    pointsByDayByPlayer,
    nightIds,
    totalGames
  } = useMemo(() => {
    const stats = computePlayerStats();
    const sorted = [...stats].sort((a, b) => b.totalPoints - a.totalPoints || b.wins - a.wins);

    const bar = sorted.map((p) => ({
      name: p.name,
      points: p.totalPoints
    }));

    const pie = sorted.map((p, index) => ({
      name: p.name,
      value: p.totalPoints || 0,
      color: PLAYER_COLORS[index % PLAYER_COLORS.length]
    }));

    const participation = sorted.map((p) => ({
      name: p.name,
      games: p.gamesPlayed
    }));

    const lineData = buildCumulativeLineData(sorted);
    const pot = buildPerGamePotDistribution();
    const byDay = buildPointsByDay();
    const byDayByPlayer = buildPointsByDayByPlayer();

    return {
      sortedStats: sorted,
      barData: bar,
      pieData: pie,
      participationData: participation,
      cumulativeLineData: lineData,
      potDistribution: pot,
      pointsByDay: byDay,
      pointsByDayByPlayer: byDayByPlayer,
      nightIds: byDayByPlayer.map((r) => r.dayId),
      totalGames: games.length
    };
  }, []);

  const topPerformer = sortedStats[0];
  const mostConsistent = [...sortedStats].sort(
    (a, b) => b.avgPoints - a.avgPoints || b.gamesPlayed - a.gamesPlayed
  )[0];

  const filteredBarData =
    highlightedPlayer === 'ALL'
      ? barData
      : barData.filter((entry) => entry.name === highlightedPlayer);

  const filteredParticipationData =
    highlightedPlayer === 'ALL'
      ? participationData
      : participationData.filter((entry) => entry.name === highlightedPlayer);

  const filteredPointsByDayByPlayer =
    selectedNightIds.length === 0
      ? pointsByDayByPlayer
      : pointsByDayByPlayer.filter((row) => selectedNightIds.includes(row.dayId));

  const toggleNight = (dayId) => {
    if (selectedNightIds.length === 0) {
      setSelectedNightIds(nightIds.filter((id) => id !== dayId));
    } else if (selectedNightIds.includes(dayId)) {
      setSelectedNightIds(selectedNightIds.filter((id) => id !== dayId));
    } else {
      const next = [...selectedNightIds, dayId].sort((a, b) => a - b);
      setSelectedNightIds(next.length === nightIds.length ? [] : next);
    }
  };

  const selectAllNights = () => setSelectedNightIds([]);
  const nightButtonLabel =
    selectedNightIds.length === 0 || selectedNightIds.length === nightIds.length
      ? 'All nights'
      : selectedNightIds.map((id) => `Night ${id}`).join(', ');

  return (
    <AppContainer>
      <Header>
        <TitleGroup>
          <Title>Poker Nights Dashboard</Title>
          <Subtitle>
            Live-style overview of weekly games between Antonio, Amiklat, Ardit, Arber, Ervir,
            Elvis, Duli, Denis, Landi and Gesti. Points are awarded 4-2-1 for the top three, 0 for
            other attendees, and &apos;x&apos; for absentees.
          </Subtitle>
        </TitleGroup>
        <div>
          <Badge>
            <span>{nightIds.length}/{TOTAL_TOURNAMENT_NIGHTS} nights played</span>
          </Badge>
        </div>
      </Header>

      <Layout>
        <Card>
          <CardHeader>
            <CardTitle>Overall Standings</CardTitle>
            <CardMeta>
              Sorted by total points, then wins. Hover rows and charts to explore performance.
            </CardMeta>
          </CardHeader>

          <TableWrapper>
            <StandingsTable>
              <thead>
                <Tr>
                  <Th>#</Th>
                  <Th>Player</Th>
                  <Th>Total</Th>
                  <Th>Gms</Th>
                  <Th>1st</Th>
                  <Th>2nd</Th>
                  <Th>3rd</Th>
                  <Th>Avg / game</Th>
                </Tr>
              </thead>
              <tbody>
                {sortedStats.map((player, index) => (
                  <Tr key={player.name}>
                    <Td>
                      <RankPill rank={index + 1}>{index + 1}</RankPill>
                    </Td>
                    <Td>
                      <PlayerName>{player.name}</PlayerName>
                    </Td>
                    <Td>
                      <StatPill>{player.totalPoints}</StatPill>
                    </Td>
                    <Td>{player.gamesPlayed}</Td>
                    <Td>{player.wins}</Td>
                    <Td>{player.seconds}</Td>
                    <Td>{player.thirds}</Td>
                    <Td>{player.avgPoints.toFixed(2)}</Td>
                  </Tr>
                ))}
              </tbody>
            </StandingsTable>
          </TableWrapper>

          <MiniStatRow>
            <MiniStat>
              <Dot color="#facc15" />
              <span>
                Top performer: <strong>{topPerformer.name}</strong> ({topPerformer.totalPoints}{' '}
                pts)
              </span>
            </MiniStat>
            <MiniStat>
              <Dot color="#22c55e" />
              <span>
                Most consistent: <strong>{mostConsistent.name}</strong> (
                {mostConsistent.avgPoints.toFixed(2)} pts / game)
              </span>
            </MiniStat>
          </MiniStatRow>
        </Card>

        <div>
          <ChartsGrid>
            <ChartCard>
              <ChartTitle>Points by Player</ChartTitle>
              <ChartMeta>Bar chart of total points across all games.</ChartMeta>
              <FiltersRow>
                <FilterSelect
                  value={highlightedPlayer}
                  onChange={(e) => setHighlightedPlayer(e.target.value)}
                >
                  <option value="ALL">All players</option>
                  {players.map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </FilterSelect>
              </FiltersRow>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={filteredBarData} margin={{ top: 10, right: 10, left: -16, bottom: 4 }}>
                  <XAxis dataKey="name" tick={{ fill: '#9ca3af', fontSize: 10 }} />
                  <YAxis tick={{ fill: '#9ca3af', fontSize: 10 }} />
                  <Tooltip
                    contentStyle={{
                      background: '#020617',
                      border: '1px solid #1f2937',
                      borderRadius: 12,
                      fontSize: 12
                    }}
                  />
                  <Bar dataKey="points" radius={[6, 6, 0, 0]}>
                    {filteredBarData.map((entry, index) => (
                      <Cell
                        key={`cell-${entry.name}`}
                        fill={PLAYER_COLORS[index % PLAYER_COLORS.length]}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard>
              <ChartTitle>Share of Total Points</ChartTitle>
              <ChartMeta>Donut chart showing how the pot is split over time.</ChartMeta>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius="55%"
                    outerRadius="80%"
                    paddingAngle={2}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`slice-${entry.name}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Legend
                    verticalAlign="bottom"
                    height={32}
                    wrapperStyle={{ fontSize: 10, paddingTop: 4 }}
                  />
                  <Tooltip
                    formatter={(value) => [`${value} pts`, 'Points']}
                    contentStyle={{
                      background: '#020617',
                      border: '1px solid #1f2937',
                      borderRadius: 12,
                      fontSize: 12
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard>
              <ChartTitle>Cumulative Points Over Games</ChartTitle>
              <ChartMeta>Line chart for the top 4 players as the league progresses.</ChartMeta>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={cumulativeLineData}
                  margin={{ top: 10, right: 16, left: -6, bottom: 4 }}
                >
                  <XAxis dataKey="game" tick={{ fill: '#9ca3af', fontSize: 10 }} />
                  <YAxis tick={{ fill: '#9ca3af', fontSize: 10 }} />
                  <Tooltip
                    contentStyle={{
                      background: '#020617',
                      border: '1px solid #1f2937',
                      borderRadius: 12,
                      fontSize: 12
                    }}
                  />
                  {sortedStats.slice(0, 4).map((player, index) => (
                    <Line
                      key={player.name}
                      type="monotone"
                      dataKey={player.name}
                      name={player.name}
                      stroke={PLAYER_COLORS[index % PLAYER_COLORS.length]}
                      strokeWidth={2}
                      dot={false}
                      activeDot={{ r: 4 }}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard>
              <ChartTitle>Participation & Pot Size</ChartTitle>
              <ChartMeta>Area chart of games played and total points awarded per game.</ChartMeta>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={potDistribution.map((game, index) => ({
                    game: `G${index + 1}`,
                    totalPot: game.totalPot,
                    avgGamesPlayed:
                      players.filter((name) => games[index].pointsByPlayer[name] !== 'x').length
                  }))}
                  margin={{ top: 10, right: 16, left: -6, bottom: 4 }}
                >
                  <XAxis dataKey="game" tick={{ fill: '#9ca3af', fontSize: 10 }} />
                  <YAxis tick={{ fill: '#9ca3af', fontSize: 10 }} />
                  <Tooltip
                    contentStyle={{
                      background: '#020617',
                      border: '1px solid #1f2937',
                      borderRadius: 12,
                      fontSize: 12
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="totalPot"
                    name="Total points paid"
                    stroke="#22c55e"
                    fill="rgba(34, 197, 94, 0.35)"
                    strokeWidth={2}
                  />
                  <Area
                    type="monotone"
                    dataKey="avgGamesPlayed"
                    name="Players present"
                    stroke="#3b82f6"
                    fill="rgba(59, 130, 246, 0.3)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard>
              <ChartTitle>Points per night</ChartTitle>
              <ChartMeta>Total points awarded each night (by dayId).</ChartMeta>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={pointsByDay}
                  margin={{ top: 10, right: 10, left: -16, bottom: 4 }}
                >
                  <XAxis dataKey="day" tick={{ fill: '#9ca3af', fontSize: 10 }} />
                  <YAxis tick={{ fill: '#9ca3af', fontSize: 10 }} />
                  <Tooltip
                    contentStyle={{
                      background: '#020617',
                      border: '1px solid #1f2937',
                      borderRadius: 12,
                      fontSize: 12
                    }}
                    formatter={(value, name) => {
                      if (name === 'gamesCount') return [value, 'Games'];
                      return [value, 'Total points'];
                    }}
                    labelFormatter={(label, payload) =>
                      payload?.[0] ? `${label} (${payload[0].payload.gamesCount} games)` : label
                    }
                  />
                  <Bar dataKey="totalPoints" fill="#22c55e" radius={[6, 6, 0, 0]} name="Total points" />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard>
              <ChartTitle>Points by player per night</ChartTitle>
              <ChartMeta>Stacked bar: each player&apos;s points per night.</ChartMeta>
              <NightDropdownWrap ref={nightsDropdownRef}>
                <NightSelectButton type="button" onClick={() => setNightsDropdownOpen((o) => !o)}>
                  <span>Nights: {nightButtonLabel}</span>
                </NightSelectButton>
                {nightsDropdownOpen && (
                  <NightDropdownPanel>
                    <NightOption>
                      <input
                        type="checkbox"
                        checked={selectedNightIds.length === 0}
                        onChange={selectAllNights}
                      />
                      <span>All nights</span>
                    </NightOption>
                    {nightIds.map((dayId) => (
                      <NightOption key={dayId}>
                        <input
                          type="checkbox"
                          checked={selectedNightIds.length === 0 || selectedNightIds.includes(dayId)}
                          onChange={() => toggleNight(dayId)}
                        />
                        <span>Night {dayId}</span>
                      </NightOption>
                    ))}
                  </NightDropdownPanel>
                )}
              </NightDropdownWrap>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={filteredPointsByDayByPlayer}
                  margin={{ top: 10, right: 10, left: -16, bottom: 4 }}
                >
                  <XAxis dataKey="day" tick={{ fill: '#9ca3af', fontSize: 10 }} />
                  <YAxis tick={{ fill: '#9ca3af', fontSize: 10 }} />
                  <Tooltip
                    contentStyle={{
                      background: '#020617',
                      border: '1px solid #1f2937',
                      borderRadius: 12,
                      fontSize: 12
                    }}
                  />
                  <Legend
                    verticalAlign="bottom"
                    height={36}
                    wrapperStyle={{ fontSize: 9 }}
                  />
                  {players.map((name, index) => (
                    <Bar
                      key={name}
                      dataKey={name}
                      stackId="night"
                      fill={PLAYER_COLORS[index % PLAYER_COLORS.length]}
                      radius={index === players.length - 1 ? [6, 6, 0, 0] : 0}
                      name={name}
                    />
                  ))}
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </ChartsGrid>
        </div>
      </Layout>
    </AppContainer>
  );
};

export default App;

