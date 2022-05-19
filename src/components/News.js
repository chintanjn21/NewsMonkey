import React, { useEffect, useState } from 'react';
import NewsItems from './NewsItems';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

export default function News(props) {
  News.propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
    pagesize: PropTypes.number
  }

  News.defaultProps = {
    country: 'in',
    category: 'top',
    // category: 'general',
    pagesize: 6
  }

  const [article, setArticle] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  // const updateNews = async ()=>{
  //   props.setProgress(0);
  //   // let url = `https://newsdata.io/api/1/news?country=${props.country}&category=${props.category}&apikey=pub_64224dbca4f15fc65fa7032f5fc50c561caf&page=${page}`;
  //   let url = `https://newsdata.io/api/1/news?country=${props.country}&category=${props.category}&apikey=pub_64224dbca4f15fc65fa7032f5fc50c561caf&page=${page}`;
  //   let data = await fetch(url);
  //   props.setProgress(30);
  //   let parsedData = await data.json(data);
  //   props.setProgress(70);
  //   setArticle(parsedData.results);
  //   setTotalResults(parsedData.totalResults);
  //   props.setProgress(100);
  // }

  // useEffect (()=>{
  //   document.title = `${props.title} - NewsMonkey`;
  //   updateNews();
  // },[]);

  // const fetchMoreData = async () => {
  //      props.setProgress(0);
  //     let url = `https://newsdata.io/api/1/news?country=${props.country}&category=${props.category}&apikey=pub_64224dbca4f15fc65fa7032f5fc50c561caf&page=${page+1}`;
  //     // let url = `https://newsdata.io/api/1/news?country=in&category=top&apikey=pub_64224dbca4f15fc65fa7032f5fc50c561caf&page=1`;
  //     setPage(page+1)
  //     let data = await fetch(url);
  //     props.setProgress(30);
  //     let parsedData = await data.json(data);
  //     props.setProgress(70);
  //     setArticle(article.concat(parsedData.results));
  //     setTotalResults(parsedData.totalResults);
  //     props.setProgress(100);
  //     updateNews();
  // };

  // return (
  //   <InfiniteScroll dataLength={article.length} next={fetchMoreData} hasMore={article.length !== totalResults} loader={<Spinner/>}>
  //       <div className='container my-3'>
  //         <h1 className='text-center' style={{margin: '40px 0px', color: '#76512e'}}>NewsMonkey - Top Headlines</h1>
  //           <div className='row'>
  //             {article.map((element)=>{  
  //               return <div className="col-md-4 my-3" key={element.link}>
  //               <NewsItems imgUrl ={element.image_url} title={element.title} description={element.description} newsurl={element.link} author={element.creator === null?'Unknown':element.creator} date={element.pubDate}/>
  //           </div>
  //           })}
  //         </div>
  //     </div>
  //   </InfiniteScroll>
  // )

  // const updateNews = async ()=>{
  //   props.setProgress(0);
  //   let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=b274b1997bb94125be05a386186b7182&page=${props.page}&pageSize=${props.pagesize}`;
  //   let data = await fetch(url);
  //   props.setProgress(30);
  //   let parsedData = await data.json(data);
  //   props.setProgress(70);
  //   setArticle(parsedData.articles);
  //   setTotalResults(parsedData.totalResults);
  //   props.setProgress(100);
  //   console.log(parsedData);
  // }

  // useEffect (()=>{
  //   document.title = `${props.title} - NewsMonkey`;
  //   updateNews();
  //   // eslint-disable-next-line
  // },[]);

  // const fetchMoreData = async () => {
  //   let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=237a4fdba90b45df901d52bb8f54d2bd&page=${props.page}&pageSize=${props.pagesize}`;
  //   setPage(page+1)
  //   let data = await fetch(url);
  //   props.setProgress(30);
  //   let parsedData = await data.json(data);
  //   props.setProgress(70);
  //   setArticle(article.concat(parsedData.articles));
  //   setTotalResults(parsedData.totalResults);
  //   props.setProgress(100);
  //   console.log(parsedData);
  //   console.log(page);
  // };

  const updateNews = async ()=> {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${process.env.REACT_APP_API_KEY}&page=${page}&pageSize=${props.pageSize}`; 
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json()
    props.setProgress(70);
    setArticle(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    props.setProgress(100);
}

useEffect (()=>{
  document.title = `${props.title} - NewsMonkey`;
  updateNews();
  // eslint-disable-next-line
},[]);


const fetchMoreData = async () => {   
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${process.env.REACT_APP_API_KEY}&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page+1) 
    let data = await fetch(url);
    let parsedData = await data.json()
    setArticle(article.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)
  };

  return (
    <InfiniteScroll dataLength={article.length} next={fetchMoreData} hasMore={article.length !== totalResults} loader={<Spinner/>}>
        <div className='container my-3'>
          <h1 className='text-center' style={{margin: '40px 0px', color: '#76512e'}}>NewsMonkey - Top Headlines</h1>
            <div className='row'>
              {article.map((element)=>{  
                return <div className="col-md-4 my-3" key={element.url}>
                <NewsItems imgUrl ={element.urlToImage} title={element.title} description={element.description} newsurl={element.url} author={element.author === null?'Unknown':element.author} date={element.publishedAt}/>
            </div>
            })}
          </div>
      </div>
    </InfiniteScroll>
  )
}
