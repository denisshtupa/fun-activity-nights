import React, { useMemo, useState } from 'react';
import { useSeason } from './SeasonContext';
import {
  AppContainer,
  Header,
  TitleGroup,
  Title,
  Badge,
  BadgeGroup,
  Layout,
  ChartsSection,
  ChartsGrid,
  SeasonTabBar,
  SeasonTab
} from './components/dashboardStyles';
import { OverallStandingsCard } from './components/OverallStandingsCard';
import { HeadToHeadWidget } from './components/HeadToHeadWidget';
import { CumulativePointsByNightWidget } from './components/CumulativePointsByNightWidget';
import { NightStandingsWidget } from './components/NightStandingsWidget';
import { NightPodiumWidget } from './components/NightPodiumWidget';
import { HandBonusesWidget } from './components/HandBonusesWidget';
import { LoginPage } from './components/LoginPage';
import { Rules } from './components/Rules';
import { DASHBOARD_AUTH_STORAGE_KEY } from './constants';
import { SEASON_LIST } from './seasons';

const readStoredAuth = () => {
  try {
    return localStorage.getItem(DASHBOARD_AUTH_STORAGE_KEY) === '1';
  } catch {
    return false;
  }
};

const App = () => {
  const [authenticated, setAuthenticated] = useState(readStoredAuth);
  const { seasonId, setSeasonId, season, stats } = useSeason();
  const nightsPlayed = useMemo(() => stats.countNightsPlayed(), [stats]);
  const gamesToGo = Math.max(season.totalTournamentNights - nightsPlayed, 0);

  if (!authenticated) {
    return <LoginPage onSuccess={() => setAuthenticated(true)} />;
  }

  return (
    <AppContainer>
      <Header>
        <TitleGroup>
          <Title>Poker Nights Dashboard</Title>
          <SeasonTabBar role="tablist" aria-label="Season">
            {SEASON_LIST.map((s) => (
              <SeasonTab
                key={s.id}
                type="button"
                role="tab"
                aria-selected={seasonId === s.id}
                $active={seasonId === s.id}
                onClick={() => setSeasonId(s.id)}
              >
                {s.label}
              </SeasonTab>
            ))}
          </SeasonTabBar>
        </TitleGroup>
        <BadgeGroup>
          <Badge $variant="secondary">
            <span>{gamesToGo} games to go</span>
          </Badge>
          <Badge>
            <span>
              {nightsPlayed}/{season.totalTournamentNights} nights played
            </span>
          </Badge>
        </BadgeGroup>
      </Header>

      <Layout>
        <OverallStandingsCard />

        <ChartsSection>
          <ChartsGrid>
            <HeadToHeadWidget />
            <CumulativePointsByNightWidget />
            <NightStandingsWidget />
            <NightPodiumWidget />
            <HandBonusesWidget />
          </ChartsGrid>
        </ChartsSection>
      </Layout>

      <Rules />
    </AppContainer>
  );
};

export default App;
