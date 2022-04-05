import React from 'react'
import { Helmet } from 'react-helmet';
import NextArticles from '../nextArticles'
import Footer from '../../Other/footer'
import ProfilePic from '../../../assets/images/JonahHarding.jpg'
import HeaderPic from '../../../assets/images/adidas-3d.jpg'
import pictureOne from '../../../assets/images/articleEngineering1.jpg'
import pictureTwo from '../../../assets/images/articleEngineering2.jpg'

export default function AdidasCarbon3D() {

    return (
        <div className='newsroom-article'>
            <Helmet>
                <title>Sanctuary: Newsroom</title>
            </Helmet>
            <div className='newsroom-article-content'>
                <div className='newsroom-article-header'>
                    <h1>
                        How Adidas and Carbon 3D are revolutionizing sneaker production
                    </h1>

                    <div className='newsroom-article-profile'>
                        <img src={ProfilePic} alt='author' />

                        <div className='newsroom-article-date'>
                            <h2> Jonah Harding </h2>
                            <p> April 6, 2021 </p>
                        </div>
                    </div>
                </div>

                <div className='newsroom-article-image'>
                    <img src={HeaderPic} alt='header' />
                    <p> Image via dezeen </p>
                </div>

                <div className='newsroom-article-text'>
                    <p>
                        In light of the Adidas Futurecraft 4D being re-released in January, we figured we’d take a step back to
                        appreciate what this means for innovation in the sneaker industry. The Futurecraft is a result of a
                        joint-venture between Adidas and Carbon, a tech startup focused on 3D printing using digital light synthesis
                        technologies.
                    </p>
                </div>

                <div className='newsroom-article-image'>
                    <img src={pictureOne} alt='article content' />
                    <p> Image via Adidas </p>
                </div>

                <div className='newsroom-article-text'>
                    <p> The actual production process, known as Digital Light Synthesis, involves shining a high-powered light
                        through a membrane into a drum of resin, in order to ‘print’ the midsole.
                    </p>

                    <p>
                        This partnership is part of a greater digitization of the manufacturing industry. The implementation of 3D
                        printed technologies in sneaker manufacturing will reduce bottlenecks in the production process and will
                        allow Adidas to become more creative in the conception of new sneakers. It’s also no surprise that the
                        technology behind sneaker design is becoming increasingly complex as more money is pumped into high-tech
                        research and development.

                    </p>
                </div>

                <div className='newsroom-article-image'>
                    <img src={pictureTwo} alt='article content' />
                    <p> Image via Carbon </p>
                </div>

                <div className='newsroom-article-text'>
                    <p>
                        We should all be excited about this partnership. At the end of the day, it means more shoes, new styles,
                        and increased innovation.
                    </p>
                </div>
            </div>
            
            <NextArticles />

            <Footer colour={'blue'} />
        </div>
    )
}