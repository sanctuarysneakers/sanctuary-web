import React from 'react'
import { useDispatch } from 'react-redux'
import { hideHomeSearch } from '../../redux/actions'
import { useMediaQuery } from 'react-responsive'
import BlogArticles from '../blogarticles'
import UpcomingDrops from '../upcomingdrops'
import UpcomingEvents from '../upcomingevents'
import SanctuaryLogo from '../../assets/images/Sanctuary-white.png'
import NewsroomHeader from '../../assets/images/newsroom.png'
import NewsroomMobile from '../../assets/images/newsroomMobile.png'

export default function Newsroom() {

    const dispatch = useDispatch()
    const isDesktop = useMediaQuery({
        query: '(min-width: 930px)'
    })

    // Hide the search bar
    dispatch(hideHomeSearch())

    return (
        <div className='newsroom'>

            <div className='newsroom-header'>

                {isDesktop && <img src={NewsroomHeader} alt='Newsroom Header' />}
                {!isDesktop && <img src={NewsroomMobile} alt='Newsroom Header Mobile' />}
                <div className='gradient' />

                <div className='newsroom-header-content'>
                    <div className='newsroom-logo'>
                        <img src={SanctuaryLogo} />
                        <h1> Newsroom </h1>
                    </div>
                    <p> Your source for the latest Sanctuary news, sneaker drops, and upcoming raffles. </p>
                </div>

            </div>

            <BlogArticles />

            <UpcomingDrops />

            <UpcomingEvents />

        </div>
    )
}
