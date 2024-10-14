import React from "react";
import { VictoryPie, VictoryLegend, VictoryTooltip } from "victory";
// import data from "../../../../data/safety/1.Category-Number_Pie_Chart.json";
import data from "data_ui/safety/1.Category-Number_Pie_Chart.json";
const generateColors = (taxonomies: string[]): string[] => {
  const colorScale = [
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

  // Ensure that the same taxonomies always map to the same color
  const colors: { [taxonomy: string]: string } = {};
  taxonomies.forEach((taxonomy, index) => {
    colors[taxonomy] = colorScale[index % colorScale.length];
  });

  // Generate array of colors based on taxonomies
  return taxonomies.map((taxonomy) => colors[taxonomy]);
};

const formattedData = data.flatMap((category) =>
  Object.entries(category)
    .filter(([key, value]) => value > 0)
    .map(([key, value]) => ({ x: key, y: value }))
);

const smallPieceThreshold = 5;
const total = formattedData.reduce((acc, datum) => acc + datum.y, 0);

const CategoryPieChart: React.FC = () => {
  const taxonomies = formattedData.map((item) => item.x);
  const colors = generateColors(taxonomies);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <h1
        style={{ fill: "black", fontSize: 20, fontWeight: "bold" }}
        className="text-1xl"
      >
        Category Overview
      </h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <div className="w-5/7">
          <VictoryPie
            data={formattedData}
            colorScale={colors}
            style={{
              labels: { fill: "black", fontSize: 14, fontWeight: "bold" },
            }}
            labels={({ datum }) => {
              // const percentage = (datum.y / total) * 100;
              
              return `${datum.x}: ${datum.y}`;
            }}
            innerRadius={100}
            width={800}
            labelComponent={
              <VictoryTooltip
                flyoutStyle={{ fill: "white" }}
                style={{ fill: "black", fontSize: 14 }}
              />
            }
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
            data={formattedData.map((item, index) => ({
              name: `${item.x}: ${item.y}`,
              symbol: { fill: colors[index] },
            }))}
            width={400}
          />
        </div>
      </div>
    </div>
  );
};

export default CategoryPieChart;
