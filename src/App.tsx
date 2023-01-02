import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Tab } from '@mui/material';
import React from 'react';
import CountdownTimers from './CountdownTimers';
import WorldClocks from './WorldClocks';

export default function App() {
  const [tab, setTab] = React.useState('countdown-timers');
  return <Box sx={{ width: '100%', typography: 'body1' }}>
    <TabContext value={tab}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <TabList
          aria-label="timer tabs"
          onChange={(_, newTab) => setTab(newTab)}
        >
          <Tab label="Countdown Timers" value="countdown-timers" />
          <Tab label="World Clocks" value="world-clocks" />
        </TabList>
      </Box>
      <TabPanel value="countdown-timers"><CountdownTimers /></TabPanel>
      <TabPanel value="world-clocks"><WorldClocks /></TabPanel>
    </TabContext>
  </Box>;
}
