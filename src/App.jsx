import React, { useMemo } from 'react';
import { TOTAL_TOURNAMENT_NIGHTS } from './constants';
import { countNightsPlayed } from './pokerStats';
import {
  AppContainer,
  Header,
  TitleGroup,
  Title,
  Badge,
  Layout,
  ChartsGrid
} from './components/dashboardStyles';
import { OverallStandingsCard } from './components/OverallStandingsCard';
import { HeadToHeadWidget } from './components/HeadToHeadWidget';
import { CumulativePointsByNightWidget } from './components/CumulativePointsByNightWidget';
import { NightStandingsWidget } from './components/NightStandingsWidget';
import { NightPodiumWidget } from './components/NightPodiumWidget';

const App = () => {
  const nightsPlayed = useMemo(() => countNightsPlayed(), []);

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

        <div>
          <ChartsGrid>
            <HeadToHeadWidget />
            <CumulativePointsByNightWidget />
            <NightStandingsWidget />
            <NightPodiumWidget />
          </ChartsGrid>
        </div>
      </Layout>
    </AppContainer>
  );
};

export default App;
