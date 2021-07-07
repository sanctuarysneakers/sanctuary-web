import React from 'react'
import Fade from 'react-reveal/Fade'
import { Link } from 'react-router-dom'

export default function HomeContact() {

    return (
        <div className='home-contact'>
            <div className='home-contact-content'>
                <Fade bottom>
                    <div className='home-contact-text'>
                        <h1> We love feedback! </h1>
                        <p> Is there something you think we could do better? </p>
                        <p className='home-contact-b-text'> Please feel free to contact us and we'll get back to you shortly! </p>
                        <Link className='home-contact-us'>
                            Contact us
                        </Link>
                    </div>
                </Fade>
            </div>
        </div>
    )








    // return (
    //     <div className='home-contact'>
    //         <div className='home-contact-headline'>
    //             <div className='home-contact-text'>
    //                 <h2>
    //                     We love feedback!
    //                 </h2>
    //                 <p>
    //                     Is there something you think we could do better?
    //                     Please feel free to contact us and we’ll get back to you shortly!
    //                 </p>
    //             </div>

    //             <div className='home-contact-buttons'>
    //                 <div className='home-contact-us'>
    //                     <p>
    //                         Contact us
    //                     </p>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    // )
}