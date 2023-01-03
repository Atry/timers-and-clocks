import { AddAlarm, Delete } from '@mui/icons-material';
import { Alert, Box, Button, IconButton, List, ListItem, ListItemText, Stack, TextField } from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import React, { useState } from 'react';
import { useCountdown, useEffectOnce } from 'usehooks-ts';

function CountdownTimer(props: { durationSeconds: number }) {
  const [remainingSeconds, { startCountdown }] = useCountdown({
    countStart: props.durationSeconds,
    intervalMs: 1000,
    countStop: 0,
    isIncrement: false,
  });
  useEffectOnce(startCountdown);
  if (remainingSeconds === 0) {
    return <Alert severity="warning">Time Up!</Alert>;
  } else {
    return <>
      Time Remaining:&nbsp;
      {
        dayjs('0000-00-00').add(remainingSeconds, 'seconds').format('HH:mm:ss')
      }</>
  };

}

export default function CountdownTimers() {
  // Dayjs getters can produce NaN when the date time is incomplete
  const [durationSeconds, setDurationSeconds] = useState<number>(NaN);
  const [timers, setTimers] =
    useState<{ key: number, durationSeconds: number }[]>([]);
  const addTimer = () => {
    if (!isNaN(durationSeconds)) {
      const key =
        timers.length === 0 ?
          0 :
          timers[timers.length - 1].key + 1;
      setTimers([...timers, { key, durationSeconds }]);
      setDurationSeconds(NaN);
    }
  }

  return (
    <Stack>
      <Box
        component="form"
        sx={{ display: 'flex' }}
        onSubmit={event => { addTimer(); event.preventDefault(); }}
      >
        <TimePicker
          renderInput={(params) =>
            <TextField sx={{ flex: 1 }} {...params} />
          }
          ampm={false}
          openTo="hours"
          views={['hours', 'minutes', 'seconds']}
          inputFormat="HH:mm:ss"
          mask="__:__:__"
          label="New timer"
          value={
            isNaN(durationSeconds) ?
              null :
              dayjs('0000-00-00').add(durationSeconds, 'seconds')
          }
          onChange={(time: null | Dayjs) =>
            time === null ?
              NaN :
              setDurationSeconds(
                (time.hour() * 60 + time.minute()) * 60 + time.second()
              )
          }
        />
        <Button
          disabled={isNaN(durationSeconds)}
          startIcon={<AddAlarm />}
          onClick={_ => addTimer()}
        >
          Add Timer
        </Button>
      </Box>
      <List >
        {
          timers.map(timer =>
            <ListItem
              key={timer.key}
              secondaryAction={
                <IconButton edge="end" aria-label="delete" onClick={_ =>
                  setTimers(timers.filter(filteringTimer =>
                    filteringTimer.key !== timer.key
                  ))
                }>
                  <Delete />
                </IconButton>
              }
            >
              <ListItemText
                primary={
                  <CountdownTimer durationSeconds={timer.durationSeconds} />
                }
              />
            </ListItem>)
        }
      </List>
    </Stack>
  );
}
