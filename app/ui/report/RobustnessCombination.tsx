// import React, { useState } from 'react';
// import { VictoryBar, VictoryChart, VictoryAxis, VictoryLegend, VictoryTooltip, VictoryTheme } from 'victory';
// import { AppBar, Tabs, Tab, Box, Typography } from '@mui/material';
// // import JailData from '../../../../data/robustness/2.jailbreak_number_overview_tax.json';
// // import statData from '../../../../data/robustness/1.statistic_overview_tax.json';
// import JailData from "data_ui/robustness/2.jailbreak_number_overview_tax.json";
// import statData from "data_ui/robustness/1.statistic_overview_tax.json";
// const transformedData = statData
//   .map((item) => ({
//     taxonomy: item.MLC_taxonomy,
//     min: item.min,
//     max: item.max,
//     median: item.median,
//     mean: item.mean,
//     variance: item.variance,
//   }))
//   .sort((a, b) => {
//     const numA = parseInt(a.taxonomy.slice(1), 10);
//     const numB = parseInt(b.taxonomy.slice(1), 10);
//     if (isNaN(numA) || isNaN(numB)) {
//       return a.taxonomy.localeCompare(b.taxonomy);
//     }
//     return numA - numB;
//   });

// export default function StatisticalOverview() {
//   const [selectedTab, setSelectedTab] = useState(0);

//   const handleTabChange = (event, newValue) => {
//     setSelectedTab(newValue);
//   };

//   const renderBarChart = (data) => {
//     const { min, max, median, mean } = data;
//     const chartData = [
//       { label: "Min", value: min },
//       { label: "Max", value: max },
//       { label: "Median", value: median },
//       { label: "Mean", value: mean },
//     ];

//     const colors = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"];

//     return (
//       <div
//         style={{
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           textAlign: "center",
//         }}
//       >
//         <h1
//           style={{ fill: "black", fontSize: 20, fontWeight: "bold" }}
//           className="text-1xl"
//         >
//         Attempts to Jailbreak
//         </h1>
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             width: "100%",
//           }}
//         >
//           <div style={{ width: "70%" }}>
//             <VictoryChart domainPadding={{ x: 30 }}>
//               <VictoryAxis />
//               <VictoryAxis dependentAxis />
//               <VictoryBar
//                 data={chartData}
//                 x="label"
//                 y="value"
//                 labels={({ datum }) =>
//                   datum.value !== undefined && datum.value !== null
//                     ? `${datum.label}: ${datum.value.toFixed(2)}`
//                     : `${datum.label}: N/A`
//                 }
//                 labelComponent={
//                   <VictoryTooltip
//                     flyoutStyle={{ fill: "white" }}
//                     style={{ fontSize: 12 }}
//                     renderInPortal={true}
//                   />
//                 }
//                 style={{
//                   data: {
//                     fill: ({ index }) => colors[index % colors.length],
//                   },
//                   labels: {
//                     fontSize: 12,
//                     fill: "#333",
//                   },
//                 }}
//               />
//             </VictoryChart>
//           </div>
//           <div style={{ width: "30%", marginLeft: "40px" }}>
//             <VictoryLegend
//               title="Attempts Stats"
//               centerTitle
//               orientation="vertical"
//               gutter={20}
//               style={{
//                 title: { fontSize: 30 },
//                 labels: { fontSize: 24 },
//               }}
//               data={chartData.map((item, index) => ({
//                 name:
//                   item.value !== null
//                     ? `${item.label}: ${item.value.toFixed(2)}`
//                     : `${item.label}: N/A`,
//                 symbol: { fill: colors[index % colors.length] },
//               }))}
//             />
//           </div>
//         </div>
//       </div>
//     );
//   };

//   const renderRobustnessComparison = (data) => {
//     const robustTotal = data.number_robust;
//     const jailbreakTotal = data.number_jailbreak;
  
//     const transformedData = [
//       { type: 'Robust', value: robustTotal },
//       { type: 'Jailbreak', value: jailbreakTotal },
//     ];
  
