import React from 'react'
import Fade from 'react-reveal/Fade'
import Slider from 'react-slick'
import { Link } from 'react-router-dom'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function HomeNewsroom() {

    const settings = {
        centerMode: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 3000,
        centerPadding: '210px',
        slidesToShow: 1,
        dots: true,
        pauseOnHover: false
    }

    return (
        <div className='home-newsroom'>
            <div className='home-newsroom-content'>
                
                <Fade bottom>
                    <div className='home-newsroom-text'>
                        <h1> Everything you need to know about sneakers is here. </h1>
                        <p>
                            Stay up to date with the latest Sanctuary news and original articles. 
                            It's the ultimate place for all sneakerheads alike; curated by our team.
                        </p>
                        <Link className='home-newsroom-read' to='/newsroom'>
                            Start reading
                        </Link>
                    </div>
                </Fade>

                <div className='home-newsroom-articles'>
                    <Slider {...settings}>
                        <div className='home-newsroom-article'>
                            <h2> first </h2>
                        </div>
                        <div className='home-newsroom-article'>
                            <h2> second </h2>
                        </div>
                        <div className='home-newsroom-article'>
                            <h2> third </h2>
                        </div>
                        <div className='home-newsroom-article'>
                            <h2> fourth </h2>
                        </div>
                    </Slider>
                </div>
            </div>
        </div>
    )





    // return (
    //     <div className='home-newsroom'>
    //         <div className='home-newsroom-wrapper'>
    //             <div className='home-newsroom-headline'>
    //                 <div className='home-newsroom-text'>
    //                     <h2>
    //                         Everything you need to know about sneakers is here.
    //                     </h2>
    //                     <p>
    //                         Stay up to date with the latest Sanctuary news and headlines
    //                         within the industry. It’s the ultimate place for all sneakerheads
    //                         alike; curated by our team.
    //                     </p>
    //                 </div>

    //                 <div className='home-newsroom-buttons'>
    //                     <div className='home-newsroom-read-now'>
    //                         <p>
    //                             Start reading now
    //                         </p>
    //                     </div>
    //                 </div>
    //             </div>

    //             <div className='home-newsroom-articles'>
    //                 <div className='home-newsroom-article1'></div>
    //                 <div className='home-newsroom-article2'></div>
    //                 <div className='home-newsroom-article3'></div>
    //             </div>
    //         </div>
    //     </div>
    // )
}