import React from "react";
import { useSelector } from 'react-redux'
import useAPICall from './Hooks/useApiCall'
import CarouselCard from "./carouselCard";

export default function Carousel({ type }) {

    useAPICall('trending')
    useAPICall('under200')
    useAPICall('under300')

    const trending = useSelector(state => state.trending)
    const under200 = useSelector(state => state.under200)
    const under300 = useSelector(state => state.under300)

    let data
    if (type === 'trending') {
        data = trending
    } else if (type === 'under200') {
        data = under200
    } else if (type === 'under300') {
        data = under300
    }

    const carouselCards = data.map((item, index) =>
        <CarouselCard key={index} data={item} index={index} type={type} length={data.length} />
    )

    return (
        <div className='carousel'>
            <div className='carousel-content'>
                {carouselCards}
            </div>
        </div>
    )
}
