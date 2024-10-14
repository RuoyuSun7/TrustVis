import React from "react";
import { VictoryPie, VictoryLegend, VictoryTooltip } from "victory";
//import data from "../../../../data/hallucination/1.Overview of dataset.json";
import data from "data_ui/hallucination/1.Overview of dataset.json";
const generateColors = (keys) => {
  const colorScale = ["#58508D", "#BC5090"]; // Colors for Hallucinated and Non-Hallucinated

  const colors = {};
  keys.forEach((key, index) => {
    colors[key] = colorScale[index % colorScale.length];
  });
  return keys.map(key => colors[key]);
};

const HallucinationOverview = () => {
  const keys = Object.keys(data[0]);
  const formattedData = keys.map(key => ({ x: key, y: data[0][key] }));
  const colors = generateColors(keys);

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
        Hallucination Overview
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
            labels={({ datum }) => `${datum.x}: ${datum.y}`}
            innerRadius={100}
            width={800}
            labelComponent={<VictoryTooltip />}
          />
        </div>
        <div className="w-2/7">
          <VictoryLegend
            x={125}
            y={-30}
            title="Hallucination Statistics"
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

export default HallucinationOverview;
