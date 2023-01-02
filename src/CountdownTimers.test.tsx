import { act, render, fireEvent, screen } from '@testing-library/react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import CountdownTimers from './CountdownTimers';

test('renders CountdownTimers', () => {
  const { container } = render(
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <CountdownTimers />
    </LocalizationProvider>
  );
  expect(container).toMatchSnapshot();
});

test('adds a CountdownTimer', async () => {
  const mockSetInterval: jest.Mock<number, [Function, number]> =
    jest.fn((callback, timeout) => mockSetInterval.mock.calls.length);
  window.setInterval = mockSetInterval as any;
  const { container } = render(
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <CountdownTimers />
    </LocalizationProvider>
  );
  const durationInput =
    screen.getByPlaceholderText<HTMLInputElement>('hh:mm:ss');
  const addTimerButton = screen.getByText<HTMLButtonElement>(/Add Timer/);
  expect(addTimerButton).toBeDisabled();
  fireEvent.input(durationInput, {
    target: {
      value: '01:02:03',
    },
  });
  expect(addTimerButton).not.toBeDisabled();
  expect(mockSetInterval).not.toBeCalled();
  fireEvent.click(addTimerButton);
  const [callback0] = mockSetInterval.mock.lastCall;
  screen.getByText(/Time Remaining/);
  expect(addTimerButton).toBeDisabled();
  fireEvent.input(durationInput, {
    target: {
      value: '00:00:02',
    },
  });
  expect(addTimerButton).not.toBeDisabled();
  fireEvent.click(addTimerButton);
  const [callback1] = mockSetInterval.mock.lastCall;
  expect(callback1).not.toBe(callback0);
  expect(addTimerButton).toBeDisabled();
  expect(container).toMatchSnapshot();
  act(() => callback0());
  act(() => callback1());
  act(() => callback0());
  act(() => callback1());
  await screen.findByText(/Time Up/);
  expect(container).toMatchSnapshot();
});
