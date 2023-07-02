import React from 'react'
import PropTypes from 'prop-types'

export default function ArticleCard ({ data }) {
  const articleImage = {
    backgroundImage: `url(${data.image})`
  }

  return (
    <div className='article-card'
      onClick={() => { document.location.href = `${data.path}` }}
    >
      <div className='article-card-image' style={articleImage} />

      <div className='article-card-text'>
        <p> {data.date} </p>
        <h6> {data.title} </h6>
      </div>
    </div>
  )
}

ArticleCard.propTypes = {
  data: PropTypes.object
}