//     return (
//       <div
//         style={{
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           textAlign: "center",
//         }}
//       >
//         <h1
//           style={{ fill: "black", fontSize: 20, fontWeight: "bold" }}
//           className="text-1xl"
//         >
//           Robust vs Jailbreak
//         </h1>
//         <div style={{ display: 'flex', justifyContent: 'center' }}>
//           <div style={{ width: '70%' }}>
//             <VictoryChart theme={VictoryTheme.material} domainPadding={{ x: 80 }} width={500} height={330}>
//               <VictoryAxis
//                 tickFormat={['Robust', 'Jailbreak']}
//                 style={{
//                   tickLabels: { fontSize: 14 },
//                   grid: { stroke: 'none' },
//                 }}
//               />
//               <VictoryAxis
//                 dependentAxis
//                 style={{
//                   tickLabels: { fontSize: 14 },
//                   grid: { stroke: 'none' },
//                 }}
//               />
//               <VictoryBar
//                 data={transformedData}
//                 x="type"
//                 y="value"
//                 labels={({ datum }) => `${datum.type}: ${datum.value}`}
//                 labelComponent={<VictoryTooltip />}
//                 barWidth={40}
//                 style={{
//                   data: {
//                     fill: ({ datum }) => datum.type === 'Robust' ? '#4BC0C0' : '#FF6384',
//                   },
//                   labels: { fontSize: 12 },
//                 }}
//               />
//             </VictoryChart>
//           </div>
//           <div style={{ width: '30%', marginLeft: '20px' }}>
//             <VictoryLegend
//               title="Category"
//               centerTitle
//               orientation="vertical"
//               gutter={20}
//               style={{
//                 title: { fontSize: 30 },
//                 labels: { fontSize: 24 },
//               }}
//               data={[
//                 { name: 'Robust', symbol: { fill: '#4BC0C0' } },
//                 { name: 'Jailbreak', symbol: { fill: '#FF6384' } },
//               ]}
//             />
//           </div>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div>
//       <Tabs value={selectedTab} onChange={handleTabChange}>
//         {transformedData.map((item, index) => (
//           <Tab key={index} label={item.taxonomy} />
//         ))}
//       </Tabs>
//       {transformedData.map((item, index) => (
//         <TabPanel key={index} value={selectedTab} index={index}>
//           <div style={{ display: 'flex' }}>
//             <div style={{ flex: 1, marginRight: '20px' }}>{renderBarChart(item)}</div>
//             <div style={{ flex: 1 }}>
//               {JailData.map((jailItem) => {
//                 if (jailItem.MLC_taxonomy === item.taxonomy) {
//                   return renderRobustnessComparison(jailItem);
//                 }
//                 return null;
//               })}
//             </div>
//           </div>
//         </TabPanel>
//       ))}
//     </div>
//   );
// }

// function TabPanel(props) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`tabpanel-${index}`}
//       aria-labelledby={`tab-${index}`}
//       {...other}
//     >
//       {value === index && <Box p={3}>{children}</Box>}
//     </div>
//   );
// }

import React, { useState } from 'react';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryLegend, VictoryTooltip, VictoryTheme } from 'victory';
import { AppBar, Tabs, Tab, Box } from '@mui/material';
import JailData from "data_ui/robustness/2.jailbreak_number_overview_tax.json";
import statData from "data_ui/robustness/1.statistic_overview_tax.json";

const transformedData = statData
  .map((item) => ({
    taxonomy: item.MLC_taxonomy,
    min: item.min,
    max: item.max,
    median: item.median,
    mean: item.mean,
    variance: item.variance,
  }))
  .sort((a, b) => {
    const numA = parseInt(a.taxonomy.slice(1), 10);
    const numB = parseInt(b.taxonomy.slice(1), 10);
    return isNaN(numA) || isNaN(numB) ? a.taxonomy.localeCompare(b.taxonomy) : numA - numB;
  });

