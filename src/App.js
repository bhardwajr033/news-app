import React, { Component } from "react";

import SearchBar from "./components/SearchBar";
import FilterBar from "./components/FilterBar";
import NewsSection from "./components/NewsSection";

class App extends Component {
  state = {
    newsArticles: [],
    fetchedArticles: [],
    searchType: "Title",
    isContentLoaded :false,
  };

  async getNewsIDs() {
    const url = `https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty`;

    const response = await fetch(url);
    if (response.status !== 200) {
      return;
    }
    const data = await response.json();

    const articles = [];

    let index = 0;
    const numnerOfAtriclesToFetch = 100;
    let noOfFetchedArticles = 0;

    for (index = 0; index < numnerOfAtriclesToFetch; index++) {
      // eslint-disable-next-line
      this.getNewsFromIDs(data[index]).then((newsData) => {
        articles.push(newsData);
        noOfFetchedArticles += 1;
        if (noOfFetchedArticles === numnerOfAtriclesToFetch) {
          const sortedarticles = sortByScore(articles);

          this.setState({ newsArticles: sortedarticles });
          this.setState({ fetchedArticles: sortedarticles });
          this.setState({isContentLoaded : true});
        }
      });
    }

    function sortByScore(array) {
      return array.sort((news1, news2) => news2["score"] - news1["score"]);
    }
  }

  async getNewsFromIDs(id) {
    const url = `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`;

    const response = await fetch(url);
    if (response.status !== 200) {
      return {};
    }
    const data = await response.json();

    data.newsdate = data.time
      ? new Date(data.time * 1000).toDateString()
      : null;
    data.comments = data.kids ? data.kids.length : 0;
    data.score = data.score ? data.score : 0;
    data.date = data.time ? new Date(data.time * 1000) : new Date(0);
    // data.highlightedText = null;

    return data;
  }

  handleSearch = (event) => {
    const searchedValue = event.target.value.trim();
    const articles = this.state.fetchedArticles;

    // if (!searchedValue || searchedValue === "") {
    //   this.setState({ newsArticles: articles });
    //   return;
    // }

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
      case "news of":
        this.selectNewsbyTime(event.target.value);
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
      case "Date":
        sortKey = "date";
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

  selectNewsbyTime(timeType) {
    const articles = this.state.fetchedArticles;

    switch (timeType) {
      case "all":
        this.setState({ newsArticles: articles });
        break;
      case "last 24 hrs":
        const now = new Date();
        const selectedArticles = articles.filter(
          (article) =>
            Math.ceil((now - article.date) / (1000 * 60 * 60 * 24)) === 1
        );
        this.setState({ newsArticles: selectedArticles });
        break;
      case "last week":
        const now2 = new Date();
        const selectedArticles2 = articles.filter(
          (article) =>
            Math.ceil((now2 - article.date) / (1000 * 60 * 60 * 24)) < 7
        );
        this.setState({ newsArticles: selectedArticles2 });
        break;
      case "last month":
        const now3 = new Date();
        const selectedArticles3 = articles.filter(
          (article) =>
            Math.ceil((now3 - article.date) / (1000 * 60 * 60 * 24)) < 30
        );
        this.setState({ newsArticles: selectedArticles3 });
        break;
      default:
    }
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
        <NewsSection newsArticles={this.state.newsArticles} isContentLoaded={this.state.isContentLoaded}/>
      </section>
    );
  }
}

export default App;
