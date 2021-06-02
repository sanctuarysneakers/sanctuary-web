import React from 'react'
import { Link } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'

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
                        {!isDesktop && <img src='https://lh3.googleusercontent.com/l_Odt2_TM0dwECOc0_VvHMovDjaW9EIQv3b2Jve2c6gDbUARgGPWFJoYBanMdvZNKMoAGA1uMxAPGjlFv9XE7cRqR_V_g933dpq7pVwBy7yODfBkMiiCqYtIoHGHB5CezpYBymxI=w2400' alt='Featured Article' />}
                        {isDesktop && <img src='https://lh3.googleusercontent.com/-L9JAZXUqyXM-Z0zySex_Y98_ioErwshGnIEY7GByA5GitLL_lELkf05ndGpY40N3dIVZ45-eOLu_keM_5q4dRvpurE-6hgxVEDyYdRjnJQYNCexbcYS3_7SBAgwIig2uRyYw_vg=w2400' alt='Featured Article' />}
                        <div className='newsroom-featured-article-text'>
                            <p> January 31, 2021 </p>
                            <h1> Sanctuary: Our Story </h1>
                        </div>
                    </div>
                </Link>

                <div className='newsroom-article-container'>
      
                    <div className='newsroom-article'>
                        <Link to="/article-sneakersmeetengineering">
                            <div className='newsroom-article-header'>
                                <img src='https://lh3.googleusercontent.com/Sv-WC8N7m7UanzGuALvNGMKAj7y6wUMVbTXY0MiUCFfH8oKnu0PfbAij--wHbxEy5NiUSR24NtfR7NQaD5ctycy7fJ7OFBT5pGbC2UNIdOIwAVt0R3AVObPCMlN_o4KFwFje4H6R=w2400' alt='Article 1' />
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
                                <img src='https://lh3.googleusercontent.com/nPV2FmjI1UfU3ZyzfOzqGXCYwqAs_5QsNRDKCK9LWpOqoA_I_zPzjzIREsEByWXBFbzJLjQSTtUM1HDJirO57Z1F7zk-ukXcRkdNKJeUQuUxIBiAlx-xqHAtE9NAvkpj5MqP_nXL=w2400' alt='Article 1' />
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
                            <img src='https://lh3.googleusercontent.com/avGvO0Bk7uMnfmchWMhmkJ43PDzSZis49Fvb9Z_R6LIk1N34xQicmnL8Cd3Ol6eC6263gI3KyAd3D8rnC4D2wl_AngAGppMgA2HjfsKeNR3c7lyEZOctD-NrPvOM2Jsp16jOhaKC=w2400' alt='Article 1' />
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