import React from 'react'
import { Link } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'
import TopSneakers from '../../assets/images/top-sneakers.jpg'
import SneakerBoxes from '../../assets/images/demystifying-sneakers.jpg'
import Adidas3D from '../../assets/images/adidas-3d.jpg'
import SanctuaryArticle from '../../assets/images/sanctuary-story.jpg'
import SanctuaryArticleMobile from '../../assets/images/sanctuary-story-mobile.jpg'

export default function LatestArticles() {

    const isDesktop = useMediaQuery({ query: '(min-width: 1100px)' })

    return (
        <div className='newsroom-latest-articles'>
            
            <div className='newsroom-latest-articles-title'>
                <p> Latest Articles </p>
            </div>

            <div className='newsroom-articles-wrapper'>

                <Link to="/article-introduction">
                    <div className='newsroom-featured-article'>
                        {!isDesktop && <img src={SanctuaryArticleMobile} alt='Featured Article' />}
                        {isDesktop && <img src={SanctuaryArticle} alt='Featured Article' />}
                        <div className='newsroom-featured-article-gradient'>
                            <div className='newsroom-featured-article-text'>
                                <p> January 31, 2021 </p>
                                <h1> Sanctuary: Our Story </h1>
                            </div>
                        </div>
                    </div>
                </Link>

                <div className='newsroom-article-container'>
      
                    <div className='newsroom-article'>
                        <Link to="/article-sneakersmeetengineering">
                            <div className='newsroom-article-header'>
                                <img src={Adidas3D} alt='Article 1' />
                            </div>
                            <div className='newsroom-article-text'>
                                <p> March 28, 2021 </p>
                                <h2> How Adidas and Carbon3D are revolutionizing sneaker production </h2>
                            </div>
                        </Link>
                    </div>

                    <div className='newsroom-article-middle'>
                        <Link to="/article-demystifying">
                            <div className='newsroom-article-header'>
                                <img src={SneakerBoxes} alt='Article 1' />
                            </div>
                            <div className='newsroom-article-text'>
                                <p> March 29, 2021 </p>
                                <h2> Demystifying The Sneaker Market </h2>
                            </div>
                        </Link>
                    </div>

                    <div className='newsroom-article'>
                        <Link to="/article-toppicks">
                        <div className='newsroom-article-header'>
                            <img src={TopSneakers} alt='Article 1' />
                        </div>
                        <div className='newsroom-article-text'>
                            <p> April 20th, 2021 </p>
                            <h2> Our Top Drops of 2020 </h2>
                        </div>
                        </Link>
                    </div>

                </div>

            </div>

        </div>
    )
}
