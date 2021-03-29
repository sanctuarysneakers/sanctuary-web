import React from 'react'
import { Link } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'
import FeaturedArticleImage from '../assets/images/newsroomFeaturedPic.svg'
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

                <Link to="/blogpost1">
                    <div className='newsroom-featured-article'>
                        {!isDesktop && <img src={FeaturedArticleImage} alt='Featured Article' />}
                        {isDesktop && <img src={HuaracheDesktop} alt='Featured Article' />}
                        <div className='newsroom-featured-article-text'>
                            <p> January 30, 2021 </p>
                            <h1> The history of the NIKE Huarache </h1>
                        </div>
                    </div>
                </Link>

                <div className='newsroom-article-container'>

                    <div className='newsroom-article'>
                        <div className='newsroom-article-header'>
                            <img src={ArticleImage1} alt='Article 1' />
                        </div>
                        <div className='newsroom-article-text'>
                            <p> January 15, 2021 </p>
                            <h2> Iconic Silhouettes loved worldwide </h2>
                        </div>
                    </div>

                    <div className='newsroom-article-middle'>
                        <div className='newsroom-article-header'>
                            <img src={ArticleImage2} alt='Article 1' />
                        </div>
                        <div className='newsroom-article-text'>
                            <p> January 2, 2021 </p>
                            <h2> How Jordan Brand apparel is making a return soon </h2>
                        </div>
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
