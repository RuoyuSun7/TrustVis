import React, { useState } from "react";
import { VictoryPie, VictoryLegend, VictoryTooltip } from "victory";
// import data from "../../../../data/safety/1.Category-Number_Pie_Chart.json";
// import unsafeData from "../../../../data/safety/3.Evluation_Results_pie_chart.json";

import data from "data_ui/safety/1.Category-Number_Pie_Chart.json";
import unsafeData from "data_ui/safety/3.Evluation_Results_pie_chart.json";
const colors = [
  "#58508D",
  "#BC5090",
  "#FF6361",
  "#CEA9BC",
  "#2085EC",
  "#72B4EB",
  "#0A417A",
  "#8464A0",
  "#B3C100",
  "#323232",
  "#CED2CC",
];

const CategoryPieChart = () => {
  const [hoveredSlice, setHoveredSlice] = useState(null);

  const formattedData = data.flatMap((category) =>
    Object.entries(category)
      .filter(([key, value]) => value > 0)
      .map(([key, value], index) => ({ x: key, y: value, color: colors[index] }))
  );

  const smallPieceThreshold = 5;
  const total = formattedData.reduce((acc, datum) => acc + datum.y, 0);
  const transformedData = unsafeData
    .map((item) => ({
      taxonomy: item.taxonomy,
      number_unsafe: item.number_unsafe,
      number_total: item.number_total,
    }))
    .filter((item) => item.taxonomy !== "All") // remove 'All' label
    .filter((item) => item.number_unsafe > 0)
    .sort((a, b) => {
      // sort from s1 to s11
      const numA = parseInt(a.taxonomy.slice(1), 10);
      const numB = parseInt(b.taxonomy.slice(1), 10);
      if (isNaN(numA) || isNaN(numB)) {
        return a.taxonomy.localeCompare(b.taxonomy);
      }
      return numA - numB;
    });

  const totalUnsafe = transformedData.reduce(
    (acc, datum) => acc + datum.number_unsafe,
    0
  );

  // Create a color mapping object
  const colorMapping = formattedData.reduce((acc, item, index) => {
    acc[item.x] = colors[index % colors.length];
    return acc;
  }, {});

  const formattedData_unsafe = transformedData.map((item) => ({
    x: item.taxonomy,
    y: item.number_unsafe,
    color: colorMapping[item.taxonomy] || "#CCCCCC", // Use the color mapping or default to gray
  }));

  return (
    <div style={{ display: "flex", alignItems: "center", textAlign: "center", flexDirection: "column" }}>
      <h1 style={{ fill: "black", fontSize: 20, fontWeight: "bold" }} className="text-1xl">
        Unsafe Number Distribution
      </h1>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
        <div className="w-5/7">
          <VictoryPie
            data={formattedData}
            colorScale={formattedData.map((category) => category.color)}
            style={{ labels: { fill: "black", fontSize: 14, fontWeight: "bold" } }}
            labels={({ datum }) => {
              const percentage = (datum.y / total) * 100;
              if (percentage > smallPieceThreshold) {
                return `${datum.x}: ${percentage.toFixed(0)}%`;
              }
              return null;
            }}
            innerRadius={100}
            width={800}
            labelComponent={<VictoryTooltip />}
            events={[
              {
                target: "data",
                eventHandlers: {
                  onMouseOver: () => {
                    return [
                      {
                        target: "labels",
                        mutation: () => ({ active: true }),
                      },
                    ];
                  },
                  onMouseOut: () => {
                    return [
                      {
                        target: "labels",
                        mutation: () => ({ active: false }),
                      },
                    ];
                  },
                },
              },
            ]}
          />
        </div>
        <div className="w-2/7">
          <VictoryLegend
            x={125}
            y={-30}
            title="Category Statistics"
            centerTitle
            orientation="vertical"
            gutter={10}
            style={{ title: { fontSize: 18 } }}
            data={formattedData.map((item) => ({
              name: `${item.x}: ${item.y}`,
              symbol: { fill: item.color },
            }))}
            width={400}
          />
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
        <div className="w-5/7">
          <VictoryPie
            data={formattedData_unsafe}
            colorScale={formattedData_unsafe.map((category) => category.color)}
            style={{ labels: { fill: "black", fontSize: 14, fontWeight: "bold" } }}
            labels={({ datum }) => {
              const percentage = (datum.y / totalUnsafe) * 100;
              return `${datum.x}: ${percentage.toFixed(0)}%`;
            }}
            innerRadius={100}
            width={800}
            labelComponent={<VictoryTooltip />}
            events={[
              {
                target: "data",
                eventHandlers: {
                  onMouseOver: () => {
                    return [
                      {
                        target: "labels",
                        mutation: () => ({ active: true }),
                      },
                    ];
                  },
                  onMouseOut: () => {
                    return [
                      {
                        target: "labels",
                        mutation: () => ({ active: false }),
                      },
                    ];
                  },
                },
              },
            ]}
          />
        </div>
        <div className="w-2/7">
          <VictoryLegend
            x={125}
            y={60}
            title="Unsafe Numbers by Taxonomy"
            centerTitle
            orientation="vertical"
            gutter={10}
            style={{ title: { fontSize: 18 } }}
            data={formattedData_unsafe.map((item) => ({
              name: `${item.x}: ${item.y}`,
              symbol: { fill: colorMapping[item.x] || "#CCCCCC" },
            }))}
            width={400}
          />
        </div>
      </div>
    </div>
  );
};

export default CategoryPieChart;
