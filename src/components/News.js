import PropTypes from 'prop-types'
import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import ImgN from '../imgN.png';
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
    static defaultProps ={
        country: "in",
        page: 6,
        category:"general"
    }
    
    static propTypes = {
        country: PropTypes.string,
        page:PropTypes.number,
        category:PropTypes.string
    }

    articles= []
    constructor(props){
        super(props);
        console.log("Construction is executing");
        this.state = {
            articles: this.articles,
            loading: true,
            page:1,
            totalResults:0
        }
    }


    async updateNews(){
        const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=4dec5fcafa2a49bbbbd2c79a5c3407ec&page=${this.state.page-1}&pagesSize=${this.props.pageSize}`;
        this.setState({
            loading:true
        })
        let data = await fetch(url);
        let parsedData = await data.json()
        console.log(parsedData);
        this.setState({
            articles:parsedData.articles,
            loading: false
        })
    }
    async componentDidMount(){
        this.updateNews()
    }

    handlePrevClick= async ()=>{
       
        this.setState({ page:this.state.page - 1 })
        this.updateNews()
        
    }

    handleNextClick= async ()=>{

        this.setState({ page:this.state.page + 1 })
        this.updateNews()
    }

    fetchMoreData = async ()=>{
        this.setState({page:this.state.page +1 })
        const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=4dec5fcafa2a49bbbbd2c79a5c3407ec&page=${this.state.page-1}&pagesSize=${this.props.pageSize}`;

        let data = await fetch(url);
        let parsedData = await data.json()
        console.log(parsedData);
        this.setState({
            articles:this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults,
        })
    }

  render() {

    console.log("Render")
    return (
      <div className="container my-3">
          <h2 className="text-center" style={{ margin:"40px 0px"}}>Daily News - Top Headlines on {this.props.category}</h2>
          {this.state.loading && <Spinner/>}
          <InfiniteScroll 
           dataLength={this.state.articles.length} 
           next={this.fetchMoreData}
           hasMore={this.state.articles.length !== this.state.totalResults} 
           loader={<Spinner/>}>

          <div className="row m-2">
              {this.state.articles.map((element)=>{
                console.log(element);
                return <div className="col-md-4 " key={element.url}>
                            <NewsItem title={element.title?element.title.slice(0,59):""} 
                            description={element.description?element.description.slice(0,150):""} 
                            imageUrl={!element.urlToImage?ImgN:element.urlToImage}
                            newsUrl={element.url} author={element.author?element.author:"Unkown"} date={element.publishedAt}/>
                        </div>
              })}
          </div>
          </InfiniteScroll>

          
          {/* <div class="container d-flex justify-content-between">
              <button type="button" disabled={this.state.page<=1} className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
              <button type="button" disabled={this.state.page+ 1> Math.ceil(this.state.totalResults/this.props.pageSize)} className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
          </div> */}
      </div>
    )
  }
}

export default News