import React, { useMemo, useState } from 'react';
import { DASHBOARD_AUTH_STORAGE_KEY, TOTAL_TOURNAMENT_NIGHTS } from './constants';
import { countNightsPlayed } from './pokerStats';
import {
  AppContainer,
  Header,
  TitleGroup,
  Title,
  Badge,
  Layout,
  ChartsSection,
  ChartsGrid
} from './components/dashboardStyles';
import { OverallStandingsCard } from './components/OverallStandingsCard';
import { HeadToHeadWidget } from './components/HeadToHeadWidget';
import { CumulativePointsByNightWidget } from './components/CumulativePointsByNightWidget';
import { NightStandingsWidget } from './components/NightStandingsWidget';
import { NightPodiumWidget } from './components/NightPodiumWidget';
import { HandBonusesWidget } from './components/HandBonusesWidget';
import { LoginPage } from './components/LoginPage';
import { Rules } from './components/Rules';

const readStoredAuth = () => {
  try {
    return localStorage.getItem(DASHBOARD_AUTH_STORAGE_KEY) === '1';
  } catch {
    return false;
  }
};

const App = () => {
  const [authenticated, setAuthenticated] = useState(readStoredAuth);
  const nightsPlayed = useMemo(() => countNightsPlayed(), []);

  if (!authenticated) {
    return <LoginPage onSuccess={() => setAuthenticated(true)} />;
  }

  return (
    <AppContainer>
      <Header>
        <TitleGroup>
          <Title>Poker Nights Dashboard</Title>
        </TitleGroup>
        <div>
          <Badge>
            <span>
              {nightsPlayed}/{TOTAL_TOURNAMENT_NIGHTS} nights played
            </span>
          </Badge>
        </div>
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
