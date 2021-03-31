import React from 'react'
import { Link } from 'react-router-dom'
import ArticleImage3 from '../assets/images/article-3-pic.svg'

export default function Footer() {

    const articles = {'/article-introduction' : ['Sanctuary: Our Story', 'January 31st, 2021','https://svgshare.com/i/VdL.svg'],
                      '/article-sneakersmeetengineering' : ['Sneakers, Meet Engineering', 'March 28, 2021', 'https://svgshare.com/i/VfQ.svg'],
                      '/article-demystifying' : ['Demystifying the Sneaker Market', 'March 29, 2021', 'https://svgshare.com/i/VdK.svg']
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
    console.log(nextArticles);
    console.log(nextArticles[0][1][2]);
    return (
        <React.Fragment>
        <div className='newsroom-latest-articles'> 
            <div className='newsroom-latest-articles-title'>
                <p>Read Next</p>
            </div>

            <div className='newsroom-articles-wrapper'>
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
                        <div className='newsroom-article-header'>
                            <img src={ArticleImage3} alt='Article 1' />
                        </div>
                        <div className='newsroom-article-text'>
                            <p> December 37, 2020 </p>
                            <h2> NIKE's top 10 best lifestyle sneakers </h2>
                        </div>
                    </div>


                </div>
            </div>
        </div>
        </React.Fragment>
    )
}