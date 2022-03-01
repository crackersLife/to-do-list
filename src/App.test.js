import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import App from './App';

test('Check default list name', () => {
  render(<App />);
  const element = screen.getByText(/List Name: Default List Name/i);
  expect(element).toBeInTheDocument();
});

test('Check pending task text is getting loaded', () => {
  render(<App />);
  const element = screen.getByText(/Pending Tasks/i);
  expect(element).toBeInTheDocument();
});
