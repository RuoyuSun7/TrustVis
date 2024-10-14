import React from 'react';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryStack, VictoryTooltip } from 'victory';

export default function EvaluationSummary({ evaluationResult }: { evaluationResult: any }) {
  const { Accuracy, Precision, F1, Recall, TN, FP, FN, TP } = evaluationResult;

  const performanceData = [
    { metric: 'Accuracy', value: Accuracy },
    { metric: 'Precision', value: Precision },
    { metric: 'F1', value: F1 },
    { metric: 'Recall', value: Recall },
  ];

  const confusionMatrixData = [
    { category: 'True Negative', value: TN },
    { category: 'False Positive', value: FP },
    { category: 'False Negative', value: FN },
    { category: 'True Positive', value: TP },
  ];

  const getTooltipLabel = (datum) => {
    const { x, y } = datum;
    return `${x}: ${y}`;
  };

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: 1, marginRight: '20px' }}>
        <h1>Performance Metrics</h1>
        <VictoryChart theme={VictoryTheme.material} domainPadding={10} width={300} height={200}>
          <VictoryAxis style={{ tickLabels: { fontSize: 8 } }} />
          <VictoryAxis dependentAxis style={{ tickLabels: { fontSize: 8 } }} />
          <VictoryStack colorScale="warm">
            <VictoryBar
              data={performanceData}
              x="metric"
              y="value"
              labels={({ datum }) => `${datum.metric}: ${datum.value}`}
              labelComponent={
                <VictoryTooltip
                  flyoutStyle={{ fill: 'white', stroke: 'gray' }}
                  cornerRadius={5}
                  pointerLength={10}
                />
              }
              events={[
                {
                  target: 'data',
                  eventHandlers: {
                    onMouseOver: () => {
                      return [
                        {
                          target: 'data',
                          mutation: (props) => ({ ...props, style: { fill: 'orange' } }),
                        },
                        {
                          target: 'labels',
                          mutation: () => ({ active: true }),
                        },
                      ];
                    },
                    onMouseOut: () => {
                      return [
                        {
                          target: 'data',
                          mutation: () => ({}),
                        },
                        {
                          target: 'labels',
                          mutation: () => ({ active: false }),
                        },
                      ];
                    },
                  },
                },
              ]}
            />
          </VictoryStack>
        </VictoryChart>
      </div>
      <div style={{ flex: 1 }}>
        <h3>Confusion Matrix</h3>
        <VictoryChart theme={VictoryTheme.material} domainPadding={10} width={300} height={200}>
          <VictoryAxis style={{ tickLabels: { fontSize: 8 } }} />
          <VictoryAxis dependentAxis style={{ tickLabels: { fontSize: 8 } }} />
          <VictoryStack colorScale="cool">
            <VictoryBar
              data={confusionMatrixData}
              x="category"
              y="value"
              labels={({ datum }) => `${datum.category}: ${datum.value}`}
              labelComponent={
                <VictoryTooltip
                  flyoutStyle={{ fill: 'white', stroke: 'gray' }}
                  cornerRadius={5}
                  pointerLength={10}
                />
              }
              events={[
                {
                  target: 'data',
                  eventHandlers: {
                    onMouseOver: () => {
                      return [
                        {
                          target: 'data',
                          mutation: (props) => ({ ...props, style: { fill: 'orange' } }),
                        },
                        {
                          target: 'labels',
                          mutation: () => ({ active: true }),
                        },
                      ];
                    },
                    onMouseOut: () => {
                      return [
                        {
                          target: 'data',
                          mutation: () => ({}),
                        },
                        {
                          target: 'labels',
                          mutation: () => ({ active: false }),
                        },
                      ];
                    },
                  },
                },
              ]}
            />
          </VictoryStack>
        </VictoryChart>
      </div>
    </div>
  );
}