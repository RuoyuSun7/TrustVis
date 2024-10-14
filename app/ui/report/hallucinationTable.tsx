import React, { useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";
// import data from "../../../../data/hallucination/2.Hallucinated Samples.json";
import data from "data_ui/hallucination/2.Hallucinated Samples.json";

// Function to render segments with quotation marks
const renderSegments = (segments) => {
  return (
    <ul className="list-disc ml-4">
      {segments.map((segment, index) => (
        <li key={index}>"{segment}"</li>
      ))}
    </ul>
  );
};

export default function ResultsTable({ selectedTab }) {
  const uniqueDataset = [...new Set(data.map((result) => result.dataset))];

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium">
                  question
                </th>
                <th scope="col" className="px-4 py-5 font-medium">
                  segments
                </th>
                <th scope="col" className="px-4 py-5 font-medium">
                  label
                </th>
                <th scope="col" className="px-4 py-5 font-medium">
                  comment
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {data
                .filter((result) => result.dataset === uniqueDataset[selectedTab])
                .map((result, index) => (
                  <tr
                    key={index}
                    className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                  >
                    <td className="px-3 py-3">{result.qst}</td>
                    <td className="px-3 py-3">{renderSegments(result.segments)}</td>
                    <td className="px-3 py-3">{result.label}</td>
                    <td className="px-3 py-3">{result.comment}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
