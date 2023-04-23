import React, { Component } from "react";

class FilterCategory extends Component {
  render() {
    const { categoryName, filterValues } = this.props;

    const filterOptions = Array.from(
      { length: filterValues.length },
      (_, index) => {
        return <option key={index}>{filterValues[index]}</option>;
      }
    );

    const selectStyle = {
      padding: "0.5rem",
      background: "#F0F0F0",
      border: "none",
      marginLeft: "0.5rem",
      borderRadius: "10px",
    };

    return (
      <React.Fragment>
        <label style={{ marginLeft: "0.5rem" }}>{categoryName}</label>
        <select
          data-selecttype={categoryName}
          onChange={this.props.handleSelect}
          style={selectStyle}
        >
          {filterOptions}
        </select>
      </React.Fragment>
    );
  }
}

export default FilterCategory;
