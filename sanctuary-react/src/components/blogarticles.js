import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import "../assets/styling/_blogarticles.scss"


export default function BlogArticles() {

    return (
        <React.Fragment>
            <div className="container">
                <Link to={"/blogpost1"}>
                    <div className="articleContainerLeft">
                        <img  class="articleImage" 
                        src="https://media2.s-nbcnews.com/i/newscms/2019_28/2928001/190710-asap-rocky-cs-1155a_b81df229242a83edfb5737d24882bcb9.jpg"
                        ></img>
                        <h3 class="articleHeader"> How to commit assault and get away with it</h3>
                        <p class="articleSubHeader">With our exclusive guest ASAP Rocky</p>
                    </div>
                </Link>
                <div className="articleContainer">
                    <img  class="articleImage" 
                    src="https://media2.s-nbcnews.com/i/newscms/2019_28/2928001/190710-asap-rocky-cs-1155a_b81df229242a83edfb5737d24882bcb9.jpg"
                    ></img>
                    <h3 class="articleHeader"> How to commit assault and get away with it</h3>
                    <p class="articleSubHeader">With our exclusive guest ASAP Rocky</p>
                </div>

                <div className="articleContainer">
                    <img  class="articleImage" 
                    src="https://media2.s-nbcnews.com/i/newscms/2019_28/2928001/190710-asap-rocky-cs-1155a_b81df229242a83edfb5737d24882bcb9.jpg"
                    ></img>
                    <h3 class="articleHeader"> How to commit assault and get away with it</h3>
                    <p class="articleSubHeader">With our exclusive guest ASAP Rocky</p>
                </div>
            </div>

        </React.Fragment>
    )


}
