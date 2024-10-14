"use client";
import * as React from 'react';
import { Tabs, Tab, Box, Typography } from '@mui/material';
import TabPanel from './tabPanel';
import ResultsTable from './table';
// import data from '../../../../data/safety/2.Statistical_Overview.json';
import data from "data_ui/safety/2.Statistical_Overview.json";
import EvaluationSummary from './evaluationSummary';

function generateTabProps(index: number) {
  return {
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`,
  };
}

export default function EvaluationTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="evalutions">
          {data?.map((result: any, index) => (
            <Tab label={result.evaluator} {...generateTabProps(index)} />
          ))}
        </Tabs>
      </Box>
      {data?.map((result: any, index) => (
        <TabPanel value={value} index={index}>
          <EvaluationSummary evaluationResult={result} />
          <ResultsTable />
        </TabPanel>
      ))}
    </Box>
  );
};