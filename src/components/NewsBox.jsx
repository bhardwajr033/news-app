import React, { Component } from "react";

class NewsBox extends Component {
  render() {
    const { newsData } = this.props;

    if (newsData.deleted || newsData.dead) {
      return;
    }

    const newsdate = new Date(newsData.time).toDateString();

    return (
      <div className="news-box">
        <div className="first-line">
          <p className="news-title">{newsData.title}</p>
          <a href="{newsData.url}" className="news-url">
            {newsData.title.slice(0, 20)}...
          </a>
        </div>
        <div className="second-line">
          <p className="points">{newsData.score} points</p>
          <p className="author">{newsData.by}</p>
          <p className="timePassed">{newsdate}</p>
          <p className="comments">
            {newsData.kids ? newsData.kids.length : 0} comments
          </p>
        </div>
      </div>
    );
  }
}

export default NewsBox;
