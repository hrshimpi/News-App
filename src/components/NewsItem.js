// import PropTypes from 'prop-types'
import React, { Component } from 'react'

export class NewsItem extends Component {
//   static propTypes = {}

  render() {
    
    let {title, description, imageUrl,newsUrl,author,date} = this.props;

    return (
      <div>
        <div div className="card m-2">
            <img src={imageUrl} className="card-img-top" alt=""/>
            <div className="card-body">
                <h5 className="card-title">{title}...</h5>
                <p className="card-text"><small className="text-muted">By {author} on {new Date(date).toGMTString()}</small></p>
                <p className="card-text">{description}
                <a href={newsUrl} style={{textDecoration:"none", paddingLeft:"5px"}}>Read more...</a>
                </p>
            </div>
        </div>
      </div>
    )
  }
}

export default NewsItem