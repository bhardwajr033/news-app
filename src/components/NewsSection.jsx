import React, { Component } from "react";

import "./NewsSection.css";

import NewsBox from "./NewsBox";

class NewsSection extends Component {
  render() {
    const { newsArticles } = this.props;

    if (!newsArticles) {
      return;
    }

    const news = Object.values(newsArticles);
    const newsBoxes = Array.from({ length: news.length }, (_, index) => {
      return <NewsBox key={index} newsData={news[index]} />;
    });

    return <section className="news-section">{newsBoxes}</section>;
  }
}

export default NewsSection;
