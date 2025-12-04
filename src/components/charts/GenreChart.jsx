import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const GenreChart = ({ data, filters }) => {
  //chart recieves the data and filters
  const svgRef = useRef(); //bridging React and D3

  useEffect(() => {
    if (!data || data.length === 0) return; //preventing early load of chart if data is not found yet

    const svg = d3.select(svgRef.current); //selecting SVG element
    svg.selectAll("*").remove(); //clearing the SVG before a redraw

    // Chart drawing logic: top-N genres horizontal bar chart
    const containerWidth = svgRef.current.parentElement.clientWidth;
    const svgWidth = containerWidth;
    const svgHeight = 400;
    const margin = { top: 20, right: 40, bottom: 30, left: 140 };
    const width = svgWidth - margin.left - margin.right;
    const height = svgHeight - margin.top - margin.bottom;

    const g = svg
      .attr("width", svgWidth)
      .attr("height", svgHeight)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Apply filter by type if provided
    const filtered = data.filter((d) => {
      if (!filters || !filters.type || filters.type === "All") return true;
      return d.type === filters.type;
    });

    // Count genres (each title may contribute multiple genres)
    const counts = new Map();
    filtered.forEach((d) => {
      const gs = d.genres || [];
      gs.forEach((gname) => {
        if (!gname) return;
        counts.set(gname, (counts.get(gname) || 0) + 1);
      });
    });

    const dataArr = Array.from(counts.entries()).map(([genre, count]) => ({
      genre,
      count,
    }));
    dataArr.sort((a, b) => b.count - a.count);
    const topN = 10;
    const top = dataArr.slice(0, topN);

    if (top.length === 0) {
      g.append("text").attr("x", 10).attr("y", 20).text("No data to display");
      return;
    }

    const y = d3
      .scaleBand()
      .range([0, height])
      .padding(0.1)
      .domain(top.map((d) => d.genre));
    const x = d3
      .scaleLinear()
      .range([0, width])
      .domain([0, d3.max(top, (d) => d.count)])
      .nice();

    // x axis
    g.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x).ticks(5))
      .selectAll("text")
      .style("font-size", "10px");

    // y axis
    g.append("g")
      .call(d3.axisLeft(y))
      .selectAll("text")
      .style("font-size", "11px");

    // bars
    const bar = g
      .selectAll(".bar")
      .data(top)
      .enter()
      .append("g")
      .attr("class", "bar");

    bar
      .append("rect")
      .attr("y", (d) => y(d.genre))
      .attr("height", y.bandwidth())
      .attr("x", 0)
      .attr("width", 0)
      .attr("fill", "steelblue")
      .transition()
      .duration(600)
      .attr("width", (d) => x(d.count));

    // labels (count) at end of bar
    bar
      .append("text")
      .attr("x", (d) => x(d.count) + 6)
      .attr("y", (d) => y(d.genre) + y.bandwidth() / 2)
      .attr("dy", "0.35em")
      .text((d) => d.count)
      .style("font-size", "11px");

    // simple tooltip via title
    bar
      .selectAll("rect")
      .append("title")
      .text((d) => `${d.genre}: ${d.count}`);
  }, [data, filters]);

  return (
    <div className="chart-container">
      <h3 className="chart-title">Chart 2: Genre Distribution</h3>
      <svg ref={svgRef} width="100%" height={400}></svg>
    </div>
  );
};

export default GenreChart;
