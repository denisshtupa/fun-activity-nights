import React, { useState } from 'react';
import styled from 'styled-components';
import {
  DASHBOARD_AUTH_STORAGE_KEY,
  DASHBOARD_LOGIN_PASSWORD,
  DASHBOARD_LOGIN_USERNAME
} from '../constants';
import { Card, CardTitle } from './dashboardStyles';

const LoginWrap = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
`;

const LoginCard = styled(Card)`
  width: 100%;
  max-width: 380px;
  gap: 16px;
`;

const Subtitle = styled.p`
  margin: -6px 0 0;
  font-size: 0.8rem;
  color: var(--muted);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const Label = styled.label`
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--muted);
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Input = styled.input`
  background: #020617;
  border: 1px solid rgba(55, 65, 81, 0.9);
  border-radius: 10px;
  color: #e5e7eb;
  padding: 10px 12px;
  font-size: 0.9rem;
  outline: none;

  &:focus {
    border-color: rgba(99, 102, 241, 0.55);
  }
`;

const SubmitButton = styled.button`
  margin-top: 4px;
  padding: 10px 16px;
  border-radius: 999px;
  border: none;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 0.75rem;
  cursor: pointer;
  background: radial-gradient(circle at top left, #22c55e, #16a34a);
  color: #e5f9ed;

  &:hover {
    filter: brightness(1.06);
  }
`;

const ErrorText = styled.p`
  margin: 0;
  font-size: 0.8rem;
  color: #f87171;
`;

export const LoginPage = ({ onSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      username === DASHBOARD_LOGIN_USERNAME &&
      password === DASHBOARD_LOGIN_PASSWORD
    ) {
      setError('');
      try {
        localStorage.setItem(DASHBOARD_AUTH_STORAGE_KEY, '1');
      } catch {
        // Still allow access if storage is unavailable
      }
      onSuccess();
      return;
    }
    setError('Invalid username or password.');
  };

  return (
    <LoginWrap>
      <LoginCard>
        <CardTitle>Sign in</CardTitle>
        <Subtitle>Poker nights dashboard</Subtitle>
        <Form onSubmit={handleSubmit} noValidate>
          <Label>
            Username
            <Input
              name="username"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Label>
          <Label>
            Password
            <Input
              type="password"
              name="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Label>
          {error ? <ErrorText>{error}</ErrorText> : null}
          <SubmitButton type="submit">Continue</SubmitButton>
        </Form>
      </LoginCard>
    </LoginWrap>
  );
};
