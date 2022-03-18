import React from "react";
import { useSelector } from 'react-redux'
import CarouselCard from "./carouselCard"

export default function Carousel({ type }) {

    const trending = useSelector(state => state.trending)
    const under200 = useSelector(state => state.under200)
    const under300 = useSelector(state => state.under300)
    
    const data = {
        'trending': trending,
        'under200': under200,
        'under300': under300
    }

    const carouselCards = data[type] == null ? [] : (data[type].map((item, index) =>
        <CarouselCard key={index} data={item} index={index} type={type} length={data.length} />
    ))

    return (
        <div className='carousel'>
            <div className='carousel-content'>
                {carouselCards}
            </div>
        </div>
    )
}
