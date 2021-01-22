import React, { useState } from 'react'
import "../assets/styling/_blogarticle.scss"
import { Link } from 'react-router-dom'
export default function BlogArticle() {

    return (
        <React.Fragment>
            <div class="header">
                <h2> How to commit assault and get away with it. With our exclusive guest ASAP Rocky.</h2>
                <h4 class="subHeader"> January 6th, 2021. Written by Eric Hasegawa</h4>
            </div>
                <img class="articleImageHeader"
                    src="https://media2.s-nbcnews.com/i/newscms/2019_28/2928001/190710-asap-rocky-cs-1155a_b81df229242a83edfb5737d24882bcb9.jpg"
                ></img>

                <p class="articleText">I'm baby kinfolk ennui cloud bread leggings before they sold out, yr poutine etsy tofu dreamcatcher 
                    normcore letterpress. Drinking vinegar direct 
                    trade art party glossier pork belly quinoa photo booth retro ennui 8-bit raw denim keffiyeh. 
                    Organic enamel pin intelligentsia vinyl, tilde cornhole 
                    edison bulb bitters woke banjo. Ugh forage small batch, godard tote bag mumblecore salvia af ramps fanny pack 
                    franzen. Kickstarter 
                    farm-to-table narwhal, banh mi meditation aesthetic leggings YOLO. Sartorial shabby chic kinfolk umami franzen. </p>

                <p class="articleTextInner">I'm baby kinfolk ennui cloud bread leggings before they sold out, yr poutine etsy tofu dreamcatcher 
                    normcore letterpress. Drinking vinegar direct 
                    trade art party glossier pork belly quinoa photo booth retro ennui 8-bit raw denim keffiyeh. 
                    Organic enamel pin intelligentsia vinyl, tilde cornhole 
                    edison bulb bitters woke banjo. Ugh forage small batch, godard tote bag mumblecore salvia af ramps fanny pack 
                    franzen. Kickstarter 
                    farm-to-table narwhal, banh mi meditation aesthetic leggings YOLO. Sartorial shabby chic kinfolk umami franzen. </p>

            <div class="articleFooter">
                <h3 class="similarArticles"> Similar articles</h3>
                <div class="articleCarousel">
                    <div className="_articleContainerLeft">
                        <img  class="_articleImage" 
                        src="https://crazyfrog.tv/assets/img/HEADER_CRAZY-FROG.jpg"
                        ></img>
                        <p class="_articleHeader"> Why crazy frog was important.</p>
                        <p class="_articleSubHeader">Looking at his legacy 10 years later.</p>
                    </div>
                    <div className="_articleContainer">
                        <img  class="_articleImage" 
                        src="https://crazyfrog.tv/assets/img/HEADER_CRAZY-FROG.jpg"
                        ></img>
                        <p class="_articleHeader"> Why crazy frog was important.</p>
                        <p class="_articleSubHeader">Looking at his legacy 10 years later.</p>
                    </div>
                    <div className="_articleContainer">
                        <img  class="_articleImage" 
                        src="https://crazyfrog.tv/assets/img/HEADER_CRAZY-FROG.jpg"
                        ></img>
                        <p class="_articleHeader"> Why crazy frog was important.</p>
                        <p class="_articleSubHeader">Looking at his legacy 10 years later.</p>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}