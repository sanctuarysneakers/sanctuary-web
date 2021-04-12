import React from 'react'
import author from '../../assets/images/ColeVanHinte.jpg'
import pictureOne from '../../assets/images/articleEngineering1.jpg'
import pictureTwo from '../../assets/images/articleEngineering2.jpg'
import ReadNext from '../readnext.js'

export default function ArticleTop2020() {
    return (
        <div>
            <div className='article'>
                <div className='article-wrapper'>
                    <div className='article-header'>
                        <div className='article-header-gradient'>
                            <div className='article-header-content'>
                                <h1> Our Top Picks of 2020 </h1>
                                <div className='article-author'>
                                        <img src={author} />
                                        <div className='author-date'>
                                            <h5>
                                                Cole Van Hinte
                                            </h5>
                                            <h6>
                                                April 20th, 2021
                                            </h6>
                                        </div>
                                    </div>
                            </div>
                        </div>
                    </div>

                    <div className='article-content'>

                    <p> From major global events to the rise of a worldwide pandemic, it is safe to say that 2020 will not be
                         forgotten anytime soon. Although it was a very busy year, 2020 gave the sneaker community many exciting
                          releases, ranging from newly engineered designs to highly anticipated collaborations. As a year
                           to remember, here are some of Sanctuary’s favourite sneaker drops of 2020:
                    </p>
       

                    <p> <strong>Ben &amp; Jerry’s x Nike SB Dunk Low ‘Chunky Dunky’</strong> <br />
                    Although 2020 saw the release of many anticipated Dunk Low collaborations, 
                    Ben &amp; Jerry’s ‘Chunky Dunky’ has to take the crown. Releasing in May of 2020, the ‘Chunky Dunky’
                     took a unique twist on the sneaker world’s pop culture aesthetic. The colourful mashup presents an
                      array of outfit-matching opportunities, mashing a universally-known ice cream brand with one of Nike’s
                       most iconic silhouettes. Although some may say it’s bold, we think it’s brilliant.
                    </p>
                    <div className='article-image'>
                        <img src="https://cutt.ly/qc4ZIsx" alt="Ben and Jerry's x Nike SB Dunk Low 'Chunky Dunky'" />
                        <h4 className='image-source'>
                            Image via SneakerNews 
                        </h4>
                    </div> 

                    <p> <strong>Off-White x Air Jordan 4 ‘Sail’</strong> <br />
                    Perhaps unsurprising to some, Virgil Abloh delivered one of the most anticipated drops of 2020: 
                    the Off-White X Air Jordan 4. Releasing exclusively in Women’s sizing, the simplistic yet sharp design 
                    of the ‘Sail’ colourway caused a worldwide uproar in the sneaker community, and upon its July 25th release
                     day, it became clear that this model lived up to the hype. Reselling for thousands of dollars, I think 
                     everyone can agree that the Off-White Jordan 4 will be remembered as one of the best drops of 2020.
                    </p>
                    
                    <div className='article-image'>
                            <img src="https://cutt.ly/uc4Z25V" alt="Off-White x Air Jordan 4 ‘Sail’" />
                            <h4 className='image-source'>
                                Image via SoleCollector
                            </h4>
                    </div>

                    <p>
                    <strong>Joe Freshgoods x New Balance 992</strong>
                    Dropping amidst the NBA’s All-Star weekend, Joe Freshgoods’ take on the New Balance 992 brought an 
                    energetic perspective to a classic silhouette. This coveted collaboration started a new era for the 
                    New Balance 992, paving way for many more releases in various colourways. The sneaker’s red and pink 
                    designs were perfect for its Valentine’s day release, ensuring that in years to come, New Balance will 
                    not be underestimated.
                    </p>

                    <div className='article-image'>
                            <img src="https://cutt.ly/Ic4XrTb" alt='Joe Freshgoods x New Balance 992' />
                            <h4 className='image-source'>
                                Image via SneakerNews
                            </h4>
                    </div>

                    </div>
                </div>
            </div>
            <ReadNext />
        </div>
    )

}