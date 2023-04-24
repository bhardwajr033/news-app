import React, { Component } from "react";

import "./NewsSection.css";

import NewsBox from "./NewsBox";

class NewsSection extends Component {
  render() {
    const { newsArticles } = this.props;

    if (newsArticles.length === 0) {
      return (
        <div className="content-loading">{this.props.isContentLoaded ? "No Search Found" : "Content loading ..."}</div>
      );
    }

    const news = newsArticles;
    const newsBoxes = Array.from({ length: news.length }, (_, index) => {
      return <NewsBox key={index} newsData={news[index]} />;
    });

    return <section className="news-section">{newsBoxes}</section>;
  }
}

export default NewsSection;
