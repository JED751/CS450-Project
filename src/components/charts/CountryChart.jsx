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

    //chart drawing logic goes here
  }, [data, filters]);

  return (
    <div className="chart-container">
      <h3 className="chart-title">Chart 3: Country Distribution</h3>
      <svg ref={svgRef} width="100%" height={400}>
        <text x="50%" y="50%" textAnchor="middle" fill="#999" fontSize="16">
          Chart 3 - To be implemented
        </text>
      </svg>
    </div>
  );
};

export default CountryChart;
