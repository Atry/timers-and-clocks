import { render, fireEvent, screen } from '@testing-library/react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';
import WorldClocks from './WorldClocks';
import React from 'react';

test('select a WorldClock', async () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // turns retries off
        retry: false,
      },
    },
  });
  const { container } = render(
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <QueryClientProvider client={queryClient}>
        <WorldClocks />
      </QueryClientProvider>
    </LocalizationProvider>
  );
  const openButton = await screen.findByTitle('Open');
  fireEvent.click(openButton);
  const losAngelesItem = await screen.findByText(/Los_Angeles/);
  fireEvent.click(losAngelesItem);
  await screen.findByText(/The internet time for the time zone/);
  expect(container).toMatchSnapshot();
});