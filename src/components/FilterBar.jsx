import React, { Component } from "react";
import FilterCategory from "./FilterCategory";

class FilterBar extends Component {
  render() {
    return (
      <div style={{ flexDirection: "row", marginLeft: "10%" }}>
        <FilterCategory
          handleSelect={this.props.handleSelect}
          categoryName="Search by"
          filterValues={["Title", "Author", "Date"]}
        />
        <FilterCategory
          handleSelect={this.props.handleSelect}
          categoryName="Sort by"
          filterValues={["Popularity", "Comments"]}
        />
        <FilterCategory
          handleSelect={this.props.handleSelect}
          categoryName="news of"
          filterValues={["All time", "last 24Hrs", "last week", "last month"]}
        />
      </div>
    );
  }
}

export default FilterBar;
