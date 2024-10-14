"use client";

import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import data from "data_ui/safety/1.Category-Number_Pie_Chart.json";

const CategoryCountingPie = () => {
  const [selectedTaxonomy, setSelectedTaxonomy] = useState("S11: Sexual Content");
  const svgRef = useRef(null);

  const drawChart = () => {
    const container = d3.select(svgRef.current);
    const containerWidth = container.node().getBoundingClientRect().width;
    const width = containerWidth / 2; // Adjust to desired size, change to /4 if needed
    const height = width + 80; // Add height to accommodate the dropdown menu
    const radius = Math.min(width, height - 80) / 2; // Adjust for the added dropdown space

    const color = d3.scaleOrdinal()
      .domain(['Safe', 'Unsafe'])
      .range(['#34a853', '#d64830']);

    const filteredData = selectedTaxonomy
      ? data.filter((item) => item.taxonomy === selectedTaxonomy)
      : data;

    const pieData = filteredData.flatMap((item) => [
      { value: item.number_safe, category: "Safe" },
      { value: item.number_unsafe, category: "Unsafe" },
    ]);

    const pie = d3.pie().value((d) => d.value);

    const arc = d3.arc().innerRadius(radius * 0.67).outerRadius(radius - 1);

    container.selectAll("*").remove();

    const svg = container
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("preserveAspectRatio", "xMidYMid meet")
      .append("g")
      .attr("transform", `translate(${width / 2},${(height - 80) / 2})`);

    svg
      .selectAll("path")
      .data(pie(pieData))
      .enter()
      .append("path")
      .attr("d", arc)
      .attr("fill", (d) => color(d.data.category))
      .on("mouseover", function (event, d) {
        d3.select(this).style("opacity", 0.7);
        tooltip
          .style("visibility", "visible")
          .text(`${d.data.category}: ${d.data.value}`);
      })
      .on("mousemove", function (event) {
        tooltip
          .style("top", event.pageY - 10 + "px")
          .style("left", event.pageX + 10 + "px");
      })
      .on("mouseout", function () {
        d3.select(this).style("opacity", 1);
        tooltip.style("visibility", "hidden");
      });

    const legend = svg
      .append("g")
      .attr("transform", `translate(${radius + 20}, -${radius - 20})`);

    const legendItem = legend
      .selectAll(".legend")
      .data(pieData)
      .enter()
      .append("g")
      .attr("class", "legend")
      .attr("transform", (d, i) => `translate(0,${i * 20})`);

    legendItem
      .append("circle")
      .attr("cx", 4)
      .attr("cy", 10)
      .attr('r', 6)
      .attr("fill", (d) => color(d.category));

    legendItem
      .append("text")
      .attr("x", 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "start")
      .text((d) => d.category);

    const tooltip = d3
      .select(".pie-chart")
      .append("div")
      .attr("class", "tooltip")
      .style("position", "absolute")
      .style("visibility", "hidden")
      .style("background-color", "white")
      .style("border", "solid")
      .style("border-width", "1px")
      .style("border-radius", "5px")
      .style("padding", "5px");

    // Append dropdown menu inside the SVG
    svg.append("foreignObject")
      .attr("x", -width / 2)
      .attr("y", radius + 30)
      .attr("width", width)
      .attr("height", 50)
      .append("xhtml:div")
      .style("display", "flex")
      .style("justify-content", "center")
      .style("align-items", "center")
      .style("transform", "scale(0.8)") // Scale down the dropdown menu
      .style("transform-origin", "top center") // Ensure it scales down from the center
      .html(`
        <span style="margin-right: 8px;">Category:</span>
        <select id="taxonomy-select" style="padding: 4px; border: 1px solid #ccc; border-radius: 4px; background-color: #fff; font-size: 14px; width: 150px;">
          ${taxonomies.map(taxonomy => `<option value="${taxonomy}">${taxonomy}</option>`).join('')}
        </select>
      `);

    d3.select("#taxonomy-select").on("change", function () {
      setSelectedTaxonomy(this.value);
    });

    d3.select("#taxonomy-select").property("value", selectedTaxonomy);
  };

  useEffect(() => {
    drawChart();
    window.addEventListener("resize", drawChart);

    return () => {
      window.removeEventListener("resize", drawChart);
    };
  }, [selectedTaxonomy]);

  const taxonomies = [...new Set(data.map((item) => item.taxonomy))].sort(
    (a, b) => {
      if (a === "All") return 1;
      if (b === "All") return -1;
      const numA = parseInt(a.slice(1), 10);
      const numB = parseInt(b.slice(1), 10);
      if (isNaN(numA) || isNaN(numB)) {
        return a.localeCompare(b);
      }
      return numA - numB;
    }
  );

  return (
    <div className="pie-chart" style={{ textAlign: "center" }}>
      <svg ref={svgRef} style={{ width: "20%", height: "auto", display: "block", margin: "0 auto" }} />
    </div>
  );
};

export default CategoryCountingPie;
