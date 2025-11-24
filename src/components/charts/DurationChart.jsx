import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

/*
--Chart 4 — Movie Duration Distribution (Histogram)


--Question it answers: What is the typical runtime of movies on Netflix?


--Filter:
filters.type === "Movie"
Use only movies
Plot histogram of durationMinutes
x-axis = runtime in minutes

filters.type === "TV Show"
Use only tv shows
Plot histogram of seasons
x-axis = number of seasons

filters.type === "All"
DEFAULT TO MOVIES (important!), make sure to let viewer know this is movie by default with small note
Reason: durationMinutes and seasonCounts are incompatible.
So show the movie duration histogram.


--Notes:
Values are found in:
    movie: d.durationMinutes
    tv show: d.seasons
Filter out null values before plotting


--What it shows: histogram of movie durations in minutes, only movies are included, shows clusters like many movies around 90 minutes or some long films over 2 hours


--Data used: durationMinutes, filter: type === "Movie"


--Things we can learn from this chart:
Netflix movies follow a strong 90-minute pattern
There’s a long tail of long movies > 120 mins
*/

const DurationChart = ({ data, filters }) => { //chart recieves the data and filters
    const svgRef = useRef(); //bridging React and D3

    useEffect(() => {
        if (!data || data.length === 0) return; //preventing early load of chart if data is not found yet

        const svg = d3.select(svgRef.current); //selecting SVG element
        svg.selectAll("*").remove(); //clearing the SVG before a redraw

        //chart drawing logic goes here

    }, [data, filters]);

    return <svg ref={svgRef} width={500} height={300}></svg>; //rendering the chart
};

export default DurationChart;