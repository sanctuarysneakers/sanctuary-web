/* eslint-disable no-return-assign */
import React from 'react'
import { Helmet } from 'react-helmet'
import FadeIn from 'react-fade-in'
import Footer from '../Other/footer'
import ArticleCard from './articleCard'
import { ArticleData } from './articleData'
import { ReactComponent as SanctuaryIconBlack } from '../../assets/images/sanctuaryIconBlack.svg'

export default function Newsroom () {
  const featuredImage = {
    backgroundImage: `url(${ArticleData[0].image})`
  }

  const articleCards = ArticleData.slice(1).map((article) =>
    <ArticleCard key={article.path} data={article} />
  )

  return (
    <div className='newsroom'>
      <Helmet>
        <title>Sanctuary: Newsroom</title>
      </Helmet>
      <div className='newsroom-content'>
        <div className='newsroom-header'>
          <FadeIn delay={200} transitionDuration={1000}>
            <div className='newsroom-header-logo'>
              <SanctuaryIconBlack />
              <h1> Newsroom </h1>
            </div>

            <p>
              Your source for the latest Sanctuary news, sneaker
              drops, and upcoming raffles.
            </p>
          </FadeIn>
        </div>

        <div className='newsroom-latest-articles'>
          <h2> Latest Articles </h2>

          <div className='newsroom-featured-article' onClick={() => document.location.href = `${ArticleData[0].path}`}>
            <div className='newsroom-featured-image' style={featuredImage} />

            <div className='newsroom-featured-gradient'>
              <div className='newsroom-featured-text'>
                <p> {ArticleData[0].date} </p>
                <h4> {ArticleData[0].title} </h4>
              </div>
            </div>
          </div>

          <div className='newsroom-all-articles'>
            {articleCards}
          </div>
        </div>
      </div>

      <Footer color={'blue'} />
    </div>
  )
}
