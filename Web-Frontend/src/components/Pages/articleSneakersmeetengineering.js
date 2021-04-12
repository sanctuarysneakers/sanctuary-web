import React from 'react'
import author from '../../assets/images/JonahHarding.jpg'
import pictureOne from '../../assets/images/articleEngineering1.jpg'
import pictureTwo from '../../assets/images/articleEngineering2.jpg'
import ReadNext from '../readnext.js'

export default function ArticleSneakersMeetEngineering() {
    return (
        <div>
            <div className='article'>
                <div className='article-wrapper'>
                    <div className='article-header'>
                        <div className='article-header-gradient'>
                            <div className='article-header-content'>
                                <h1> How Adidas and Carbon3D are Revolutionizing Sneaker Production </h1>
                                <div className='article-author'>
                                        <img src={author} />
                                        <div className='author-date'>
                                            <h5>
                                                Jonah Harding
                                            </h5>
                                            <h6>
                                                March 28, 2021
                                            </h6>
                                        </div>
                                    </div>
                            </div>
                        </div>
                    </div>

                    <div className='article-content'>

                    <p> 
                    In light of the Adidas Futurecraft 4D being re-released in January, we figured we’d take a step back to
                     appreciate what this means for innovation in the sneaker industry. The Futurecraft is a result of a 
                     joint-venture between Adidas and Carbon, a tech startup focused on 3D printing using digital light synthesis
                      technologies.

                    </p>
                    <div className='article-image'>
                            <img src={pictureOne} alt='Adidas Futurecraft 4D' />
                            <h4 className='image-source'>
                                Image via Adidas 
                            </h4>
                        </div>

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

                    <div className='article-image'>
                            <img src={pictureTwo} alt='Engineered midsole' />
                            <h4 className='image-source'>
                                Image via Carbon 
                            </h4>
                    </div>

                    <p> We should all be excited about this partnership. At the end of the day, it means more shoes, new styles,
                         and increased innovation.

                    </p>

                    </div>
                </div>
            </div>
            <ReadNext />
        </div>
    )

}

