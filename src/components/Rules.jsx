import React from 'react';
import { RulesSection, RulesList, Card, CardTitle } from './dashboardStyles';

export function Rules() {
  return (
    <RulesSection>
      <Card>
        <CardTitle>Tournament rules</CardTitle>
        <RulesList>
          <li>
            When <strong>two or more</strong> players finish with <strong>equal points</strong>,
            ties are broken in this order: <strong>most 1st places</strong>, then{' '}
            <strong>most 2nd places</strong>, then <strong>highest PPG</strong>.
          </li>
          <li>
            A <strong>valid game</strong> that is <strong>eligible</strong> to{' '}
            <strong>count toward points</strong> needs a <strong>minimum of 6 players</strong>.
            The <strong>only exception</strong> is a <strong>late cancellation</strong>: someone
            who drops out <strong>unexpectedly</strong> within <strong>2–3 hours</strong> of the{' '}
            <strong>scheduled start</strong>. In that case, <strong>5 players</strong> is enough.
          </li>
          <li>
            <strong>RF</strong> scores <strong>10</strong> points; <strong>SF</strong> scores{' '}
            <strong>5</strong>. A <strong>valid RF</strong> or <strong>valid SF</strong> requires{' '}
            <strong>at least 2 players</strong> still in the hand through the{' '}
            <strong>last moment of the round</strong>. If <strong>RF</strong> or <strong>SF</strong>{' '}
            is <strong>on the ground</strong>, <strong>nobody</strong> receives those{' '}
            <strong>points</strong>.
          </li>
        </RulesList>
      </Card>
    </RulesSection>
  );
}
