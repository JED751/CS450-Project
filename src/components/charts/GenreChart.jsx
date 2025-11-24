import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

/*
--Chart 2 — Genre Distribution (Bar Chart)


--Question it answers: What genres are most common on Netflix?


--Filter:
filters.type === "Movie", Use only genres from movies

filters.type === "TV Show", Use only genres from TV shows

filters.type === "All", Use genres from both


--Notes: 
Each title can count for multiple genres
Use cleanedData.genres[] which is already an array


--What it shows: Top genres based on how many titles belong to them, Bars sorted from highest to lowest, Optional filter by type


--Data used: cleaned genres[] array, count frequency of each genre


--Things we can learn from this chart:
Drama and International content are big categories
Documentaries may spike compared to certain niche genres
*/

const GenreChart = ({ data, filters }) => { //chart recieves the data and filters
    const svgRef = useRef(); //bridging React and D3

    useEffect(() => {
        if (!data || data.length === 0) return; //preventing early load of chart if data is not found yet

        const svg = d3.select(svgRef.current); //selecting SVG element
        svg.selectAll("*").remove(); //clearing the SVG before a redraw

        //chart drawing logic goes here

    }, [data, filters]);

    return <svg ref={svgRef} width={500} height={300}></svg>; //rendering the chart
};

export default GenreChart;