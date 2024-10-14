import React from 'react';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryTooltip } from 'victory';

export default function EvaluationSummary({ evaluationResult }: { evaluationResult: any[] }) {
  // Aggregate data for robust and jailbreak counts
  let robustTotal = 0;
  let jailbreakTotal = 0;

  evaluationResult.forEach((item: any) => {
    robustTotal += item.number_robust;
    jailbreakTotal += item.number_jailbreak;
  });

  const transformedData = [
    { type: 'Robust', value: robustTotal },
    { type: 'Jailbreak', value: jailbreakTotal },
  ];

  return (
    <div className="mt-6 flow-root">
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1, marginRight: '20px' }}>
          <h3>Robustness Comparison</h3>
          {evaluationResult.map((item, index) => (
            <div key={index}>
              <h2>Taxonomy: {item.MLC_taxonomy}</h2>
              <VictoryChart theme={VictoryTheme.material} domainPadding={{ x: 80 }} width={500} height={300}>
                <VictoryAxis
                  tickFormat={['Robust', 'Jailbreak']} // Explicitly set x-axis labels
                  style={{
                    tickLabels: { fontSize: 10 },
                    grid: { stroke: 'none' },
                  }}
                />
                <VictoryAxis
                  dependentAxis
                  style={{
                    tickLabels: { fontSize: 10 },
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
                    labels: { fontSize: 8 },
                  }}
                />
              </VictoryChart>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
