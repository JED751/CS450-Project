import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

/*
--Chart 1 - Titles Added Per Year (Line Chart)


--Question it answers: How has Netflix’s catalogue grown over time?


--Filter:
filters.type === "Movie", Show only movies per year

filters.type === "TV Show", Show only TV shows per year

filters.type === "All", Show both movies and TV shows combined


--Notes:
x-axis = release_year
y-axis = count of titles
Count how many titles have each release_year after filtering


--What it shows: Number of titles added each year, Split by type (Movie vs TV Show) if needed, Shows growth trends in Netflix content


--Data used: release_year, type, filter


--Things we can learn from this chart:
Netflix added far more content in the 2015–2020 range
Movie vs TV growth patterns look different
Helps understand expansion strategy over time
*/

const YearChart = ({ data, filters }) => {
  //chart recieves the data and filters
  const svgRef = useRef(); //bridging React and D3

  useEffect(() => {
    if (!data || data.length === 0) return; //preventing early load of chart if data is not found yet

    const svg = d3.select(svgRef.current); //selecting SVG element
    svg.selectAll("*").remove(); //clearing the SVG before a redraw

    //chart drawing logic goes here
    //we can either filter by TV or Movie or All
    let filtered = data;
    if (filters.type !== "All") filtered = data.filter((d) => d.type === filters.type);

    //aggregating counts per year
    const yearMap = new Map();
    filtered.forEach((d) => {
      const year = Number(d.release_year);
      if (!Number.isFinite(year)) return;
      yearMap.set(year, (yearMap.get(year) || 0) + 1);
    });

    const yearData = Array.from(yearMap.entries())
      .map(([year, count]) => ({ year, count }))
      .sort((a, b) => a.year - b.year);

    if (yearData.length === 0) return;

    //dimensions for chart 1
    const containerWidth = svgRef.current.parentElement.clientWidth;
    const width = containerWidth;
    const height = 400;
    const margin = { top: 20, right: 20, bottom: 50, left: 50 };

    //scales
    const x = d3
      .scaleLinear()
      .domain(d3.extent(yearData, (d) => d.year))
      .range([margin.left, width - margin.right]);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(yearData, (d) => d.count)])
      .nice()
      .range([height - margin.bottom, margin.top]);

    //line generator
    const line = d3
      .line()
      .x((d) => x(d.year))
      .y((d) => y(d.count));

    //drawing the line
    const path = svg
      .append("path")
      .datum(yearData)
      .attr("fill", "none")
      .attr("stroke", "orange")
      .attr("stroke-width", 2)
      .attr("d", line);

    //line drawing animation
    const totalLength = path.node().getTotalLength();
    path
      .attr("stroke-dasharray", `${totalLength} ${totalLength}`)
      .attr("stroke-dashoffset", totalLength)
      .transition()
      .duration(800)
      .ease(d3.easeLinear)
      .attr("stroke-dashoffset", 0);

    //drawing the points
    svg
      .append("g")
      .selectAll("circle")
      .data(yearData)
      .enter()
      .append("circle")
      .attr("cx", (d) => x(d.year))
      .attr("cy", (d) => y(d.count))
      .attr("r", 3)
      .attr("fill", "orange")
      .append("title")
      .text((d) => `${d.year}: ${d.count} titles`);

    //x-axis
    const tickYears = yearData.map((d) => d.year);
    const step = Math.max(1, Math.ceil(tickYears.length / 10));

    //x-axis label
    svg.append("text")
      .attr("x", width / 2)
      .attr("y", height - 10)
      .attr("text-anchor", "middle")
      //.attr("fill", "#333")
      .style("font-weight", "bold")
      .style("font-size", "12px")
      .text("Release Year");

    svg
      .append("g")
      .attr("transform", `translate(0, ${height - margin.bottom})`)
      .call(
        d3
          .axisBottom(x)
          .tickValues(tickYears.filter((_, i) => i % step === 0))
          .tickFormat(d3.format("d"))
      )
      .selectAll("text")
      .attr("transform", "rotate(-45)")
      .style("text-anchor", "end");

    //y-axis
    svg
      .append("g")
      .attr("transform", `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(y));

    //y-axis label
    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -height / 2)
      .attr("y", 10)
      .attr("text-anchor", "middle")
      //.attr("fill", "#333")
      .style("font-weight", "bold")
      .style("font-size", "12px")
      .style("letter-spacing", "0.7px")
      .text("Number of Titles");
  }, [data, filters]);

  return (
    <div className="chart-container">
      <h3 className="chart-title">Chart 1: Titles Added Per Year</h3>
      <svg ref={svgRef} height={400} style={{ width: "100%" }}>
        <text x="50%" y="50%" textAnchor="middle" fill="#999" fontSize="16">
          Chart 1 - To be implemented
        </text>
      </svg>
    </div>
  );
};

export default YearChart;
