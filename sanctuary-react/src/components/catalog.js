import React from "react"
import Sneaker from './sneaker'
import mock_data from '../assets/mock-data'


export default function Catalog(props) {

    let filteredSneakers = mock_data.filter(
        (sneaker) => {
            return sneaker.model.toLowerCase()
            .indexOf(props.search) !== -1
        }
    )

    return (
        <div className='catalog'>
                {filteredSneakers.map((sneaker, index) => {
                     return (
                     <Sneaker
                        key={sneaker.id}
                        brand={sneaker.brand}
                        size={sneaker.size}
                        price={sneaker.price}
                        url={sneaker.url}
                        model={sneaker.model}
                        source_site={sneaker.source_site}
                        img={sneaker.img}
                    />
                    )})}
            </div>
    )
}