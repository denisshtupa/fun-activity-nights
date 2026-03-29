import { players, games } from './data/games.js';

export function computePlayerStats() {
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

export function getMaxNightFromGames() {
  if (games.length === 0) return 1;
  return Math.max(1, ...games.map((g) => g.dayId ?? 1));
}

export function buildCumulativeLineDataByNight() {
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

export const TABLE_SORT_DEFAULTS = {
  name: 'asc',
  total: 'desc',
  gamesPlayed: 'desc',
  wins: 'desc',
  seconds: 'desc',
  thirds: 'desc',
  avgPoints: 'desc'
};

export function countHeadToHead(playerA, playerB) {
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

export function comparePlayersForTable(a, b, sortKey, sortDir) {
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

export function countNightsPlayed() {
  return new Set(games.map((g) => g.dayId ?? 1)).size;
}
