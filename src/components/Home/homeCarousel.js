import React from 'react'
import { useSelector } from 'react-redux'
import useAPICall from '../Hooks/useApiCall'
import HomeCarouselCard from './homeCarouselCard'

export default function Carousel({ type }) {

	useAPICall('trending')
	useAPICall('under200')
	useAPICall('under300')
	
	let data
	let title
	let trendingData = useSelector(state => state.trending)
    let under200 = useSelector(state => state.under200)
    let under300 = useSelector(state => state.under300)
    if (type === 'trending') {
		data = trendingData
		title = 'Trending'
	} else if (type === 'under200') {
		title = 'Under $200 USD'
		data = under200
	} else if (type === 'under300') {
		title = 'Under $300 USD'
		data = under300
	}

    const carouselCards = data.map((item) => (
        <HomeCarouselCard key={item.index} data={item} type={type} length={data.length} />
    ))
    
	return (
        <div className='home-carousel-container'>
            <h2> {title} </h2>
            <div className='home-carousel-cards'> 
                {carouselCards} 
            </div>
        </div>
	)
}
