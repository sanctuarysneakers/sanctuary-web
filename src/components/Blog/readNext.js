import React from 'react'
import { Link } from 'react-router-dom'
import TopSneakers from '../../assets/images/top-sneakers.jpg'
import SneakerBoxes from '../../assets/images/demystifying-sneakers.jpg'
import Adidas3D from '../../assets/images/adidas-3d.jpg'
import SanctuaryArticle from '../../assets/images/sanctuary-story.jpg'

export default function Footer() {

    const articles = {'/article-introduction' : ['Sanctuary: Our Story', 'January 31st, 2021', SanctuaryArticle],
                      '/article-sneakersmeetengineering' : ['Sneakers, Meet Engineering', 'March 28, 2021', Adidas3D],
                      '/article-demystifying' : ['Demystifying the Sneaker Market', 'March 29, 2021', SneakerBoxes],
                      '/article-toppicks' : ['Our Top Picks of 2020', 'April 20th 2021', TopSneakers]
                    }
    const currPage = window.location.pathname;

    const getArticles = () => {
        var numArticles = 0;
        var recommended = [];
        for (let article in articles) {
            if (numArticles >= 3) {
                break;
            }
            if (article !== currPage) {
                recommended.push([article, articles[article]]);
                numArticles++;
            }
        }
        return recommended;
    }

    const nextArticles = getArticles(currPage);
    return (
        <React.Fragment>
        <div className='newsroom-read-next-articles'> 
            <div className='newsroom-latest-articles-title'>
                <p>Read Next</p>
            </div>

            <div className='newsroom-read-next-wrapper'>
                <div className='newsroom-article-container'>
                    <div className='newsroom-article'>
                        <Link to={nextArticles[0][0]}>
                            <div className='newsroom-article-header'>
                                <img src={nextArticles[0][1][2]} alt='TEST' />
                            </div>
                            <div className='newsroom-article-text'>
                                <p> {nextArticles[0][1][1]} </p>
                                <h2> {nextArticles[0][1][0]}</h2>
                            </div>
                        </Link>
                    </div>

                    <div className='newsroom-article-middle'>
                        <Link to={nextArticles[1][0]}>
                            <div className='newsroom-article-header'>
                                <img src={nextArticles[1][1][2]} alt='Article 1' />
                            </div>
                            <div className='newsroom-article-text'>
                                <p> {nextArticles[1][1][1]} </p>
                                <h2> {nextArticles[1][1][0]} </h2>
                            </div>
                        </Link>
                    </div>

                    <div className='newsroom-article'>
                        <Link to={nextArticles[2][0]}>
                        <div className='newsroom-article-header'>
                            <img src={nextArticles[2][1][2]} alt='Article 1' />
                        </div>
                        <div className='newsroom-article-text'>
                            <p> {nextArticles[2][1][1]} </p>
                            <h2> {nextArticles[2][1][0]} </h2>
                        </div>
                        </Link>
                    </div>


                </div>
            </div>
        </div>
        </React.Fragment>
    )
}