import React from 'react';
import { useSeason } from '../SeasonContext';
import { RulesSection, RulesList, Card, CardTitle } from './dashboardStyles';

export function Rules() {
  const { season } = useSeason();
  const isSeason3 = season.id === 3;

  return (
    <RulesSection>
      <Card>
        <CardTitle>Tournament rules — {season.label}</CardTitle>
        <RulesList>
          <li>
            When <strong>two or more</strong> players finish with <strong>equal points</strong>,
            ties are broken in this order: <strong>most 1st places</strong>, then{' '}
            <strong>most 2nd places</strong>, then <strong>highest PPG</strong>.
          </li>
          <li>
            A <strong>valid game</strong> that is <strong>eligible</strong> to{' '}
            <strong>count toward points</strong> needs a <strong>minimum of 6 players</strong>.
          </li>
          {isSeason3 ? (
            <>
              <li>
                <strong>Podium points</strong> depend on how many players are present:{' '}
                <strong>6–7 players</strong> → 4 / 2 / 1; <strong>8–9 players</strong> → 5 / 3 / 2
                / 1; <strong>10 players</strong> → 6 / 4 / 2 / 1.
              </li>
              <li>
                <strong>RF</strong> scores <strong>{season.bonuses.RF}</strong> points;{' '}
                <strong>SF</strong> scores <strong>{season.bonuses.SF}</strong>;{' '}
                <strong>PO</strong> (poker) scores <strong>{season.bonuses.PO}</strong> point.
              </li>
            </>
          ) : (
            <li>
              <strong>RF</strong> scores <strong>{season.bonuses.RF}</strong> points;{' '}
              <strong>SF</strong> scores <strong>{season.bonuses.SF}</strong>. A{' '}
              <strong>valid RF</strong> or <strong>valid SF</strong> requires{' '}
              <strong>at least 2 players</strong> still in the hand through the{' '}
              <strong>last moment of the round</strong>. If <strong>RF</strong> or <strong>SF</strong>{' '}
              is <strong>on the ground</strong>, <strong>nobody</strong> receives those{' '}
              <strong>points</strong>.
            </li>
          )}
          <li>
            Each player may take up to <strong>2 re-buys</strong>. <strong>Revoting</strong> on this
            rule is <strong> strictly prohibited</strong>.
          </li>
        </RulesList>
      </Card>
    </RulesSection>
  );
}
