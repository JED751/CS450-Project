import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const DurationChart = ({ data, filters }) => {
  //chart recieves the data and filters
  const svgRef = useRef(); //bridging React and D3

  useEffect(() => {
    if (!data || data.length === 0) return; //preventing early load of chart if data is not found yet

    const svg = d3.select(svgRef.current); //selecting SVG element
    svg.selectAll("*").remove(); //clearing the SVG before a redraw

    // Get container width for responsive sizing
    const containerWidth = svgRef.current.parentElement.clientWidth;
    const svgWidth = containerWidth;
    const svgHeight = 400;
    const margin = { top: 30, right: 30, bottom: 50, left: 60 };
    const width = svgWidth - margin.left - margin.right;
    const height = svgHeight - margin.top - margin.bottom;

    const g = svg
      .attr("width", svgWidth)
      .attr("height", svgHeight)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Determine if showing TV shows (otherwise default to movies)
    const showTVShows = filters && filters.type === "TV Show";

    let values = [];
    let xLabel = "";
    let binCount = 20;

    if (showTVShows) {
      // TV Shows: histogram of seasons
      values = data
        .filter((d) => d.type === "TV Show" && d.seasons && d.seasons > 0)
        .map((d) => d.seasons);
      xLabel = "Number of Seasons";
      binCount = Math.min(15, d3.max(values) || 10);
    } else {
      // Movies (default): histogram of duration in minutes
      values = data
        .filter(
          (d) =>
            d.type === "Movie" && d.durationMinutes && d.durationMinutes > 0
        )
        .map((d) => d.durationMinutes);
      xLabel = "Duration (minutes)";
    }

    if (values.length === 0) {
      g.append("text")
        .attr("x", width / 2)
        .attr("y", height / 2)
        .attr("text-anchor", "middle")
        .text("No data to display");
      return;
    }

    // Create scales
    const xMin = d3.min(values);
    const xMax = d3.max(values);
    const x = d3.scaleLinear().domain([xMin, xMax]).nice().range([0, width]);

    // Create histogram bins
    const histogram = d3
      .histogram()
      .domain(x.domain())
      .thresholds(x.ticks(binCount));

    const bins = histogram(values);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(bins, (d) => d.length)])
      .nice()
      .range([height, 0]);

    // X axis
    g.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .style("font-size", "10px");

    // X axis label
    g.append("text")
      .attr("x", width / 2)
      .attr("y", height + 40)
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .text(xLabel);

    // Y axis
    g.append("g")
      .call(d3.axisLeft(y))
      .selectAll("text")
      .style("font-size", "10px");

    // Y axis label
    g.append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -height / 2)
      .attr("y", -45)
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .text("Number of Titles");

    // Draw bars with animation
    g.selectAll(".bar")
      .data(bins)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => x(d.x0) + 1)
      .attr("width", (d) => Math.max(0, x(d.x1) - x(d.x0) - 2))
      .attr("y", height)
      .attr("height", 0)
      .attr("fill", "#E50914")
      .transition()
      .duration(600)
      .attr("y", (d) => y(d.length))
      .attr("height", (d) => height - y(d.length));

    // Add tooltips
    g.selectAll(".bar")
      .data(bins)
      .append("title")
      .text((d) => `${d.x0}-${d.x1}: ${d.length} titles`);

    // Add note for "All" filter
    if (filters && filters.type === "All") {
      g.append("text")
        .attr("x", width)
        .attr("y", -10)
        .attr("text-anchor", "end")
        .style("font-size", "10px")
        .style("fill", "#666")
        .style("font-style", "italic")
        .text("*Showing movies (select TV Show for seasons)");
    }
  }, [data, filters]);

  return (
    <div className="chart-container">
      <h3 className="chart-title">Chart 4: Duration Distribution</h3>
      <svg ref={svgRef} width="100%" height={400}></svg>
    </div>
  );
};

export default DurationChart;
