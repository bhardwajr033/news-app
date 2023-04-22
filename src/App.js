import React, { Component } from "react";

import SearchBar from "./components/SearchBar";
import FilterBar from "./components/FilterBar";
import NewsSection from "./components/NewsSection";

class App extends Component {
  state = {
    newsArticles: {},
    fetchedArticles: {},
    previousSearchedValue: "",
  };

  async getNewsIDs() {
    const url = `https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty`;

    const response = await fetch(url);
    if (response.status !== 200) {
      return;
    }
    const data = await response.json();

    const articles = this.state.newsArticles;

    for (let index = 0; index < 5; index++) {
      const newsData = await this.getNewsFromIDs(data[index]);
      articles[newsData.id] = newsData;
    }

    this.setState({ newsArticles: articles });
    this.setState({ fetchedArticles: articles });
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
    const searchedValue = event.target.value.trim();
    const articles = Object.values(this.state.fetchedArticles);

    if (searchedValue === this.state.previousSearchedValue) {
      return;
    }

    this.setState({ previousSearchedValue: searchedValue });

    if (!searchedValue) {
      this.setState({ newsArticles: articles });
    }

    const searchedArticles = articles.reduce((acc, article) => {
      if (article.title.toLowerCase().includes(searchedValue.toLowerCase())) {
        article.highlightedText = searchedValue;
        acc[article.id] = article;
      }
      return acc;
    }, {});

    this.setState({ newsArticles: searchedArticles });
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
