import React from "react";
import CarouselCard from "./carouselCard"

export default function Carousel({ data, type }) {

    const carouselCards = (data === null || data === []) ? [] : (data.map((item, index) =>
        <CarouselCard key={index} data={item} type={type} index={index} length={data.length} />
    ))

    return (
        <div className='carousel'>
            <div className='carousel-content'>
                {carouselCards}
            </div>
        </div>
    )
}
