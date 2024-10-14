import React from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import TabPanel from './tabPanel';
import ResultsTable from './hallucinationTable';
// import data from '../../../../data/hallucination/2.Hallucinated Samples.json';
import data from 'data_ui/hallucination/2.Hallucinated Samples.json';
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

  const uniqueDataset = Array.from(new Set(data.map((item: any) => item.dataset))).filter(
    (dataset: any) => dataset !== null
  );

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="dataset">
          {uniqueDataset.map((taxonomy: any, index: number) => (
            <Tab key={index} label={taxonomy} {...generateTabProps(index)} />
          ))}
        </Tabs>
      </Box>
      {uniqueDataset.map((taxonomy: any, index: number) => (
        <TabPanel key={index} value={value} index={index}>
          {value === index && <ResultsTable selectedTab={index} />}
        </TabPanel>
      ))}
    </Box>
  );
}