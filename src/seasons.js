import { players as season2Players, games as season2Games } from './data/games.js';
import season3Data from './data/season3.json';
import {
  PO_BONUS_POINTS,
  RF_BONUS_POINTS,
  SF_BONUS_POINTS,
  TOTAL_TOURNAMENT_NIGHTS,
  TOTAL_TOURNAMENT_NIGHTS_SEASON_3
} from './constants.js';

export const SEASONS = {
  2: {
    id: 2,
    label: 'Season 2',
    players: season2Players,
    games: season2Games,
    totalTournamentNights: TOTAL_TOURNAMENT_NIGHTS,
    bonuses: { RF: RF_BONUS_POINTS, SF: SF_BONUS_POINTS },
    scoringMode: 'fixed',
    hasPoBonus: false,
    hasFourthPlace: false
  },
  3: {
    id: 3,
    label: 'Season 3',
    players: season3Data.players,
    games: season3Data.games,
    totalTournamentNights: season3Data.totalTournamentNights ?? TOTAL_TOURNAMENT_NIGHTS_SEASON_3,
    bonuses: {
      RF: season3Data.bonuses.RF,
      SF: season3Data.bonuses.SF,
      PO: season3Data.bonuses.PO ?? PO_BONUS_POINTS
    },
    scoring: season3Data.meta?.scoringByPlayerCount,
    scoringMode: 'variable',
    hasPoBonus: true,
    hasFourthPlace: true
  }
};

export const SEASON_LIST = Object.values(SEASONS).sort((a, b) => b.id - a.id);
