import React, { Component } from "react";

import SearchBar from "./components/SearchBar";
import FilterBar from "./components/FilterBar";
import NewsSection from "./components/NewsSection";

class App extends Component {
  state = {
    newsArticles: [],
    fetchedArticles: [],
    previousSearchedValue: "",
    searchType: "Title",
  };

  async getNewsIDs() {
    const url = `https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty`;

    const response = await fetch(url);
    if (response.status !== 200) {
      return;
    }
    const data = await response.json();

    const articles = [];

    for (let index = 0; index < 5; index++) {
      const newsData = await this.getNewsFromIDs(data[index]);
      articles.push(newsData);
    }

    function sortByPosition(array) {
      return array.sort((news1, news2) => news2["score"] - news1["score"]);
    }

    const sortedarticles = sortByPosition(articles);

    this.setState({ newsArticles: sortedarticles });
    this.setState({ fetchedArticles: sortedarticles });
  }

  async getNewsFromIDs(id) {
    const url = `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`;

    const response = await fetch(url);
    if (response.status !== 200) {
      return {};
    }
    const data = await response.json();

    data.newsdate = data.time ? new Date(data.time).toDateString() : null;
    data.comments = data.kids ? data.kids.length : 0;

    return data;
  }

  handleSearch = (event) => {
    const searchedValue = event.target.value.trim();
    const articles = this.state.fetchedArticles;

    if (searchedValue === this.state.previousSearchedValue) {
      return;
    }

    this.setState({ previousSearchedValue: searchedValue });

    if (!searchedValue || searchedValue === "") {
      this.setState({ newsArticles: articles });
      return;
    }

    let searchingType = "title";

    const searchType = this.state.searchType;

    switch (searchType) {
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
      if (
        article[searchingType]
          .toLowerCase()
          .includes(searchedValue.toLowerCase())
      ) {
        // article.highlightedText = searchedValue;
        acc.push(article);
      }
      return acc;
    }, []);

    this.setState({ newsArticles: searchedArticles });
  };

  handleSelect = (event) => {
    const selectType = event.target.getAttribute("data-selecttype");
    switch (selectType) {
      case "Search by":
        this.setState({ searchType: event.target.value });
        break;
      case "Sort by":
        this.sortArticles(event.target.value);
        break;
      default:
    }
  };

  sortArticles(sortType) {
    const articles = this.state.newsArticles;

    let sortKey = "score";
    switch (sortType) {
      case "Popularity":
        sortKey = "score";
        break;
      case "Comments":
        sortKey = "comments";
        break;
      default:
        sortKey = "score";
    }

    function sortByPosition(array) {
      return array.sort((news1, news2) => news2[sortKey] - news1[sortKey]);
    }

    const sortedArticles = sortByPosition(articles);

    this.setState({ newsArticles: sortedArticles });
  }

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
