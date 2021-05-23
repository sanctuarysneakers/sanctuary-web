import React from 'react'
import { Link } from 'react-router-dom'
import ArticleImage3 from '../../assets/images/article-3-pic.svg'

export default function Footer() {

    const articles = {'/article-introduction' : ['Sanctuary: Our Story', 'January 31st, 2021', 'https://lh3.googleusercontent.com/l_Odt2_TM0dwECOc0_VvHMovDjaW9EIQv3b2Jve2c6gDbUARgGPWFJoYBanMdvZNKMoAGA1uMxAPGjlFv9XE7cRqR_V_g933dpq7pVwBy7yODfBkMiiCqYtIoHGHB5CezpYBymxI=w2400'],
                      '/article-sneakersmeetengineering' : ['Sneakers, Meet Engineering', 'March 28, 2021', 'https://lh3.googleusercontent.com/Sv-WC8N7m7UanzGuALvNGMKAj7y6wUMVbTXY0MiUCFfH8oKnu0PfbAij--wHbxEy5NiUSR24NtfR7NQaD5ctycy7fJ7OFBT5pGbC2UNIdOIwAVt0R3AVObPCMlN_o4KFwFje4H6R=w2400'],
                      '/article-demystifying' : ['Demystifying the Sneaker Market', 'March 29, 2021', 'https://lh3.googleusercontent.com/nPV2FmjI1UfU3ZyzfOzqGXCYwqAs_5QsNRDKCK9LWpOqoA_I_zPzjzIREsEByWXBFbzJLjQSTtUM1HDJirO57Z1F7zk-ukXcRkdNKJeUQuUxIBiAlx-xqHAtE9NAvkpj5MqP_nXL=w2400'],
                      '/article-toppicks' : ['Our Top Picks of 2020', 'April 20th 2021', 'https://lh3.googleusercontent.com/avGvO0Bk7uMnfmchWMhmkJ43PDzSZis49Fvb9Z_R6LIk1N34xQicmnL8Cd3Ol6eC6263gI3KyAd3D8rnC4D2wl_AngAGppMgA2HjfsKeNR3c7lyEZOctD-NrPvOM2Jsp16jOhaKC=w2400']
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