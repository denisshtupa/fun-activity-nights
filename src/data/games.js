export const players = [
  'Antonio',
  'Amiklat',
  'Ardit',
  'Arber',
  'Ervir',
  'Elvis',
  'Duli',
  'Denis',
  'Landi',
  'Gesti'
];

// Each game assigns points per player:
// 4 = winner, 2 = second, 1 = third, 0 = present but outside top 3, 'x' = absent
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
      Elvis: 'x',
      Arber: 0,
      Amiklat: 'x',
      Denis: 4,
      Gesti: 'x'
    }
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
      Elvis: 'x',
      Arber: 0,
      Amiklat: 'x',
      Denis: 0,
      Gesti: 'x'
    }
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
      Elvis: 'x',
      Arber: 0,
      Amiklat: 'x',
      Denis: 2,
      Gesti: 'x'
    }
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
      Elvis: 'x',
      Arber: 2,
      Amiklat: 'x',
      Denis: 0,
      Gesti: 'x'
    }
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
      Elvis: 'x',
      Arber: 0,
      Amiklat: 'x',
      Denis: 1,
      Gesti: 'x'
    }
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
      Elvis: 0,
      Arber: 2,
      Amiklat: 0,
      Denis: 0,
      Gesti: 1
    }
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
      Elvis: 0,
      Arber: 1,
      Amiklat: 0,
      Denis: 0,
      Gesti: 0
    }
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
      Elvis: 0,
      Arber: 4,
      Amiklat: 0,
      Denis: 0,
      Gesti: 0
    }
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
      Elvis: 4,
      Arber: 0,
      Amiklat: 2,
      Denis: 0,
      Gesti: 0
    }
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
      Elvis: 2,
      Arber: 'x',
      Amiklat: 0,
      Denis: 0,
      Gesti: 0
    }
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
      Elvis: 0,
      Arber: 'x',
      Amiklat: 0,
      Denis: 'x',
      Gesti: 2
    }
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
      Elvis: 0,
      Arber: 'x',
      Amiklat: 0,
      Denis: 'x',
      Gesti: 0
    }
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
      Elvis: 0,
      Arber: 'x',
      Amiklat: 0,
      Denis: 'x',
      Gesti: 2
    }
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
      Elvis: 1,
      Arber: 'x',
      Amiklat: 0,
      Denis: 'x',
      Gesti: 0
    }
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
      Elvis: 0,
      Arber: 'x',
      Amiklat: 0,
      Denis: 'x',
      Gesti: 2
    }
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
      Elvis: 0,
      Arber: 'x',
      Amiklat: 2,
      Denis: 'x',
      Gesti: 0
    }
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
      Elvis: 1,
      Arber: 0,
      Amiklat: 0,
      Denis: 'x',
      Gesti: 'x'
    }
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
      Elvis: 0,
      Arber: 0,
      Amiklat: 4,
      Denis: 'x',
      Gesti: 'x'
    }
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
      Elvis: 1,
      Arber: 2,
      Amiklat: 0,
      Denis: 'x',
      Gesti: 'x'
    }
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
      Elvis: 0,
      Arber: 1,
      Amiklat: 0,
      Denis: 'x',
      Gesti: 'x'
    }
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
      Elvis: 4,
      Arber: 0,
      Amiklat: 0,
      Denis: 'x',
      Gesti: 'x'
    }
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
      Elvis: 0,
      Arber: 'x',
      Amiklat: 2,
      Denis: 'x',
      Gesti: 'x'
    }
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
      Elvis: 0,
      Arber: 'x',
      Amiklat: 0,
      Denis: 'x',
      Gesti: 'x'
    }
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
      Elvis: 0,
      Arber: 0,
      Amiklat: 2,
      Denis: 0,
      Gesti: 0
    }
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
      Elvis: 0,
      Arber: 0,
      Amiklat: 1,
      Denis: 0,
      Gesti: 4
    }
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
      Elvis: 0,
      Arber: 0,
      Amiklat: 2,
      Denis: 0,
      Gesti: 1
    }
  }
];
