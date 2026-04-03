import { players, games } from './data/games.js';
import { RF_BONUS_POINTS, SF_BONUS_POINTS } from './constants.js';

/** Resolved RF/SF winners for a game (player names or null). Ignores unknown names. */
export function getHandBonusesNormalized(game) {
  const hb = game.handBonuses;
  if (hb && typeof hb === 'object') {
    const RF =
      typeof hb.RF === 'string' && hb.RF !== 'x' && players.includes(hb.RF) ? hb.RF : null;
    const SF =
      typeof hb.SF === 'string' && hb.SF !== 'x' && players.includes(hb.SF) ? hb.SF : null;
    return { RF, SF };
  }
  const legRf = game.RF;
  const legSf = game.SF;
  return {
    RF:
      typeof legRf === 'string' && legRf !== 'x' && players.includes(legRf) ? legRf : null,
    SF:
      typeof legSf === 'string' && legSf !== 'x' && players.includes(legSf) ? legSf : null
  };
}

function playerWasPresentInGame(game, name) {
  return game.pointsByPlayer[name] !== 'x';
}

/** Hand bonus points for one player in one game (0, 5, 10, or 15 if both — unusual). */
export function getPlayerHandBonusForGame(game, name) {
  if (!playerWasPresentInGame(game, name)) return 0;
  const { RF, SF } = getHandBonusesNormalized(game);
  let pts = 0;
  if (RF === name) pts += RF_BONUS_POINTS;
  if (SF === name) pts += SF_BONUS_POINTS;
  return pts;
}

/** Every recorded RF/SF with game id, night, player, and points (eligibility applied). */
export function buildHandBonusEvents() {
  const events = [];
  games.forEach((game) => {
    const { RF, SF } = getHandBonusesNormalized(game);
    const id = game.id;
    const dayId = game.dayId ?? 1;
    if (RF && playerWasPresentInGame(game, RF)) {
      events.push({
        gameId: id,
        dayId,
        type: 'RF',
        player: RF,
        points: RF_BONUS_POINTS
      });
    }
    if (SF && playerWasPresentInGame(game, SF)) {
      events.push({
        gameId: id,
        dayId,
        type: 'SF',
        player: SF,
        points: SF_BONUS_POINTS
      });
    }
  });
  return events;
}

export function computePlayerStats() {
  return players.map((name) => {
    let totalPoints = 0;
    let gamesPlayed = 0;
    let wins = 0;
    let seconds = 0;
    let thirds = 0;
    let rfCount = 0;
    let sfCount = 0;

    games.forEach((game) => {
      const value = game.pointsByPlayer[name];
      if (value === 'x') return;
      gamesPlayed += 1;
      const numeric = typeof value === 'number' ? value : 0;
      totalPoints += numeric + getPlayerHandBonusForGame(game, name);
      if (numeric === 4) wins += 1;
      else if (numeric === 2) seconds += 1;
      else if (numeric === 1) thirds += 1;

      const { RF, SF } = getHandBonusesNormalized(game);
      if (RF === name) rfCount += 1;
      if (SF === name) sfCount += 1;
    });

    const avgPoints = gamesPlayed ? totalPoints / gamesPlayed : 0;

    return {
      name,
      totalPoints,
      gamesPlayed,
      wins,
      seconds,
      thirds,
      rfCount,
      sfCount,
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
          add += getPlayerHandBonusForGame(game, name);
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
  rfCount: 'desc',
  sfCount: 'desc',
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

/** Ascending-style diff: higher totals / podiums / PPG sort later unless negated for desc. */
export function compareTotalThenPodiumsThenPpg(a, b) {
  return (
    a.totalPoints - b.totalPoints ||
    a.wins - b.wins ||
    a.seconds - b.seconds ||
    a.thirds - b.thirds ||
    a.avgPoints - b.avgPoints ||
    a.name.localeCompare(b.name)
  );
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
      cmp = compareTotalThenPodiumsThenPpg(a, b);
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
    case 'rfCount':
      cmp = a.rfCount - b.rfCount || a.totalPoints - b.totalPoints;
      break;
    case 'sfCount':
      cmp = a.sfCount - b.sfCount || a.totalPoints - b.totalPoints;
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
