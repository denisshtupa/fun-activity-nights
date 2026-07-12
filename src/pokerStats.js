import { players, games } from './data/games.js';
import { RF_BONUS_POINTS, SF_BONUS_POINTS } from './constants.js';
import { SEASONS } from './seasons.js';

function playerWasPresentInGame(game, name) {
  return game.pointsByPlayer[name] !== 'x';
}

function getPlaceRankInGame(game, playerName, roster) {
  const pts = game.pointsByPlayer[playerName];
  if (typeof pts !== 'number' || pts <= 0) return null;
  const podiumPoints = [
    ...new Set(
      roster
        .filter((p) => game.pointsByPlayer[p] !== 'x')
        .map((p) => game.pointsByPlayer[p])
        .filter((v) => typeof v === 'number' && v > 0)
    )
  ].sort((a, b) => b - a);
  const rank = podiumPoints.indexOf(pts) + 1;
  return rank > 0 ? rank : null;
}

export function createPokerStatsEngine(season) {
  const { players: roster, games: seasonGames, bonuses, scoringMode, hasPoBonus } = season;

  function getHandBonusesNormalized(game) {
    const hb = game.handBonuses;
    if (hb && typeof hb === 'object') {
      const RF =
        typeof hb.RF === 'string' && hb.RF !== 'x' && roster.includes(hb.RF) ? hb.RF : null;
      const SF =
        typeof hb.SF === 'string' && hb.SF !== 'x' && roster.includes(hb.SF) ? hb.SF : null;
      const PO =
        hasPoBonus && typeof hb.PO === 'string' && hb.PO !== 'x' && roster.includes(hb.PO)
          ? hb.PO
          : null;
      return { RF, SF, PO };
    }
    const legRf = game.RF;
    const legSf = game.SF;
    return {
      RF:
        typeof legRf === 'string' && legRf !== 'x' && roster.includes(legRf) ? legRf : null,
      SF:
        typeof legSf === 'string' && legSf !== 'x' && roster.includes(legSf) ? legSf : null,
      PO: null
    };
  }

  function getPlayerHandBonusForGame(game, name) {
    if (!playerWasPresentInGame(game, name)) return 0;
    const { RF, SF, PO } = getHandBonusesNormalized(game);
    let pts = 0;
    if (RF === name) pts += bonuses.RF ?? 0;
    if (SF === name) pts += bonuses.SF ?? 0;
    if (PO === name) pts += bonuses.PO ?? 0;
    return pts;
  }

  function countPodiumForGame(game, name) {
    if (scoringMode === 'fixed') {
      const value = game.pointsByPlayer[name];
      if (typeof value !== 'number') return { wins: 0, seconds: 0, thirds: 0, fourths: 0 };
      return {
        wins: value === 4 ? 1 : 0,
        seconds: value === 2 ? 1 : 0,
        thirds: value === 1 ? 1 : 0,
        fourths: 0
      };
    }
    const rank = getPlaceRankInGame(game, name, roster);
    return {
      wins: rank === 1 ? 1 : 0,
      seconds: rank === 2 ? 1 : 0,
      thirds: rank === 3 ? 1 : 0,
      fourths: rank === 4 ? 1 : 0
    };
  }

  function playerOnPodium(game, name) {
    if (scoringMode === 'fixed') {
      const p = game.pointsByPlayer[name];
      return p === 4 || p === 2 || p === 1;
    }
    const p = game.pointsByPlayer[name];
    return typeof p === 'number' && p > 0;
  }

  function buildHandBonusEvents() {
    const events = [];
    seasonGames.forEach((game) => {
      const { RF, SF, PO } = getHandBonusesNormalized(game);
      const id = game.id;
      const dayId = game.dayId ?? 1;
      if (RF && playerWasPresentInGame(game, RF)) {
        events.push({
          gameId: id,
          dayId,
          type: 'RF',
          player: RF,
          points: bonuses.RF ?? 0
        });
      }
      if (SF && playerWasPresentInGame(game, SF)) {
        events.push({
          gameId: id,
          dayId,
          type: 'SF',
          player: SF,
          points: bonuses.SF ?? 0
        });
      }
      if (PO && playerWasPresentInGame(game, PO)) {
        events.push({
          gameId: id,
          dayId,
          type: 'PO',
          player: PO,
          points: bonuses.PO ?? 0
        });
      }
    });
    return events;
  }

  function computePlayerStats() {
    return roster.map((name) => {
      let totalPoints = 0;
      let gamesPlayed = 0;
      let wins = 0;
      let seconds = 0;
      let thirds = 0;
      let fourths = 0;
      let rfCount = 0;
      let sfCount = 0;
      let poCount = 0;

      seasonGames.forEach((game) => {
        const value = game.pointsByPlayer[name];
        if (value === 'x') return;
        gamesPlayed += 1;
        const numeric = typeof value === 'number' ? value : 0;
        totalPoints += numeric + getPlayerHandBonusForGame(game, name);

        const podium = countPodiumForGame(game, name);
        wins += podium.wins;
        seconds += podium.seconds;
        thirds += podium.thirds;
        fourths += podium.fourths;

        const { RF, SF, PO } = getHandBonusesNormalized(game);
        if (RF === name) rfCount += 1;
        if (SF === name) sfCount += 1;
        if (PO === name) poCount += 1;
      });

      const avgPoints = gamesPlayed ? totalPoints / gamesPlayed : 0;

      return {
        name,
        totalPoints,
        gamesPlayed,
        wins,
        seconds,
        thirds,
        fourths,
        rfCount,
        sfCount,
        poCount,
        avgPoints: Number(avgPoints.toFixed(2))
      };
    });
  }

  function getMaxNightFromGames() {
    if (seasonGames.length === 0) return 1;
    return Math.max(1, ...seasonGames.map((g) => g.dayId ?? 1));
  }

  function buildCumulativeLineDataByNight() {
    const maxNight = getMaxNightFromGames();
    const cumulative = Object.fromEntries(roster.map((n) => [n, 0]));
    const rows = [];

    for (let night = 1; night <= maxNight; night++) {
      const nightGames = seasonGames.filter((g) => (g.dayId ?? 1) === night);
      if (nightGames.length > 0) {
        roster.forEach((name) => {
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
        ...roster.reduce((acc, name) => {
          acc[name] = cumulative[name];
          return acc;
        }, {})
      });
    }

    return { rows, maxNight };
  }

  const TABLE_SORT_DEFAULTS = {
    name: 'asc',
    total: 'desc',
    gamesPlayed: 'desc',
    wins: 'desc',
    seconds: 'desc',
    thirds: 'desc',
    fourths: 'desc',
    rfCount: 'desc',
    sfCount: 'desc',
    poCount: 'desc',
    avgPoints: 'desc'
  };

  function countHeadToHead(playerA, playerB) {
    if (!playerA || !playerB || playerA === playerB) {
      return { winsA: 0, winsB: 0, ties: 0, gamesCompared: 0 };
    }
    let winsA = 0;
    let winsB = 0;
    let ties = 0;
    for (const game of seasonGames) {
      const rawA = game.pointsByPlayer[playerA];
      const rawB = game.pointsByPlayer[playerB];
      if (rawA === 'x' || rawB === 'x') continue;
      const ptsA = typeof rawA === 'number' ? rawA : 0;
      const ptsB = typeof rawB === 'number' ? rawB : 0;
      if (!playerOnPodium(game, playerA) || !playerOnPodium(game, playerB)) continue;
      if (ptsA > ptsB) winsA++;
      else if (ptsB > ptsA) winsB++;
      else ties++;
    }
    return { winsA, winsB, ties, gamesCompared: winsA + winsB + ties };
  }

  function compareTotalThenPodiumsThenPpg(a, b) {
    return (
      a.totalPoints - b.totalPoints ||
      a.wins - b.wins ||
      a.seconds - b.seconds ||
      a.thirds - b.thirds ||
      (a.fourths ?? 0) - (b.fourths ?? 0) ||
      a.avgPoints - b.avgPoints ||
      a.name.localeCompare(b.name)
    );
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
      case 'fourths':
        cmp = (a.fourths ?? 0) - (b.fourths ?? 0) || a.totalPoints - b.totalPoints;
        break;
      case 'rfCount':
        cmp = a.rfCount - b.rfCount || a.totalPoints - b.totalPoints;
        break;
      case 'sfCount':
        cmp = a.sfCount - b.sfCount || a.totalPoints - b.totalPoints;
        break;
      case 'poCount':
        cmp = (a.poCount ?? 0) - (b.poCount ?? 0) || a.totalPoints - b.totalPoints;
        break;
      case 'avgPoints':
        cmp = a.avgPoints - b.avgPoints || a.gamesPlayed - b.gamesPlayed;
        break;
      default:
        return 0;
    }
    return flip * cmp;
  }

  function countNightsPlayed() {
    return new Set(seasonGames.map((g) => g.dayId ?? 1)).size;
  }

  function countPlaceAcrossGames(placeRank) {
    return (name) => {
      let n = 0;
      seasonGames.forEach((game) => {
        if (scoringMode === 'fixed') {
          const pointByPlace = { 1: 4, 2: 2, 3: 1 };
          if (game.pointsByPlayer[name] === pointByPlace[placeRank]) n += 1;
        } else if (getPlaceRankInGame(game, name, roster) === placeRank) {
          n += 1;
        }
      });
      return n;
    };
  }

  return {
    getHandBonusesNormalized,
    getPlayerHandBonusForGame,
    buildHandBonusEvents,
    computePlayerStats,
    getMaxNightFromGames,
    buildCumulativeLineDataByNight,
    TABLE_SORT_DEFAULTS,
    countHeadToHead,
    compareTotalThenPodiumsThenPpg,
    comparePlayersForTable,
    countNightsPlayed,
    countPlaceAcrossGames,
    getPlaceRankInGame: (game, name) => getPlaceRankInGame(game, name, roster)
  };
}

const season2Engine = createPokerStatsEngine(SEASONS[2]);

export const getHandBonusesNormalized = season2Engine.getHandBonusesNormalized;
export const getPlayerHandBonusForGame = season2Engine.getPlayerHandBonusForGame;
export const buildHandBonusEvents = season2Engine.buildHandBonusEvents;
export const computePlayerStats = season2Engine.computePlayerStats;
export const getMaxNightFromGames = season2Engine.getMaxNightFromGames;
export const buildCumulativeLineDataByNight = season2Engine.buildCumulativeLineDataByNight;
export const TABLE_SORT_DEFAULTS = season2Engine.TABLE_SORT_DEFAULTS;
export const countHeadToHead = season2Engine.countHeadToHead;
export const compareTotalThenPodiumsThenPpg = season2Engine.compareTotalThenPodiumsThenPpg;
export const comparePlayersForTable = season2Engine.comparePlayersForTable;
export const countNightsPlayed = season2Engine.countNightsPlayed;

export { players, games };
