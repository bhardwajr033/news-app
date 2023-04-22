import React, { Component } from "react";

class SearchBar extends Component {
  render() {
    const BarStyle = {
      width: "80%",
      background: "#F0F0F0",
      border: "none",
      padding: "1rem",
      marginTop: "1rem",
      marginLeft : "10%",
      borderRadius: "10px",
    };
    return (
      <input
        style={BarStyle}
        key="search-bar"
        placeholder={"search news"}
        //onKeyDown={this.props.handleSearch}
      />
    );
  }
}

export default SearchBar;