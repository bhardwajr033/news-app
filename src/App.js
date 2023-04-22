import React, { Component } from "react";

import SearchBar from "./components/SearchBar";
import FilterBar from "./components/FilterBar";
import NewsSection from "./components/NewsSection";

class App extends Component {
  state = {
    newsArticles: {},
  };

  async getNewsIDs() {
    const url = `https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty`;

    const response = await fetch(url);
    if (response.status !== 200) {
      return;
    }
    const data = await response.json();

    const articles = this.state.newsArticles;

    for (let index = 0; index < 20; index++) {
      const newsData = await this.getNewsFromIDs(data[index]);
      articles[newsData.id] = newsData;
    }

    this.setState({ newsArticles: articles });
  }

  async getNewsFromIDs(id) {
    const url = `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`;

    const response = await fetch(url);
    if (response.status !== 200) {
      return {};
    }
    const data = await response.json();

    return data;
  }

  handleSearch = (event) => {
    console.log(event.target.value);
  };

  componentDidMount() {
    this.getNewsIDs();
  }
  render() {
    const sectionStyle = {
      display: "flex",
      flexDirection: "column",
      gap: "0.5rem",
    };
    return (
      <section style={sectionStyle}>
        <SearchBar handleSearch={this.handleSearch} />
        <FilterBar />
        <NewsSection newsArticles={this.state.newsArticles} />
      </section>
    );
  }
}

export default App;
