export const players = [
  'Antonio',
  'Klanti',
  'Ardit',
  'Arber',
  'Ervir',
  'Visi',
  'Duli',
  'Denis',
  'Landi',
  'Gesti'
];

// Each game assigns points per player:
// 4 = winner, 2 = second, 1 = third, 0 = present but outside top 3, 'x' = absent
// handBonuses (required on every game): RF / SF = player who scored that bonus, or null.
// Bonus points (10 RF / 5 SF) add to that player's total; only if they were not absent ('x').
// dayId: 1 = first 5 games, 2 = next 5, 3 = next 6, 4 = last 7 (4 nights total).
export const games = [
  // Day 1 – 5 games (13 Feb)
  {
    id: 1,
    dayId: 1,
    pointsByPlayer: {
      Landi: 2,
      Duli: 1,
      Antonio: 0,
      Ervir: 'x',
      Ardit: 'x',
      Visi: 'x',
      Arber: 0,
      Klanti: 'x',
      Denis: 4,
      Gesti: 'x'
    },
    handBonuses: { RF: null, SF: null }
  },
  {
    id: 2,
    dayId: 1,
    pointsByPlayer: {
      Landi: 4,
      Duli: 1,
      Antonio: 2,
      Ervir: 'x',
      Ardit: 'x',
      Visi: 'x',
      Arber: 0,
      Klanti: 'x',
      Denis: 0,
      Gesti: 'x'
    },
    handBonuses: { RF: null, SF: null }
  },
  {
    id: 3,
    dayId: 1,
    pointsByPlayer: {
      Landi: 0,
      Duli: 1,
      Antonio: 4,
      Ervir: 'x',
      Ardit: 'x',
      Visi: 'x',
      Arber: 0,
      Klanti: 'x',
      Denis: 2,
      Gesti: 'x'
    },
    handBonuses: { RF: null, SF: null }
  },
  {
    id: 4,
    dayId: 1,
    pointsByPlayer: {
      Landi: 0,
      Duli: 1,
      Antonio: 4,
      Ervir: 'x',
      Ardit: 'x',
      Visi: 'x',
      Arber: 2,
      Klanti: 'x',
      Denis: 0,
      Gesti: 'x'
    },
    handBonuses: { RF: null, SF: null }
  },
  {
    id: 5,
    dayId: 1,
    pointsByPlayer: {
      Landi: 4,
      Duli: 0,
      Antonio: 2,
      Ervir: 'x',
      Ardit: 'x',
      Visi: 'x',
      Arber: 0,
      Klanti: 'x',
      Denis: 1,
      Gesti: 'x'
    },
    handBonuses: { RF: null, SF: null }
  },
  // Day 2 – 5 games (21 Feb)
  {
    id: 6,
    dayId: 2,
    pointsByPlayer: {
      Landi: 0,
      Duli: 0,
      Antonio: 0,
      Ervir: 4,
      Ardit: 0,
      Visi: 0,
      Arber: 2,
      Klanti: 0,
      Denis: 0,
      Gesti: 1
    },
    handBonuses: { RF: null, SF: null }
  },
  {
    id: 7,
    dayId: 2,
    pointsByPlayer: {
      Landi: 4,
      Duli: 0,
      Antonio: 0,
      Ervir: 0,
      Ardit: 2,
      Visi: 0,
      Arber: 1,
      Klanti: 0,
      Denis: 0,
      Gesti: 0
    },
    handBonuses: { RF: null, SF: null }
  },
  {
    id: 8,
    dayId: 2,
    pointsByPlayer: {
      Landi: 2,
      Duli: 0,
      Antonio: 1,
      Ervir: 0,
      Ardit: 0,
      Visi: 0,
      Arber: 4,
      Klanti: 0,
      Denis: 0,
      Gesti: 0
    },
    handBonuses: { RF: null, SF: null }
  },
  {
    id: 9,
    dayId: 2,
    pointsByPlayer: {
      Landi: 0,
      Duli: 0,
      Antonio: 0,
      Ervir: 1,
      Ardit: 0,
      Visi: 4,
      Arber: 0,
      Klanti: 2,
      Denis: 0,
      Gesti: 0
    },
    handBonuses: { RF: null, SF: null }
  },
  {
    id: 10,
    dayId: 2,
    pointsByPlayer: {
      Landi: 4,
      Duli: 1,
      Antonio: 0,
      Ervir: 0,
      Ardit: 0,
      Visi: 2,
      Arber: 'x',
      Klanti: 0,
      Denis: 0,
      Gesti: 0
    },
    handBonuses: { RF: null, SF: null }
  },
  // Day 3 – 6 games (27 Feb)
  {
    id: 11,
    dayId: 3,
    pointsByPlayer: {
      Landi: 4,
      Duli: 1,
      Antonio: 0,
      Ervir: 0,
      Ardit: 0,
      Visi: 0,
      Arber: 'x',
      Klanti: 0,
      Denis: 'x',
      Gesti: 2
    },
    handBonuses: { RF: null, SF: null }
  },
  {
    id: 12,
    dayId: 3,
    pointsByPlayer: {
      Landi: 1,
      Duli: 0,
      Antonio: 0,
      Ervir: 4,
      Ardit: 2,
      Visi: 0,
      Arber: 'x',
      Klanti: 0,
      Denis: 'x',
      Gesti: 0
    },
    handBonuses: { RF: null, SF: null }
  },
  {
    id: 13,
    dayId: 3,
    pointsByPlayer: {
      Landi: 4,
      Duli: 0,
      Antonio: 0,
      Ervir: 1,
      Ardit: 0,
      Visi: 0,
      Arber: 'x',
      Klanti: 0,
      Denis: 'x',
      Gesti: 2
    },
    handBonuses: { RF: null, SF: null }
  },
  {
    id: 14,
    dayId: 3,
    pointsByPlayer: {
      Landi: 2,
      Duli: 0,
      Antonio: 0,
      Ervir: 0,
      Ardit: 4,
      Visi: 1,
      Arber: 'x',
      Klanti: 0,
      Denis: 'x',
      Gesti: 0
    },
    handBonuses: { RF: null, SF: null }
  },
  {
    id: 15,
    dayId: 3,
    pointsByPlayer: {
      Landi: 0,
      Duli: 0,
      Antonio: 0,
      Ervir: 4,
      Ardit: 1,
      Visi: 0,
      Arber: 'x',
      Klanti: 0,
      Denis: 'x',
      Gesti: 2
    },
    handBonuses: { RF: null, SF: null }
  },
  {
    id: 16,
    dayId: 3,
    pointsByPlayer: {
      Landi: 1,
      Duli: 4,
      Antonio: 0,
      Ervir: 0,
      Ardit: 0,
      Visi: 0,
      Arber: 'x',
      Klanti: 2,
      Denis: 'x',
      Gesti: 0
    },
    handBonuses: { RF: null, SF: null }
  },
  // Day 4 – 7 games (7 Mar)
  {
    id: 17,
    dayId: 4,
    pointsByPlayer: {
      Landi: 0,
      Duli: 4,
      Antonio: 2,
      Ervir: 'x',
      Ardit: 0,
      Visi: 1,
      Arber: 0,
      Klanti: 0,
      Denis: 'x',
      Gesti: 'x'
    },
    handBonuses: { RF: null, SF: null }
  },
  {
    id: 18,
    dayId: 4,
    pointsByPlayer: {
      Landi: 1,
      Duli: 2,
      Antonio: 0,
      Ervir: 'x',
      Ardit: 0,
      Visi: 0,
      Arber: 0,
      Klanti: 4,
      Denis: 'x',
      Gesti: 'x'
    },
    handBonuses: { RF: null, SF: null }
  },
  {
    id: 19,
    dayId: 4,
    pointsByPlayer: {
      Landi: 4,
      Duli: 0,
      Antonio: 0,
      Ervir: 'x',
      Ardit: 0,
      Visi: 1,
      Arber: 2,
      Klanti: 0,
      Denis: 'x',
      Gesti: 'x'
    },
    handBonuses: { RF: null, SF: null }
  },
  {
    id: 20,
    dayId: 4,
    pointsByPlayer: {
      Landi: 4,
      Duli: 2,
      Antonio: 0,
      Ervir: 'x',
      Ardit: 0,
      Visi: 0,
      Arber: 1,
      Klanti: 0,
      Denis: 'x',
      Gesti: 'x'
    },
    handBonuses: { RF: null, SF: null }
  },
  {
    id: 21,
    dayId: 4,
    pointsByPlayer: {
      Landi: 2,
      Duli: 0,
      Antonio: 1,
      Ervir: 'x',
      Ardit: 0,
      Visi: 4,
      Arber: 0,
      Klanti: 0,
      Denis: 'x',
      Gesti: 'x'
    },
    handBonuses: { RF: null, SF: null }
  },
  {
    id: 22,
    dayId: 4,
    pointsByPlayer: {
      Landi: 4,
      Duli: 0,
      Antonio: 0,
      Ervir: 'x',
      Ardit: 1,
      Visi: 0,
      Arber: 'x',
      Klanti: 2,
      Denis: 'x',
      Gesti: 'x'
    },
    handBonuses: { RF: null, SF: null }
  },
  {
    id: 23,
    dayId: 4,
    pointsByPlayer: {
      Landi: 2,
      Duli: 1,
      Antonio: 0,
      Ervir: 'x',
      Ardit: 4,
      Visi: 0,
      Arber: 'x',
      Klanti: 0,
      Denis: 'x',
      Gesti: 'x'
    },
    handBonuses: { RF: null, SF: null }
  },
  // Day 5 – 3 games (20 Mar)
  {
    id: 24,
    dayId: 5,
    pointsByPlayer: {
      Landi: 0,
      Duli: 0,
      Antonio: 1,
      Ervir: 4,
      Ardit: 'x',
      Visi: 0,
      Arber: 0,
      Klanti: 2,
      Denis: 0,
      Gesti: 0
    },
    handBonuses: { RF: null, SF: null }
  },
  {
    id: 25,
    dayId: 5,
    pointsByPlayer: {
      Landi: 0,
      Duli: 0,
      Antonio: 0,
      Ervir: 2,
      Ardit: 'x',
      Visi: 0,
      Arber: 0,
      Klanti: 1,
      Denis: 0,
      Gesti: 4
    },
    handBonuses: { RF: null, SF: null }
  },
  {
    id: 26,
    dayId: 5,
    pointsByPlayer: {
      Landi: 0,
      Duli: 0,
      Antonio: 0,
      Ervir: 4,
      Ardit: 'x',
      Visi: 0,
      Arber: 0,
      Klanti: 2,
      Denis: 0,
      Gesti: 1
    },
    handBonuses: { RF: null, SF: null }
  },
  // Day 6 – 5 games (28 Mar)
  {
    id: 27,
    dayId: 6,
    pointsByPlayer: {
      Landi: 0,
      Duli: 2,
      Antonio: 1,
      Ervir: 4,
      Ardit: 0,
      Visi: 0,
      Arber: 0,
      Klanti: 0,
      Denis: 0,
      Gesti: 0
    },
    handBonuses: { RF: null, SF: null }
  },
  {
    id: 28,
    dayId: 6,
    pointsByPlayer: {
      Landi: 1,
      Duli: 0,
      Antonio: 0,
      Ervir: 0,
      Ardit: 0,
      Visi: 4,
      Arber: 0,
      Klanti: 0,
      Denis: 0,
      Gesti: 2
    },
    handBonuses: { RF: null, SF: null }
  },
  {
    id: 29,
    dayId: 6,
    pointsByPlayer: {
      Landi: 0,
      Duli: 0,
      Antonio: 0,
      Ervir: 0,
      Ardit: 4,
      Visi: 1,
      Arber: 2,
      Klanti: 0,
      Denis: 0,
      Gesti: 0
    },
    handBonuses: { RF: null, SF: null }
  },
  {
    id: 30,
    dayId: 6,
    pointsByPlayer: {
      Landi: 0,
      Duli: 1,
      Antonio: 0,
      Ervir: 2,
      Ardit: 0,
      Visi: 0,
      Arber: 4,
      Klanti: 0,
      Denis: 0,
      Gesti: 0
    },
    handBonuses: { RF: null, SF: null }
  },
  {
    id: 31,
    dayId: 6,
    pointsByPlayer: {
      Landi: 0,
      Duli: 0,
      Antonio: 0,
      Ervir: 0,
      Ardit: 0,
      Visi: 0,
      Arber: 0,
      Klanti: 2,
      Denis: 1,
      Gesti: 4
    },
    handBonuses: { RF: null, SF: null }
  },
   // Day 7 – 5 games (3 Apr)
   {
    id: 32,
    dayId: 7,
    pointsByPlayer: {
      Landi: 4,
      Duli: 0,
      Antonio: 1,
      Ervir: 0,
      Ardit: 'x',
      Visi: 0,
      Arber: 2,
      Klanti: 'x',
      Denis: 0,
      Gesti: 'x'
    },
    handBonuses: { RF: null, SF: null }
  },
  {
    id: 33,
    dayId: 7,
    pointsByPlayer: {
      Landi: 0,
      Duli: 2,
      Antonio: 0,
      Ervir: 4,
      Ardit: 1,
      Visi: 0,
      Arber: 0,
      Klanti: 'x',
      Denis: 0,
      Gesti: 'x'
    },
    handBonuses: { RF: null, SF: null }
  },
  {
    id: 34,
    dayId: 7,
    pointsByPlayer: {
      Landi: 1,
      Duli: 2,
      Antonio: 0,
      Ervir: 0,
      Ardit: 0,
      Visi: 0,
      Arber: 4,
      Klanti: 'x',
      Denis: 0,
      Gesti: 'x'
    },
    handBonuses: { RF: null, SF: null }
  },
  {
    id: 35,
    dayId: 7,
    pointsByPlayer: {
      Landi: 0,
      Duli: 0,
      Antonio: 2,
      Ervir: 4,
      Ardit: 0,
      Visi: 0,
      Arber: 0,
      Klanti: 'x',
      Denis: 1,
      Gesti: 'x'
    },
    handBonuses: { RF: null, SF: null }
  },
  {
    id: 36,
    dayId: 7,
    pointsByPlayer: {
      Landi: 4,
      Duli: 1,
      Antonio: 0,
      Ervir: 0,
      Ardit: 2,
      Visi: 0,
      Arber: 0,
      Klanti: 'x',
      Denis: 0,
      Gesti: 'x'
    },
    handBonuses: { RF: null, SF: null }
  },
  // Day 8 – 6 games (12 Apr)
  {
    id: 37,
    dayId: 8,
    pointsByPlayer: {
      Landi: 1,
      Duli: 0,
      Antonio: 4,
      Ervir: 'x',
      Ardit: 0,
      Visi: 0,
      Arber: 0,
      Klanti: 2,
      Denis: 'x',
      Gesti: 'x'
    },
    handBonuses: { RF: null, SF: null }
  },
  {
    id: 38,
    dayId: 8,
    pointsByPlayer: {
      Landi: 0,
      Duli: 0,
      Antonio: 4,
      Ervir: 0,
      Ardit: 0,
      Visi: 0,
      Arber: 2,
      Klanti: 1,
      Denis: 0,
      Gesti: 'x'
    },
    handBonuses: { RF: null, SF: null }
  },
  {
    id: 39,
    dayId: 8,
    pointsByPlayer: {
      Landi: 0,
      Duli: 0,
      Antonio: 0,
      Ervir: 4,
      Ardit: 2,
      Visi: 0,
      Arber: 1,
      Klanti: 0,
      Denis: 0,
      Gesti: 'x'
    },
    handBonuses: { RF: null, SF: null }
  },
  {
    id: 40,
    dayId: 8,
    pointsByPlayer: {
      Landi: 1,
      Duli: 0,
      Antonio: 0,
      Ervir: 2,
      Ardit: 4,
      Visi: 0,
      Arber: 0,
      Klanti: 0,
      Denis: 0,
      Gesti: 'x'
    },
    handBonuses: { RF: null, SF: null }
  },
  {
    id: 41,
    dayId: 8,
    pointsByPlayer: {
      Landi: 0,
      Duli: 0,
      Antonio: 0,
      Ervir: 2,
      Ardit: 0,
      Visi: 0,
      Arber: 0,
      Klanti: 4,
      Denis: 1,
      Gesti: 'x'
    },
    handBonuses: { RF: null, SF: null }
  },
  {
    id: 42,
    dayId: 8,
    pointsByPlayer: {
      Landi: 0,
      Duli: 2,
      Antonio: 0,
      Ervir: 4,
      Ardit: 0,
      Visi: 1,
      Arber: 'x',
      Klanti: 0,
      Denis: 'x',
      Gesti: 'x'
    },
    handBonuses: { RF: null, SF: null }
  },
  // Day 9 – 5 games (17 Apr)
  {
    id: 43,
    dayId: 9,
    pointsByPlayer: {
      Landi: 0,
      Duli: 0,
      Antonio: 0,
      Ervir: 2,
      Ardit: 0,
      Visi: 1,
      Arber: 0,
      Klanti: 'x',
      Denis: 4,
      Gesti: 0
    },
    handBonuses: { RF: null, SF: null }
  },
  {
    id: 44,
    dayId: 9,
    pointsByPlayer: {
      Landi: 4,
      Duli: 0,
      Antonio: 2,
      Ervir: 0,
      Ardit: 0,
      Visi: 1,
      Arber: 0,
      Klanti: 'x',
      Denis: 0,
      Gesti: 0
    },
    handBonuses: { RF: null, SF: null }
  },
  {
    id: 45,
    dayId: 9,
    pointsByPlayer: {
      Landi: 0,
      Duli: 0,
      Antonio: 2,
      Ervir: 4,
      Ardit: 0,
      Visi: 0,
      Arber: 0,
      Klanti: 'x',
      Denis: 1,
      Gesti: 0
    },
    handBonuses: { RF: null, SF: null }
  },
  {
    id: 46,
    dayId: 9,
    pointsByPlayer: {
      Landi: 1,
      Duli: 2,
      Antonio: 0,
      Ervir: 0,
      Ardit: 0,
      Visi: 0,
      Arber: 0,
      Klanti: 'x',
      Denis: 0,
      Gesti: 4
    },
    handBonuses: { RF: null, SF: null }
  },
  {
    id: 47,
    dayId: 9,
    pointsByPlayer: {
      Landi: 0,
      Duli: 0,
      Antonio: 0,
      Ervir: 4,
      Ardit: 0,
      Visi: 1,
      Arber: 2,
      Klanti: 'x',
      Denis: 0,
      Gesti: 0
    },
    handBonuses: { RF: null, SF: null }
  }
];
