import React from 'react'
import { Link } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'
import FeaturedArticleImage from '../assets/images/newsroomFeaturedPic.svg'
import Article1Header from '../assets/images/Article1-header.svg'
import HuaracheDesktop from '../assets/images/Huarache-desktop.png'
import ArticleImage1 from '../assets/images/article-1-pic.svg'
import ArticleImage2 from '../assets/images/article-2-pic.svg'
import ArticleImage3 from '../assets/images/article-3-pic.svg'

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
                        {!isDesktop && <img src='https://gist.githubusercontent.com/EricHasegawa/ba10870046f81a5a30915451d13d3675/raw/f6f42a2388f9a123ef03a48735560dfafc51c680/black-circle-logo.svg' alt='Featured Article' />}
                        {isDesktop && <img src='https://cutt.ly/9cZEaBc' alt='Featured Article' />}
                        <div className='newsroom-featured-article-text'>
                            <p> March 26, 2021 </p>
                            <h1> Sanctuary: Our Story </h1>
                        </div>
                    </div>
                </Link>

                <div className='newsroom-article-container'>
      
                    <div className='newsroom-article'>
                        <Link to="/article-sneakersmeetengineering">
                            <div className='newsroom-article-header'>
                                <img src='https://gist.githubusercontent.com/EricHasegawa/8f4737ed525a6ab22f1c667f87bf9cdd/raw/63018b0612411c967737ce446ff1267c0cc2e268/article-1-pic.svg' alt='Article 1' />
                            </div>
                            <div className='newsroom-article-text'>
                                <p> March 28, 2021 </p>
                                <h2> Sneakers Meet Engineering </h2>
                            </div>
                        </Link>
                    </div>

                    <div className='newsroom-article-middle'>
                        <Link to="/article-demystifying">
                            <div className='newsroom-article-header'>
                                <img src={ArticleImage2} alt='Article 1' />
                            </div>
                            <div className='newsroom-article-text'>
                                <p> March 28, 2021 </p>
                                <h2> Demystifying The Sneaker Market </h2>
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
    )
}



// import React, { useState } from 'react'
// import { useDispatch } from 'react-redux'
// import { Link } from 'react-router-dom'
// import "../assets/styling/_blogarticles.scss"


// export default function BlogArticles() {

//     return (
//         <React.Fragment>
//             <div className="container">
//                 <Link to={"/blogpost1"}>
//                     <div className="articleContainerLeft">
//                         <img  class="articleImage" 
//                         src="https://media2.s-nbcnews.com/i/newscms/2019_28/2928001/190710-asap-rocky-cs-1155a_b81df229242a83edfb5737d24882bcb9.jpg"
//                         ></img>
//                         <h3 class="articleHeader"> How to commit assault and get away with it</h3>
//                         <p class="articleSubHeader">With our exclusive guest ASAP Rocky</p>
//                     </div>
//                 </Link>
//                 <div className="articleContainer">
//                     <img  class="articleImage" 
//                     src="https://media2.s-nbcnews.com/i/newscms/2019_28/2928001/190710-asap-rocky-cs-1155a_b81df229242a83edfb5737d24882bcb9.jpg"
//                     ></img>
//                     <h3 class="articleHeader"> How to commit assault and get away with it</h3>
//                     <p class="articleSubHeader">With our exclusive guest ASAP Rocky</p>
//                 </div>

//                 <div className="articleContainer">
//                     <img  class="articleImage" 
//                     src="https://media2.s-nbcnews.com/i/newscms/2019_28/2928001/190710-asap-rocky-cs-1155a_b81df229242a83edfb5737d24882bcb9.jpg"
//                     ></img>
//                     <h3 class="articleHeader"> How to commit assault and get away with it</h3>
//                     <p class="articleSubHeader">With our exclusive guest ASAP Rocky</p>
//                 </div>
//             </div>

//         </React.Fragment>
//     )


// }
