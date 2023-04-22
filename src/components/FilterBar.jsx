import React, { Component } from "react";
import FilterCategory from "./FilterCategory";

class FilterBar extends Component {
  render() {
    return (
      <div style={{ flexDirection: "row", marginLeft: "10%" }}>
        <FilterCategory
          categoryName="Search"
          filterValues={["All", "Stories", "Comments"]}
        />
        <FilterCategory
          categoryName="by"
          filterValues={["Popularity", "Date"]}
        />
        <FilterCategory
          categoryName="for"
          filterValues={["All time", "last 24H", "last week", "last month"]}
        />
      </div>
    );
  }
}

export default FilterBar;
