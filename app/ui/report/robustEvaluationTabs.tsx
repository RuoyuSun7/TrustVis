"use client";
import * as React from 'react';
import { Box } from '@mui/material';
import TabPanel from './tabPanel';
// import EvaluationSummary from './robustEvaluationSummary';
import StatisticalOverview from './RobustnessCombination';
// import JailData from '../../../../data/robustness/2.jailbreak_number_overview_tax.json';
// import statData from '../../../../data/robustness/1.statistic_overview_tax.json';
import JailData from "data_ui/robustness/2.jailbreak_number_overview_tax.json";
import statData from "data_ui/robustness/1.statistic_overview_tax.json";
import ResultsTable from './robustTable';

export default function EvaluationTabs() {
  const uniqueTaxonomies = Array.from(new Set(JailData.map((item: any) => item.MLC_taxonomy))).filter(
    (taxonomy: any) => taxonomy !== null
  );

  return (
    <Box sx={{ width: '100%' }}>
      <StatisticalOverview />
      {/* {uniqueTaxonomies.map((taxonomy: any, index: number) => {
        const jailItem = JailData.find((item: any) => item.MLC_taxonomy === taxonomy);
        const statItem = statData.find((item: any) => item.MLC_taxonomy === taxonomy);
  
        return (
          <TabPanel key={index} value={index} index={index}>
            <div style={{ display: 'flex' }}>
              <div style={{ flex: 1, marginRight: '20px' }}>
                {statItem && <StatisticalOverview data={statItem} />}
              </div>
            </div>
          </TabPanel>
        );
      })} */}
      <ResultsTable />
    </Box>
  );
  
}
