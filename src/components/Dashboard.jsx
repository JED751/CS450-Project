import React from "react";
import YearChart from "./charts/YearChart";
import GenreChart from "./charts/GenreChart";
import CountryChart from "./charts/CountryChart";
import DurationChart from "./charts/DurationChart";
import Filters from "./controls/Filters";

//this is the main dashboard where our four charts will reside
const Dashboard = ({ data, filters, setFilters }) => {
    return (
        <div>
            <h1>Netflix Data</h1>

            <Filters filters={filters} setFilters={setFilters} />

            <div className="chart-grid">
                <YearChart data={data} filters={filters} />
                <GenreChart data={data} filters={filters} />
                <CountryChart data={data} filters={filters} />
                <DurationChart data={data} filters={filters} />
            </div>
        </div>
    );
};

export default Dashboard;