export default function StatisticalOverview() {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const renderBarChart = (data) => {
    const { min, max, median, mean } = data;
    const chartData = [
      { label: "Min", value: min },
      { label: "Max", value: max },
      { label: "Median", value: median },
      { label: "Mean", value: mean },
    ];

    const colors = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"];

    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
        <h1 style={{ fill: "black", fontSize: 20, fontWeight: "bold" }}>Attempts to Jailbreak</h1>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
          <div style={{ width: "70%" }}>
            <VictoryChart domainPadding={{ x: 30 }}>
              <VictoryAxis />
              <VictoryAxis dependentAxis />
              <VictoryBar
                data={chartData}
                x="label"
                y="value"
                labels={({ datum }) => datum.value !== undefined && datum.value !== null
                  ? `${datum.label}: ${datum.value.toFixed(2)}`
                  : `${datum.label}: N/A`}
                labelComponent={
                  <VictoryTooltip
                    flyoutStyle={{ fill: "white" }}
                    style={{ fontSize: 12 }}
                    renderInPortal={true}
                  />
                }
                style={{
                  data: { fill: ({ index }) => colors[index % colors.length] },
                  labels: { fontSize: 12, fill: "#333" },
                }}
              />
            </VictoryChart>
          </div>
          <div style={{ width: "30%", marginLeft: "40px" }}>
            <VictoryLegend
              title="Attempts Stats"
              centerTitle
              orientation="vertical"
              gutter={20}
              style={{ title: { fontSize: 30 }, labels: { fontSize: 24 } }}
              data={chartData.map((item, index) => ({
                name: item.value !== null
                  ? `${item.label}: ${item.value.toFixed(2)}`
                  : `${item.label}: N/A`,
                symbol: { fill: colors[index % colors.length] },
              }))}
            />
          </div>
        </div>
      </div>
    );
  };

  const renderRobustnessComparison = (data) => {
    const robustTotal = data.number_robust;
    const jailbreakTotal = data.number_jailbreak;

    const transformedData = [
      { type: 'Robust', value: robustTotal },
      { type: 'Jailbreak', value: jailbreakTotal },
    ];

    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
        <h1 style={{ fill: "black", fontSize: 20, fontWeight: "bold" }}>Robust vs Jailbreak</h1>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: '70%' }}>
            <VictoryChart theme={VictoryTheme.material} domainPadding={{ x: 80 }} width={500} height={330}>
              <VictoryAxis
                tickFormat={['Robust', 'Jailbreak']}
                style={{
                  tickLabels: { fontSize: 14 },
                  grid: { stroke: 'none' },
                }}
              />
              <VictoryAxis
                dependentAxis
                style={{
                  tickLabels: { fontSize: 14 },
                  grid: { stroke: 'none' },
                }}
              />
              <VictoryBar
                data={transformedData}
                x="type"
                y="value"
                labels={({ datum }) => `${datum.type}: ${datum.value}`}
                labelComponent={<VictoryTooltip />}
                barWidth={40}
                style={{
                  data: {
                    fill: ({ datum }) => datum.type === 'Robust' ? '#4BC0C0' : '#FF6384',
                  },
                  labels: { fontSize: 12 },
                }}
              />
            </VictoryChart>
          </div>
          <div style={{ width: '30%', marginLeft: '20px' }}>
            <VictoryLegend
              title="Category"
              centerTitle
              orientation="vertical"
              gutter={20}
              style={{ title: { fontSize: 30 }, labels: { fontSize: 24 } }}
              data={[
                { name: 'Robust', symbol: { fill: '#4BC0C0' } },
                { name: 'Jailbreak', symbol: { fill: '#FF6384' } },
              ]}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <Tabs value={selectedTab} onChange={handleTabChange}>
        {transformedData.map((item, index) => (
          <Tab key={index} label={item.taxonomy} />
        ))}
      </Tabs>
      {transformedData.map((item, index) => (
        <TabPanel key={index} value={selectedTab} index={index}>
          <div style={{ display: 'flex' }}>
            <div style={{ flex: 1, marginRight: '20px' }}>{renderBarChart(item)}</div>
            <div style={{ flex: 1 }}>
              {/* Find the jail item once per taxonomy */}
              {JailData.find(jailItem => jailItem.MLC_taxonomy === item.taxonomy) && renderRobustnessComparison(JailData.find(jailItem => jailItem.MLC_taxonomy === item.taxonomy))}
            </div>
          </div>
        </TabPanel>
      ))}
    </div>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}
