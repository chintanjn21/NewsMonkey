import React from 'react'

export default function NewsItems(props) {
  let {title, description, imgUrl, newsurl, author, date} = props;
  return (
    <div className="card">
      <img src={!imgUrl?"https://feeds.abplive.com/onecms/images/uploaded-images/2022/04/10/0f9001b5925f01c985feabaf1b1513be_original.jpg?impolicy=abp_cdn&imwidth=1200&imheight=628":imgUrl} className="card-img-top" alt="..."/>
      <div className="card-body">
          <h5 className="card-title" style={{color: 'brown'}}> {title} </h5>
          <p className="card-text" style={{color: 'darkolivegreen', fontWeight: '500'}}> {description} </p>
          <p className='card-text mb-0 text-muted' style={{fontWeight: '300'}}>Author: {author}</p>
          <p className='card-text text-muted' style={{fontWeight: '300'}}>Published At: {new Date(date).toLocaleString()}</p>
          <a href={newsurl} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark">Read More</a>
      </div>
    </div>
  )
}