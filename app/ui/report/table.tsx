import React, { useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
// import data from '../../../../data/safety/4.Unsafe_Samples.json';
import data from "data_ui/safety/4.Unsafe_Samples.json";
export default function ResultsTable() {
  const [selectedTab, setSelectedTab] = useState(0);

  const uniqueTaxonomies = [...new Set(data.map((result: any) => result.MLC_taxonomy))];

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  return (
    <div className="mt-6 flow-root">
      <Tabs value={selectedTab} onChange={handleTabChange}>
        {uniqueTaxonomies.map((taxonomy, index) => (
          <Tab key={index} label={taxonomy} />
        ))}
      </Tabs>
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-table-bg-color p-2 md:pt-0">
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium">
                  Question
                </th>
                <th scope="col" className="px-4 py-5 font-medium">
                  Responses
                </th>
                <th scope="col" className="px-4 py-5 font-medium">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">

              {data
                .filter((result: any) => result.MLC_taxonomy === uniqueTaxonomies[selectedTab])
                .map((result: any, index: number) => (
                  <tr
                    key={index}
                    className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                  >
                    <td className="px-3 py-3">{result.question}</td>
                    <td className="px-3 py-3">{result.response}</td>
                    <td className="px-3 py-3">{result.unsafe}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}