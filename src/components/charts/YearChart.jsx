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
  }, [data, filters]);

  return (
    <div className="chart-container">
      <h3 className="chart-title">Chart 1: Titles Added Per Year</h3>
      <svg ref={svgRef} width="100%" height={400}>
        <text x="50%" y="50%" textAnchor="middle" fill="#999" fontSize="16">
          Chart 1 - To be implemented
        </text>
      </svg>
    </div>
  );
};

export default YearChart;
