"use client";
import * as React from "react";
import { Tabs, Tab } from "@mui/material";
import CategoryPieChart from "./categoryPieChart";
import MixtureCategoryPieChart from "./mixtureCategoryPieChart";
import CategoryTotalUnsafePieChart from "./CategoryTotalUnsafePieChart";

const GraphSwitcher: React.FC = () => {
  const [selectedTab, setSelectedTab] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setSelectedTab(newValue);
  };

  return (
    <div>
      <Tabs
        value={selectedTab}
        onChange={handleChange}
        indicatorColor="primary"
      >
        <Tab label="Overview" />
        <Tab label="Unsafe" />
        
      </Tabs>
      {selectedTab === 0 && <CategoryPieChart />}
      {selectedTab === 1 && <CategoryTotalUnsafePieChart />}
    </div>
  );
};

export default GraphSwitcher;
