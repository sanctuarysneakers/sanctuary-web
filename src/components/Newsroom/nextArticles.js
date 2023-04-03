import React from 'react'
import ArticleCard from './articleCard'
import { ArticleData } from './articleData'

export default function NextArticles () {
  const currentPage = window.location.pathname

  function shuffle (array) {
    array.sort(() => Math.random() - 0.5)
  }

  const getArticles = () => {
    let numArticles = 0
    const recommended = []

    shuffle(ArticleData)

    for (const article in ArticleData) {
      // Edit value to change # of articles to display next
      if (numArticles >= 3) {
        break
      }

      if (currentPage !== ArticleData[article].path) {
        recommended.push(ArticleData[article])
        numArticles += 1
      }
    }

    return recommended
  }

  const articleCards = getArticles().map((article) =>
    <ArticleCard key={article.path} data={article} />
  )

  return (
    <div className='next-articles'>
      <div className='next-articles-content'>
        <h2> Latest Articles </h2>

        <div className='next-articles-cards'>
          {articleCards}
        </div>
      </div>
    </div>
  )
}
