import React, { useState, useEffect } from "react";
import * as d3 from "d3";
import Dashboard from "./components/Dashboard";
import { cleanNetflixData } from "./utils/cleanData";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    type: "All",
  });

  useEffect(() => {
    //cleaning the data
    //d3.csv("/data/netflix_titles.csv").then((raw) => {
    d3.csv(process.env.PUBLIC_URL + "/data/netflix_titles.csv").then((raw) => { //changed for github deployment
      const cleaned = cleanNetflixData(raw);
      setData(cleaned);
    });
  }, []);

  return (
    <div className="App">
      <Dashboard data={data} filters={filters} setFilters={setFilters} />
    </div>
  );
}

export default App;
