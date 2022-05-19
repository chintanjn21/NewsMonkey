import React, { useEffect, useState } from "react";
import NewsItems from "./NewsItems";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export default function News(props) {
  News.propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
    pagesize: PropTypes.number,
  };

  News.defaultProps = {
    country: "in",
    category: "top",
    // category: 'general',
    pagesize: 6,
  };

  const [article, setArticle] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const updateNews = async () => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${process.env.API_KEY}&page=${page}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(70);
    setArticle(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    props.setProgress(100);
  };

  useEffect(() => {
    document.title = `${props.title} - NewsMonkey`;
    updateNews();
    // eslint-disable-next-line
  }, []);

  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${
      props.country
    }&category=${props.category}&apiKey=${process.env.API_KEY}&page=${
      page + 1
    }&pageSize=${props.pageSize}`;
    setPage(page + 1);
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticle(article.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
  };

  return (
    <InfiniteScroll
      dataLength={article.length}
      next={fetchMoreData}
      hasMore={article.length !== totalResults}
      loader={<Spinner />}
    >
      <div className="container my-3">
        <h1
          className="text-center"
          style={{ margin: "40px 0px", color: "#76512e" }}
        >
          NewsMonkey - Top Headlines
        </h1>
        <div className="row">
          {article.map((element) => {
            return (
              <div className="col-md-4 my-3" key={element.url}>
                <NewsItems
                  imgUrl={element.urlToImage}
                  title={element.title}
                  description={element.description}
                  newsurl={element.url}
                  author={element.author === null ? "Unknown" : element.author}
                  date={element.publishedAt}
                />
              </div>
            );
          })}
        </div>
      </div>
    </InfiniteScroll>
  );
}
