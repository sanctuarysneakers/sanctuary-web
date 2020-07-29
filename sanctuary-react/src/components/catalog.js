import React from "react"
import Sneaker from './sneaker'
import mock_data from '../assets/mock-data'


export default function Catalog(props) {

    function filteredSneakers() {
        let filteredSneakers = mock_data

        // Filter by model
        if (props.search) {
            filteredSneakers = filteredSneakers.filter(
                (sneaker) => {
                    return sneaker.model.toLowerCase()
                    .indexOf(props.search.toLowerCase()) !== -1
                }
            )
        }
        
        // Filter by size
        if (props.sizeFilter) {
            filteredSneakers = filteredSneakers.filter(
                (sneaker) => {
                    return sneaker.size === parseInt(props.sizeFilter)
                }
            )
        }

        // Filter by price
        if (props.priceFilter) {
            filteredSneakers = filteredSneakers.filter(
                (sneaker) => {
                    return sneaker.price <= parseInt(props.priceFilter)
                }
            )
        }

        // Filter by site
        if (props.siteFilter)
        filteredSneakers = filteredSneakers.filter(
            (sneaker) => {
                return sneaker.source_site.toLowerCase()
                .indexOf(props.siteFilter.toLowerCase()) !== -1
            }
        )

        return filteredSneakers
    }

    return (
        <div className='catalog'>
                {filteredSneakers().map((sneaker) => {
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