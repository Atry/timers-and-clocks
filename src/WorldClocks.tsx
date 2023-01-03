import { Alert, Autocomplete, Box, CircularProgress, Stack, TextField } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

function WorldClock(props: { timezone: string }) {
  const { isLoading, data } = useQuery({
    queryFn: async () => {
      const response = await fetch(`https://worldtimeapi.org/api/timezone/${props.timezone}`, {
        method: 'GET',
        headers: { Accept: "application/json" },
      });
      const json = await response.json();
      return json.datetime as string;
    },
    queryKey: ['datetime', props.timezone]
  });
  if (data !== undefined) {
    return <Box>
      The internet time for the time zone {props.timezone} is {data}.
    </Box>;
  } else if (isLoading) {
    return <CircularProgress title="loading world clock..." />;
  } else {
    return <Alert severity="error">Failed to fetch world clock!</Alert>;
  }
}

function LoadedWorldClocks(props: { timezones: string[] }) {
  const [timezone, setTimezone] = useState<string | null>(null);
  return <Stack>
    <Autocomplete
      disablePortal
      options={props.timezones}
      renderInput={params =>
        <TextField {...params} label="Please select your timezone" />
      }
      onChange={(_, value) => setTimezone(value)}
    />
    {
      timezone !== null &&
      props.timezones.includes(timezone) &&
      <WorldClock timezone={timezone} />
    }
  </Stack>;
}

export default function WorldClocks() {
  const { isLoading, data } = useQuery({
    queryFn: async () => {
      const response = await fetch('https://worldtimeapi.org/api/timezone', {
        method: 'GET',
        headers: { Accept: "application/json" },
      });
      return await response.json() as string[];
    },
    queryKey: ['timezone-list']
  });
  if (data !== undefined) {
    return <LoadedWorldClocks timezones={data} />;
  } else if (isLoading) {
    return <CircularProgress title="loading timezone list..." />;
  } else {
    return <Alert severity="error">Failed to fetch timezone list!</Alert>;
  }
}
