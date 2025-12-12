import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

/*
--Chart 3 — Country Distribution (Horizontal Bar Chart)


--Question it answers: Which countries produce the most Netflix content?


--Filter:
filters.type === "Movie", Count only countries for movies

filters.type === "TV Show", Count only countries for TV shows

filters.type === "All", Count countries for all titles


--Notes:
cleanedData.countries[] is already an array
A single title may list multiple countries → count all of them
Country may be "Unknown", include or ignore depending on design choice


--What it shows: Top 10 countries by content count, Horizontal bars (better for labels), Optional filter by type


--Data used: cleaned countries[] array, if multiple countries are listed they are handled by cleanData already


--Things we can learn from this chart:
The United States leads by a huge margin
Countries like India and UK produce surprisingly large amounts
*/

const CountryChart = ({ data, filters }) => {
  //chart recieves the data and filters
  const svgRef = useRef(); //bridging React and D3

  useEffect(() => {
    if (!data || data.length === 0) return; //preventing early load of chart if data is not found yet

    const svg = d3.select(svgRef.current); //selecting SVG element
    svg.selectAll("*").remove(); //clearing the SVG before a redraw

    // Chart drawing logic: top-10 countries vertical bar chart
    const containerWidth = svgRef.current.parentElement.clientWidth;
    const svgWidth = containerWidth;
    const svgHeight = 400;
    const margin = { top: 30, right: 30, bottom: 80, left: 60 };
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

    // Count countries (each title may contribute multiple countries)
    const counts = new Map();
    filtered.forEach((d) => {
      const countries = d.countries || [];
      countries.forEach((country) => {
        if (!country) return;
        counts.set(country, (counts.get(country) || 0) + 1);
      });
    });

    const dataArr = Array.from(counts.entries()).map(([country, count]) => ({
      country,
      count,
    }));
    dataArr.sort((a, b) => b.count - a.count);
    const topN = 10;
    const top = dataArr.slice(0, topN);

    if (top.length === 0) {
      g.append("text")
        .attr("x", width / 2)
        .attr("y", height / 2)
        .attr("text-anchor", "middle")
        .text("No data to display");
      return;
    }

    const x = d3
      .scaleBand()
      .range([0, width])
      .padding(0.1)
      .domain(top.map((d) => d.country));
    const y = d3
      .scaleLinear()
      .range([height, 0])
      .domain([0, d3.max(top, (d) => d.count)])
      .nice();

    // X axis
    g.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .style("font-size", "10px")
      .attr("transform", "rotate(-45)")
      .attr("text-anchor", "end")
      .attr("dx", "-0.5em")
      .attr("dy", "0.5em");

    // X axis label
    g.append("text")
      .attr("x", width / 2)
      .attr("y", height + 60)
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .style("font-weight", "bold")
      .text("Country");

    // Y axis
    g.append("g")
      .call(d3.axisLeft(y).ticks(5))
      .selectAll("text")
      .style("font-size", "10px");

    // Y axis label
    g.append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -height / 2)
      .attr("y", -45)
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .style("font-weight", "bold")
      .style("letter-spacing", "0.7px")
      .text("Number of Titles");

    // Bars
    const bar = g
      .selectAll(".bar")
      .data(top)
      .enter()
      .append("g")
      .attr("class", "bar");

    bar
      .append("rect")
      .attr("x", (d) => x(d.country))
      .attr("width", x.bandwidth())
      .attr("y", height)
      .attr("height", 0)
      .attr("fill", "#4CAF50")
      .transition()
      .duration(600)
      .attr("y", (d) => y(d.count))
      .attr("height", (d) => height - y(d.count));

    // Labels (count) at top of bar
    bar
      .append("text")
      .attr("x", (d) => x(d.country) + x.bandwidth() / 2)
      .attr("y", (d) => y(d.count) - 5)
      .attr("text-anchor", "middle")
      .text((d) => d.count)
      .style("font-size", "11px");

    // Simple tooltip via title
    bar
      .selectAll("rect")
      .append("title")
      .text((d) => `${d.country}: ${d.count} titles`);
  }, [data, filters]);

  return (
    <div className="chart-container">
      <h3 className="chart-title">Chart 3: Country Distribution</h3>
      <svg ref={svgRef} width="100%" height={400}></svg>
    </div>
  );
};

export default CountryChart;
