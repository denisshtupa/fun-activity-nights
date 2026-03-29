import styled from 'styled-components';

export const AppContainer = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 32px 20px 40px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const Header = styled.header`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
`;

export const TitleGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const Title = styled.h1`
  font-size: 1.9rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: #e2e8f0;
`;

export const Badge = styled.span`
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

export const Layout = styled.main`
  display: grid;
  grid-template-columns: minmax(0, 1.3fr) minmax(0, 1.7fr);
  gap: 24px;
  align-items: start;

  @media (max-width: 960px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const Card = styled.section`
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

export const CardHeader = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
`;

export const CardTitle = styled.h2`
  font-size: 1.05rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: #e5e7eb;
`;

export const CardMeta = styled.p`
  font-size: 0.8rem;
  color: var(--muted);
`;

export const TableWrapper = styled.div`
  border-radius: 14px;
  overflow: auto;
  border: 1px solid rgba(30, 64, 175, 0.7);
  box-shadow: 0 0 0 1px rgba(15, 23, 42, 0.8);
`;

export const StandingsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.84rem;
  min-width: 560px;
  background: #020617;
`;

export const Th = styled.th`
  text-align: left;
  padding: 10px 12px;
  font-weight: 600;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 0.7rem;
  border-bottom: 1px solid rgba(55, 65, 81, 0.9);
`;

export const SortableTh = styled.th`
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

export const ThInner = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
`;

export const SortGlyph = styled.span`
  font-size: 0.65rem;
  opacity: ${({ $active }) => ($active ? 1 : 0.35)};
  color: ${({ $active }) => ($active ? '#a5b4fc' : 'inherit')};
`;

export const Tr = styled.tr`
  &:nth-child(even) {
    background: rgba(15, 23, 42, 0.95);
  }

  &:hover {
    background: rgba(30, 64, 175, 0.4);
  }
`;

export const Td = styled.td`
  padding: 8px 12px;
  border-bottom: 1px solid rgba(31, 41, 55, 0.7);
  color: #e5e7eb;
`;

export const RankPill = styled.span`
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

export const PlayerName = styled.span`
  font-weight: 500;
`;

export const StatPill = styled.span`
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

export const ChartsGrid = styled.div`
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

export const NightStandingsToolbar = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
`;

export const NightStandingsLabel = styled.span`
  font-size: 0.72rem;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
`;

export const ChartCard = styled(Card)`
  padding: 14px 14px 10px;
  min-height: 0;
  display: flex;
  flex-direction: column;

  & .recharts-responsive-container {
    flex: 1;
    min-height: 140px;
  }
`;

export const ChartTitle = styled.h3`
  font-size: 0.8rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #9ca3af;
  margin-bottom: 6px;
`;

export const ChartMeta = styled.p`
  font-size: 0.75rem;
  color: var(--muted);
  margin-bottom: 8px;
`;

export const FilterSelect = styled.select`
  background: #020617;
  border-radius: 999px;
  border: 1px solid rgba(55, 65, 81, 0.9);
  color: #e5e7eb;
  padding: 4px 12px;
  font-size: 0.75rem;
  outline: none;
  cursor: pointer;
`;

export const H2HFilters = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 12px;
`;

export const H2HVs = styled.span`
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: var(--muted);
`;

export const H2HScoreArea = styled.div`
  flex: 1;
  min-height: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

export const H2HScoreRow = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 12px;
  font-variant-numeric: tabular-nums;
`;

export const H2HNameLabel = styled.div`
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #94a3b8;
  max-width: 120px;
  text-align: center;
`;

export const H2HNamesRow = styled.div`
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

export const H2HScoreNum = styled.span`
  font-size: 2rem;
  font-weight: 800;
  color: #e2e8f0;
  line-height: 1;
`;

export const H2HScoreSep = styled.span`
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--muted);
`;

export const H2HMeta = styled.p`
  font-size: 0.68rem;
  color: var(--muted);
  text-align: center;
  margin: 0;
  line-height: 1.45;
`;

export const MiniStatRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 4px;
  font-size: 0.75rem;
  color: var(--muted);
`;

export const MiniStat = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
`;

export const Dot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: ${({ color }) => color || '#6366f1'};
`;
