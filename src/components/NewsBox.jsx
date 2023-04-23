import React, { Component } from "react";

class NewsBox extends Component {
  render() {
    const { newsData } = this.props;

    if (newsData.deleted || newsData.dead) {
      return;
    }

    let newsTitle = newsData.title;

    // const highlightedText = newsData.highlightedText;
    // if (highlightedText) {
    //   const index = newsTitle.indexOf(highlightedText);
    //   newsTitle = (
    //     <p>
    //       {newsTitle.slice(0, index)}
    //       <span>{highlightedText}</span>
    //       {newsTitle.slice(index + highlightedText.length, newsTitle.length)}
    //     </p>
    //   );
    // }

    return (
      <div className="news-box">
        <div className="first-line">
          <p className="news-title">{newsTitle}</p>
          <a href={newsData.url} className="news-url">
            {newsData.title.slice(0, 20)}...
          </a>
        </div>
        <div className="second-line">
          <p className="points">{newsData.score} {newsData.score > 1 ? "points" : "point"}</p>
          <p className="author">{newsData.by}</p>
          <p className="timePassed">{newsData.newsdate}</p>
          <p className="comments">
            {newsData.comments} {newsData.comments > 1 ? "comments" : "comment"}
          </p>
        </div>
      </div>
    );
  }
}

export default NewsBox;
