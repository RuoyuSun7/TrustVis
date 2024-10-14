"use client";
import React, { useState } from 'react';
import EvaluationTabs from '@/app/ui/report/evaluationTabs';
import SafetyIssues from '@/app/ui/report/safetyIssues';
import RobustIssues from '@/app/ui/report/robustIssues';
import HallucinationIssues from '@/app/ui/report/halluIssues';
import GraphSwitcher from '@/app/ui/report/graphSwitcher';
import RobustEvaluationTabs from '@/app/ui/report/robustEvaluationTabs';
import { Grid, Typography, Tabs, Tab, Box } from '@mui/material';
import HallucinationOverview from '@/app/ui/report/hallucinationOverview';
import HallucinationTabs from '@/app/ui/report/hallucinationTabs';
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`,
  };
}

export default function Page() {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h4" component="h1">Reports</Typography>
      </Grid>
      <Grid item xs={12}>
        <Tabs value={value} onChange={handleChange} aria-label="report tabs">
          <Tab label="Safety Report" {...a11yProps(0)} />
          <Tab label="Robustness Report" {...a11yProps(1)} />
          <Tab label="Hallcination Report" {...a11yProps(2)} />
          {/* Add more Tab components for additional reports */}
        </Tabs>
      </Grid>
      <TabPanel value={value} index={0}>
        <Grid item xs={12}>
          <SafetyIssues />
        </Grid>
        <Grid item xs={12}>
          <GraphSwitcher />
        </Grid>
        <Grid item xs={12}>
          <EvaluationTabs />
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={1}>
      <Grid item xs={12}>
          <RobustIssues />
        </Grid>
        <Grid item xs={12}>
          <RobustEvaluationTabs />
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Grid item xs={12}>
          <HallucinationIssues />
        </Grid>
        <Grid item xs={12}>
          <HallucinationOverview />
        </Grid>
        <Grid item xs={12}>
          <HallucinationTabs />
        </Grid>
      </TabPanel>
    </Grid>
  );
}