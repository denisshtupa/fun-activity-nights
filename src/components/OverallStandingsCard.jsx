import React, { useMemo, useState } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardMeta,
  TableWrapper,
  StandingsTable,
  Th,
  SortableTh,
  ThInner,
  SortGlyph,
  Tr,
  Td,
  RankPill,
  PlayerName,
  StatPill,
  MiniStatRow,
  MiniStat,
  Dot
} from './dashboardStyles';
import {
  computePlayerStats,
  comparePlayersForTable,
  TABLE_SORT_DEFAULTS
} from '../pokerStats';

export function OverallStandingsCard() {
  const playerStats = useMemo(() => computePlayerStats(), []);
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

  const chartSortedPlayers = useMemo(
    () => [...playerStats].sort((a, b) => b.totalPoints - a.totalPoints || b.wins - a.wins),
    [playerStats]
  );

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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Overall Standings</CardTitle>
        <CardMeta>Click any column header to sort by that column.</CardMeta>
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
            Top performer: <strong>{topPerformer.name}</strong> ({topPerformer.totalPoints} pts)
          </span>
        </MiniStat>
        <MiniStat>
          <Dot color="#3b82f6" />
          <span>
            Most participated: <strong>{mostGamesPlayed.name}</strong> ({mostGamesPlayed.gamesPlayed}{' '}
            games)
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
            PPG: <strong>{mostAvgPerGame.name}</strong> ({mostAvgPerGame.avgPoints.toFixed(2)})
          </span>
        </MiniStat>
      </MiniStatRow>
    </Card>
  );
}
