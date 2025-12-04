import React from "react";
import YearChart from "./charts/YearChart";
import GenreChart from "./charts/GenreChart";
import CountryChart from "./charts/CountryChart";
import DurationChart from "./charts/DurationChart";
import Filters from "./controls/Filters";

/*
================================================================================
DASHBOARD COMPONENT
================================================================================
Integrates all four charts with shared filtering

Chart Assignment:
- Chart 1 (YearChart): [Team Member Name]
- Chart 2 (GenreChart): [Your Name] ✓ IMPLEMENTED
- Chart 3 (CountryChart): [Team Member Name]
- Chart 4 (DurationChart): [Team Member Name]

Integration Notes:
- All charts receive same props: { data, filters }
- data: cleaned Netflix titles array from cleanData.js
- filters: object with { type: "All" | "Movie" | "TV Show" }
- Charts auto-update when filters change via React state
================================================================================
*/

const Dashboard = ({ data, filters, setFilters }) => {
  return (
    <div className="dashboard">
      <h1 className="dashboard-title">
        <span className="netflix-text">Netflix</span> Data Visualization
        Dashboard
        <span className="subtitle">Exploring Content Trends & Insights</span>
      </h1>

      <Filters filters={filters} setFilters={setFilters} />

      <div className="chart-grid">
        {/* Chart 1: Titles Added Per Year - [Assigned to: Team Member Name] */}
        <YearChart data={data} filters={filters} />

        {/* Chart 2: Genre Distribution - [Assigned to: Your Name] ✓ COMPLETE */}
        <GenreChart data={data} filters={filters} />

        {/* Chart 3: Country Distribution - [Assigned to: Team Member Name] */}
        <CountryChart data={data} filters={filters} />

        {/* Chart 4: Duration Distribution - [Assigned to: Team Member Name] */}
        <DurationChart data={data} filters={filters} />
      </div>
    </div>
  );
};

export default Dashboard;
