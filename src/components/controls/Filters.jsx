import React from "react";

//these are the filters we will have on our dashboard to fufill the requirement to make the project "interactive"
const Filters = ({ filters, setFilters }) => {
    return (
        <div className="filters-panel">
            <label>Type:</label>
            <select
                value={filters.type}
                onChange={(e) => setFilters({ ...filters, type: e.target.value })}>
                <option value="All">All</option>
                <option value="Movie">Movie</option>
                <option value="TV Show">TV Show</option>
            </select>

            {/* More filters will be added later */}
        </div>
    );
};

export default Filters;