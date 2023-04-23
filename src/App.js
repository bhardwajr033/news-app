import React, { Component } from "react";

import SearchBar from "./components/SearchBar";
import FilterBar from "./components/FilterBar";
import NewsSection from "./components/NewsSection";

class App extends Component {
  state = {
    newsArticles: {},
    fetchedArticles: {},
    previousSearchedValue: "",
    searchType : "Title"
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

    data.newsdate = data.time ? new Date(data.time).toDateString() : null;

    return data;
  }

  handleSearch = (event) => {
    const searchedValue = event.target.value.trim();
    const articles = Object.values(this.state.fetchedArticles);

    if (searchedValue === this.state.previousSearchedValue) {
      return;
    }

    this.setState({ previousSearchedValue: searchedValue });

    if (!searchedValue || searchedValue === "") {
      this.setState({ newsArticles: articles });
      return
    }

    let searchingType = "title";

    const searchType = this.state.searchType;

    switch(searchType){
      case "Title":
        searchingType = "title";
        break;
      case "Author":
        searchingType = "by";
        break;
      case "Date":
        searchingType = "newsdate";
        break;
      default:
        searchingType = "title";
    }


    const searchedArticles = articles.reduce((acc, article) => {
      if (article[searchingType].toLowerCase().includes(searchedValue.toLowerCase())) {
        // article.highlightedText = searchedValue;
        acc[article.id] = article;
      }
      return acc;
    }, {});

    this.setState({ newsArticles: searchedArticles });
  };

  handleSelect = (event) => {
    const selectType = event.target.getAttribute("data-selecttype");
    switch(selectType){
      case "Search by":
        this.setState({searchType : event.target.value});
        break;
    }
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
        <FilterBar handleSelect={this.handleSelect} />
        <NewsSection newsArticles={this.state.newsArticles} />
      </section>
    );
  }
}

export default App;
