import React, { useMemo, useState } from 'react';
import { useSeason } from '../SeasonContext';
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

export function OverallStandingsCard() {
  const { season, stats } = useSeason();
  const { players } = season;
  const playerStats = useMemo(() => stats.computePlayerStats(), [stats]);
  const [tableSortKey, setTableSortKey] = useState('total');
  const [tableSortDir, setTableSortDir] = useState('desc');

  const tableRows = useMemo(
    () =>
      [...playerStats].sort((a, b) => stats.comparePlayersForTable(a, b, tableSortKey, tableSortDir)),
    [playerStats, stats, tableSortKey, tableSortDir]
  );

  const handleTableSort = (key) => {
    if (tableSortKey === key) {
      setTableSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setTableSortKey(key);
      setTableSortDir(stats.TABLE_SORT_DEFAULTS[key] ?? 'desc');
    }
  };

  const chartSortedPlayers = useMemo(
    () => [...playerStats].sort((a, b) => -stats.compareTotalThenPodiumsThenPpg(a, b)),
    [playerStats, stats]
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
  const mostFourth = [...playerStats].sort(
    (a, b) => (b.fourths ?? 0) - (a.fourths ?? 0) || b.totalPoints - a.totalPoints
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
              {season.hasFourthPlace ? (
                <SortableTh scope="col" onClick={() => handleTableSort('fourths')}>
                  <ThInner>
                    4th
                    <SortGlyph $active={tableSortKey === 'fourths'}>
                      {tableSortKey === 'fourths' ? (tableSortDir === 'asc' ? '↑' : '↓') : '↕'}
                    </SortGlyph>
                  </ThInner>
                </SortableTh>
              ) : null}
              <SortableTh scope="col" onClick={() => handleTableSort('avgPoints')}>
                <ThInner>
                  PPG
                  <SortGlyph $active={tableSortKey === 'avgPoints'}>
                    {tableSortKey === 'avgPoints' ? (tableSortDir === 'asc' ? '↑' : '↓') : '↕'}
                  </SortGlyph>
                </ThInner>
              </SortableTh>
              <SortableTh scope="col" onClick={() => handleTableSort('rfCount')}>
                <ThInner>
                  RF
                  <SortGlyph $active={tableSortKey === 'rfCount'}>
                    {tableSortKey === 'rfCount' ? (tableSortDir === 'asc' ? '↑' : '↓') : '↕'}
                  </SortGlyph>
                </ThInner>
              </SortableTh>
              <SortableTh scope="col" onClick={() => handleTableSort('sfCount')}>
                <ThInner>
                  SF
                  <SortGlyph $active={tableSortKey === 'sfCount'}>
                    {tableSortKey === 'sfCount' ? (tableSortDir === 'asc' ? '↑' : '↓') : '↕'}
                  </SortGlyph>
                </ThInner>
              </SortableTh>
              {season.hasPoBonus ? (
                <SortableTh scope="col" onClick={() => handleTableSort('poCount')}>
                  <ThInner>
                    PO
                    <SortGlyph $active={tableSortKey === 'poCount'}>
                      {tableSortKey === 'poCount' ? (tableSortDir === 'asc' ? '↑' : '↓') : '↕'}
                    </SortGlyph>
                  </ThInner>
                </SortableTh>
              ) : null}
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
                {season.hasFourthPlace ? <Td>{player.fourths}</Td> : null}
                <Td>{player.avgPoints.toFixed(2)}</Td>
                <Td>{player.rfCount}</Td>
                <Td>{player.sfCount}</Td>
                {season.hasPoBonus ? <Td>{player.poCount}</Td> : null}
              </Tr>
            ))}
          </tbody>
        </StandingsTable>
      </TableWrapper>

      <MiniStatRow>
        <MiniStat>
          <Dot color="#facc15" />
          <span>
            Top performer: <strong>{topPerformer?.name ?? '—'}</strong> ({topPerformer?.totalPoints ?? 0}{' '}
            pts)
          </span>
        </MiniStat>
        <MiniStat>
          <Dot color="#3b82f6" />
          <span>
            Most participated: <strong>{mostGamesPlayed?.name ?? '—'}</strong> (
            {mostGamesPlayed?.gamesPlayed ?? 0} games)
          </span>
        </MiniStat>
        <MiniStat>
          <Dot color="#22c55e" />
          <span>
            Most 1st: <strong>{mostFirst?.name ?? '—'}</strong> ({mostFirst?.wins ?? 0} wins)
          </span>
        </MiniStat>
        <MiniStat>
          <Dot color="#a855f7" />
          <span>
            Most 2nd: <strong>{mostSecond?.name ?? '—'}</strong> ({mostSecond?.seconds ?? 0})
          </span>
        </MiniStat>
        <MiniStat>
          <Dot color="#f97316" />
          <span>
            Most 3rd: <strong>{mostThird?.name ?? '—'}</strong> ({mostThird?.thirds ?? 0})
          </span>
        </MiniStat>
        {season.hasFourthPlace ? (
          <MiniStat>
            <Dot color="#eab308" />
            <span>
              Most 4th: <strong>{mostFourth?.name ?? '—'}</strong> ({mostFourth?.fourths ?? 0})
            </span>
          </MiniStat>
        ) : null}
        <MiniStat>
          <Dot color="#06b6d4" />
          <span>
            PPG: <strong>{mostAvgPerGame?.name ?? '—'}</strong> (
            {mostAvgPerGame?.avgPoints.toFixed(2) ?? '0.00'})
          </span>
        </MiniStat>
      </MiniStatRow>
    </Card>
  );
}
