import React, { useState } from 'react'
import "../assets/styling/_blogarticles.scss"
export default function UpcomingDrops() {

    return (
        <React.Fragment>
            <div class = "horizontalLine"></div>
            <h1 className = "upcomingHeader"> Upcoming Drops</h1>
            <div class="drop">

                <div class="raffleDesc">
                    <h2 class="raffleHeader"> DROP: Adidas Ultra Boost DNA</h2> 
                    <p class="raffleText">Though Nike has all but revealed their festive plans for Chinese New Year, adidas seems to 
                    be savoring the surprise, slowly offering up glimpses of commemorative releases. As seen by way of their recently 
                    unveiled “Made In China” pack, the brand has opted for a celebration less overt, an approach that is extending even
                     unto this duo of Ultra Boost DNAs. Find more 
                     information <a href="https://sneakernews.com/2020/12/28/adidas-ultra-boost-dna-cny-gz8989-gz7603-release-date/">here</a>. </p>
                </div>
                <img class="raffleImage"
                    src="https://image.goat.com/crop/750/attachments/product_template_pictures/images/031/435/746/original/FW4899.png.png"
                ></img>
            </div>
            <div class="drop">
                <div class="raffleDesc">
                    <h2 class="raffleHeader"> DROP: Nike Air Max Zephyr "Spring Festival"</h2> 
                    <p class="raffleText"> To go along with the Blazer Mid, Nike is inviting the Air Max Zephyr to celebrate 
                    the upcoming Spring Festival. But, in comparison, the high profile runner is far more subdued, 
                    only dressed up with patterns rather than a transforming tearaway upper.
                    Find more information <a href="https://sneakernews.com/2021/01/02/nike-air-max-zephyr-spring-festival-DD8486-096/">here</a>. </p>
                </div>
                <img class="raffleImage"
                    src="https://sneakerbardetroit.com/wp-content/uploads/2021/01/Nike-Air-Max-Zephyr-Spring-Festival-DD8486-096-Release-Date-4-1068x720.jpg"
                ></img>
            </div>
        </React.Fragment>
    )
}