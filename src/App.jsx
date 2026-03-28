import React, { useMemo, useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { players, games } from './data/games.js';
import {
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
  BarChart,
  Bar
} from 'recharts';

const TOTAL_TOURNAMENT_NIGHTS = 15;

// Order matches `players` in games.js — picked for clear separation (esp. Duli/Denis, Antonio/Gesti).
const PLAYER_COLORS = [
  '#f87171', // Antonio — coral red
  '#facc15', // Amiklat — yellow
  '#4ade80', // Ardit — green
  '#60a5fa', // Arber — blue
  '#c084fc', // Ervir — violet
  '#f472b6', // Elvis — pink
  '#38bdf8', // Duli — sky / cyan
  '#a3e635', // Denis — lime (far from cyan)
  '#fb923c', // Landi — orange
  '#e879f9' // Gesti — fuchsia (far from coral red)
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
  align-items: start;

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

const SortableTh = styled.th`
  text-align: left;
  padding: 10px 12px;
  font-weight: 600;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 0.7rem;
  border-bottom: 1px solid rgba(55, 65, 81, 0.9);
  cursor: pointer;
  user-select: none;
  white-space: nowrap;
  transition: color 0.15s ease, background 0.15s ease;

  &:hover {
    color: #e2e8f0;
    background: rgba(30, 64, 175, 0.2);
  }
`;

const ThInner = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
`;

const SortGlyph = styled.span`
  font-size: 0.65rem;
  opacity: ${({ $active }) => ($active ? 1 : 0.35)};
  color: ${({ $active }) => ($active ? '#a5b4fc' : 'inherit')};
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
  grid-auto-rows: minmax(260px, auto);
  gap: 16px;
  align-items: stretch;

  @media (max-width: 960px) {
    grid-template-columns: minmax(0, 1fr);
  }

  @media (max-width: 640px) {
    grid-auto-rows: minmax(240px, auto);
  }
`;

const NightStandingsToolbar = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
`;

const NightStandingsLabel = styled.span`
  font-size: 0.72rem;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
`;

const ChartCard = styled(Card)`
  padding: 14px 14px 10px;
  min-height: 0;
  display: flex;
  flex-direction: column;

  & .recharts-responsive-container {
    flex: 1;
    min-height: 140px;
  }
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

const H2HFilters = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 12px;
`;

const H2HVs = styled.span`
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: var(--muted);
`;

const H2HScoreArea = styled.div`
  flex: 1;
  min-height: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const H2HScoreRow = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 12px;
  font-variant-numeric: tabular-nums;
`;

const H2HNameLabel = styled.div`
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #94a3b8;
  max-width: 120px;
  text-align: center;
`;

const H2HNamesRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  max-width: 280px;
  gap: 16px;

  ${H2HNameLabel}:first-of-type {
    text-align: left;
  }

  ${H2HNameLabel}:last-of-type {
    text-align: right;
  }
`;

const H2HScoreNum = styled.span`
  font-size: 2rem;
  font-weight: 800;
  color: #e2e8f0;
  line-height: 1;
`;

const H2HScoreSep = styled.span`
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--muted);
`;

const H2HMeta = styled.p`
  font-size: 0.68rem;
  color: var(--muted);
  text-align: center;
  margin: 0;
  line-height: 1.45;
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

/** Highest night index present in game data (at least 1). Grows when you add nights. */
function getMaxNightFromGames() {
  if (games.length === 0) return 1;
  return Math.max(1, ...games.map((g) => g.dayId ?? 1));
}

/** Cumulative points after each night (Night 1 … max night in data); all players. */
function buildCumulativeLineDataByNight() {
  const maxNight = getMaxNightFromGames();
  const cumulative = Object.fromEntries(players.map((n) => [n, 0]));
  const rows = [];

  for (let night = 1; night <= maxNight; night++) {
    const nightGames = games.filter((g) => (g.dayId ?? 1) === night);
    if (nightGames.length > 0) {
      players.forEach((name) => {
        let add = 0;
        nightGames.forEach((game) => {
          const v = game.pointsByPlayer[name];
          if (typeof v === 'number') add += v;
        });
        cumulative[name] += add;
      });
    }
    rows.push({
      night: `Night ${night}`,
      ...players.reduce((acc, name) => {
        acc[name] = cumulative[name];
        return acc;
      }, {})
    });
  }

  return { rows, maxNight };
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

const TABLE_SORT_DEFAULTS = {
  name: 'asc',
  total: 'desc',
  gamesPlayed: 'desc',
  wins: 'desc',
  seconds: 'desc',
  thirds: 'desc',
  avgPoints: 'desc'
};

/** Games where both played (not absent); winner = more points in that game. */
function countHeadToHead(playerA, playerB) {
  if (!playerA || !playerB || playerA === playerB) {
    return { winsA: 0, winsB: 0, ties: 0, gamesCompared: 0 };
  }
  let winsA = 0;
  let winsB = 0;
  let ties = 0;
  for (const game of games) {
    const rawA = game.pointsByPlayer[playerA];
    const rawB = game.pointsByPlayer[playerB];
    if (rawA === 'x' || rawB === 'x') continue;
    const ptsA = typeof rawA === 'number' ? rawA : 0;
    const ptsB = typeof rawB === 'number' ? rawB : 0;
    const onPodium = (p) => p === 4 || p === 2 || p === 1;
    if (!onPodium(ptsA) || !onPodium(ptsB)) continue;
    if (ptsA > ptsB) winsA++;
    else if (ptsB > ptsA) winsB++;
    else ties++;
  }
  return { winsA, winsB, ties, gamesCompared: winsA + winsB + ties };
}

function comparePlayersForTable(a, b, sortKey, sortDir) {
  const flip = sortDir === 'asc' ? 1 : -1;
  if (sortKey === 'name') {
    const cmp = a.name.localeCompare(b.name);
    return sortDir === 'asc' ? cmp : -cmp;
  }
  let cmp = 0;
  switch (sortKey) {
    case 'total':
      cmp = a.totalPoints - b.totalPoints || a.wins - b.wins;
      break;
    case 'gamesPlayed':
      cmp = a.gamesPlayed - b.gamesPlayed || a.totalPoints - b.totalPoints;
      break;
    case 'wins':
      cmp = a.wins - b.wins || a.totalPoints - b.totalPoints;
      break;
    case 'seconds':
      cmp = a.seconds - b.seconds || a.totalPoints - b.totalPoints;
      break;
    case 'thirds':
      cmp = a.thirds - b.thirds || a.totalPoints - b.totalPoints;
      break;
    case 'avgPoints':
      cmp = a.avgPoints - b.avgPoints || a.gamesPlayed - b.gamesPlayed;
      break;
    default:
      return 0;
  }
  return flip * cmp;
}

const App = () => {
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
    playerStats,
    chartSortedPlayers,
    pieData,
    cumulativeLineData,
    cumulativeChartMaxNight,
    cumulativeChartMaxY,
    potDistribution,
    pointsByDay,
    pointsByDayByPlayer,
    nightIds
  } = useMemo(() => {
    const stats = computePlayerStats();
    const chartSorted = [...stats].sort((a, b) => b.totalPoints - a.totalPoints || b.wins - a.wins);

    const pie = chartSorted.map((p, index) => ({
      name: p.name,
      value: p.totalPoints || 0,
      color: PLAYER_COLORS[index % PLAYER_COLORS.length]
    }));

    const { rows: lineData, maxNight: cumulativeChartMaxNight } = buildCumulativeLineDataByNight();
    let maxPoints = 0;
    lineData.forEach((row) => {
      players.forEach((p) => {
        maxPoints = Math.max(maxPoints, row[p] ?? 0);
      });
    });
    const cumulativeChartMaxY = Math.max(
      70,
      Math.ceil(maxPoints / 10) * 10
    );

    const pot = buildPerGamePotDistribution();
    const byDay = buildPointsByDay();
    const byDayByPlayer = buildPointsByDayByPlayer();

    return {
      playerStats: stats,
      chartSortedPlayers: chartSorted,
      pieData: pie,
      cumulativeLineData: lineData,
      cumulativeChartMaxNight,
      cumulativeChartMaxY,
      potDistribution: pot,
      pointsByDay: byDay,
      pointsByDayByPlayer: byDayByPlayer,
      nightIds: byDayByPlayer.map((r) => r.dayId)
    };
  }, []);

  const [h2hLeft, setH2hLeft] = useState(
    () => chartSortedPlayers[0]?.name ?? players[0]
  );
  const [h2hRight, setH2hRight] = useState(
    () => chartSortedPlayers[1]?.name ?? players[1]
  );

  const [standingsNightId, setStandingsNightId] = useState(() =>
    games.length === 0 ? 1 : Math.max(1, ...games.map((g) => g.dayId ?? 1))
  );

  const [tableSortKey, setTableSortKey] = useState('total');
  const [tableSortDir, setTableSortDir] = useState('desc');

  const tableRows = useMemo(
    () =>
      [...playerStats].sort((a, b) => comparePlayersForTable(a, b, tableSortKey, tableSortDir)),
    [playerStats, tableSortKey, tableSortDir]
  );

  const handleTableSort = (key) => {
    if (tableSortKey === key) {
      setTableSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setTableSortKey(key);
      setTableSortDir(TABLE_SORT_DEFAULTS[key] ?? 'desc');
    }
  };

  const topPerformer = chartSortedPlayers[0];
  const mostAvgPerGame = [...playerStats].sort(
    (a, b) => b.avgPoints - a.avgPoints || b.gamesPlayed - a.gamesPlayed
  )[0];
  const mostGamesPlayed = [...playerStats].sort(
    (a, b) => b.gamesPlayed - a.gamesPlayed || b.totalPoints - a.totalPoints
  )[0];
  const mostFirst = [...playerStats].sort(
    (a, b) => b.wins - a.wins || b.totalPoints - a.totalPoints
  )[0];
  const mostSecond = [...playerStats].sort(
    (a, b) => b.seconds - a.seconds || b.totalPoints - a.totalPoints
  )[0];
  const mostThird = [...playerStats].sort(
    (a, b) => b.thirds - a.thirds || b.totalPoints - a.totalPoints
  )[0];

  const h2h = useMemo(
    () => countHeadToHead(h2hLeft, h2hRight),
    [h2hLeft, h2hRight]
  );

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
    // Low → high in data; YAxis reversed so highest pts appear at top, lowest at bottom.
    const sortedLowToHigh = [...rows].sort((a, b) => a.pts - b.pts || a.name.localeCompare(b.name));
    const maxPts = sortedLowToHigh.reduce((m, r) => Math.max(m, r.pts), 0);
    const standingsNightBarMax = Math.max(7, Math.ceil(maxPts / 2) * 2);
    return {
      standingsNightBarData: sortedLowToHigh,
      standingsNightGameCount: nightGames.length,
      standingsNightBarMax
    };
  }, [standingsNightId]);

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
              Click any column header to sort by that column.
            </CardMeta>
          </CardHeader>

          <TableWrapper>
            <StandingsTable>
              <thead>
                <Tr>
                  <Th title="Rank for the current sort">#</Th>
                  <SortableTh scope="col" onClick={() => handleTableSort('name')}>
                    <ThInner>
                      Player
                      <SortGlyph $active={tableSortKey === 'name'}>
                        {tableSortKey === 'name' ? (tableSortDir === 'asc' ? '↑' : '↓') : '↕'}
                      </SortGlyph>
                    </ThInner>
                  </SortableTh>
                  <SortableTh scope="col" onClick={() => handleTableSort('total')}>
                    <ThInner>
                      Total
                      <SortGlyph $active={tableSortKey === 'total'}>
                        {tableSortKey === 'total' ? (tableSortDir === 'asc' ? '↑' : '↓') : '↕'}
                      </SortGlyph>
                    </ThInner>
                  </SortableTh>
                  <SortableTh scope="col" onClick={() => handleTableSort('gamesPlayed')}>
                    <ThInner>
                      Gms
                      <SortGlyph $active={tableSortKey === 'gamesPlayed'}>
                        {tableSortKey === 'gamesPlayed' ? (tableSortDir === 'asc' ? '↑' : '↓') : '↕'}
                      </SortGlyph>
                    </ThInner>
                  </SortableTh>
                  <SortableTh scope="col" onClick={() => handleTableSort('wins')}>
                    <ThInner>
                      1st
                      <SortGlyph $active={tableSortKey === 'wins'}>
                        {tableSortKey === 'wins' ? (tableSortDir === 'asc' ? '↑' : '↓') : '↕'}
                      </SortGlyph>
                    </ThInner>
                  </SortableTh>
                  <SortableTh scope="col" onClick={() => handleTableSort('seconds')}>
                    <ThInner>
                      2nd
                      <SortGlyph $active={tableSortKey === 'seconds'}>
                        {tableSortKey === 'seconds' ? (tableSortDir === 'asc' ? '↑' : '↓') : '↕'}
                      </SortGlyph>
                    </ThInner>
                  </SortableTh>
                  <SortableTh scope="col" onClick={() => handleTableSort('thirds')}>
                    <ThInner>
                      3rd
                      <SortGlyph $active={tableSortKey === 'thirds'}>
                        {tableSortKey === 'thirds' ? (tableSortDir === 'asc' ? '↑' : '↓') : '↕'}
                      </SortGlyph>
                    </ThInner>
                  </SortableTh>
                  <SortableTh scope="col" onClick={() => handleTableSort('avgPoints')}>
                    <ThInner>
                      PPG
                      <SortGlyph $active={tableSortKey === 'avgPoints'}>
                        {tableSortKey === 'avgPoints' ? (tableSortDir === 'asc' ? '↑' : '↓') : '↕'}
                      </SortGlyph>
                    </ThInner>
                  </SortableTh>
                </Tr>
              </thead>
              <tbody>
                {tableRows.map((player, index) => (
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
              <Dot color="#3b82f6" />
              <span>
                Most participated: <strong>{mostGamesPlayed.name}</strong> (
                {mostGamesPlayed.gamesPlayed} games)
              </span>
            </MiniStat>
            <MiniStat>
              <Dot color="#22c55e" />
              <span>
                Most 1st: <strong>{mostFirst.name}</strong> ({mostFirst.wins} wins)
              </span>
            </MiniStat>
            <MiniStat>
              <Dot color="#a855f7" />
              <span>
                Most 2nd: <strong>{mostSecond.name}</strong> ({mostSecond.seconds})
              </span>
            </MiniStat>
            <MiniStat>
              <Dot color="#f97316" />
              <span>
                Most 3rd: <strong>{mostThird.name}</strong> ({mostThird.thirds})
              </span>
            </MiniStat>
            <MiniStat>
              <Dot color="#06b6d4" />
              <span>
                PPG: <strong>{mostAvgPerGame.name}</strong> (
                {mostAvgPerGame.avgPoints.toFixed(2)})
              </span>
            </MiniStat>
          </MiniStatRow>
        </Card>

        <div>
          <ChartsGrid>
            <ChartCard>
              <ChartTitle>Head to head</ChartTitle>
              <ChartMeta>
                Games where both players scored podium points (1st / 2nd / 3rd). Whoever had
                more points that game wins the matchup (+1).
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
                          <Cell
                            fill={PLAYER_COLORS[players.indexOf(h2hLeft) % PLAYER_COLORS.length]}
                          />
                          <Cell
                            fill={PLAYER_COLORS[players.indexOf(h2hRight) % PLAYER_COLORS.length]}
                          />
                        </Pie>
                        <Tooltip
                          formatter={(v, name) => [`${v} win${Number(v) === 1 ? '' : 's'}`, name]}
                          contentStyle={{
                            background: '#020617',
                            border: '1px solid #1f2937',
                            borderRadius: 12,
                            fontSize: 12
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

            <ChartCard>
              <ChartTitle>Cumulative Points by Night</ChartTitle>
              <ChartMeta>
                Running totals after each night (all {players.length} players). Axis shows Night 1–
                {cumulativeChartMaxNight} from your data ({cumulativeChartMaxNight} night
                {cumulativeChartMaxNight === 1 ? '' : 's'}).
              </ChartMeta>
              <ResponsiveContainer width="100%" height="100%" minHeight={500}>
                <LineChart
                  data={cumulativeLineData}
                  margin={{ top: 10, right: 6, left: -10, bottom: 36 }}
                >
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
                    contentStyle={{
                      background: '#020617',
                      border: '1px solid #1f2937',
                      borderRadius: 12,
                      fontSize: 12
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
          </ChartsGrid>
        </div>
      </Layout>
    </AppContainer>
  );
};

export default App;

