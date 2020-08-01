import React, { useState, useEffect } from "react"
import Sneaker from './sneaker'

const API_URL = "http://flask-env.eba-wjhtntpd.us-west-2.elasticbeanstalk.com/?"


export default function Catalog(props) {
    const [data, setData] = useState([])

    useEffect(() => {
        const fetchData = async (url) => {
            const response = await fetch(url)
            const data = await response.json()
            setData(data)
        }

        fetchData(API_URL)
    }, [])


    // function filteredSneakers() {
        

    //     // Filter by model
    //     if (props.search) {
    //         filteredSneakers = filteredSneakers.filter(
    //             (sneaker) => {
    //                 return sneaker.model.toLowerCase()
    //                 .indexOf(props.search.toLowerCase()) !== -1
    //             }
    //         )
    //     }
        
    //     // Filter by size
    //     if (props.sizeFilter) {
    //         filteredSneakers = filteredSneakers.filter(
    //             (sneaker) => {
    //                 return sneaker.size === parseInt(props.sizeFilter)
    //             }
    //         )
    //     }

    //     // Filter by price
    //     if (props.priceFilter) {
    //         filteredSneakers = filteredSneakers.filter(
    //             (sneaker) => {
    //                 return sneaker.price <= parseInt(props.priceFilter)
    //             }
    //         )
    //     }

    //     // Filter by site
    //     if (props.siteFilter)
    //     filteredSneakers = filteredSneakers.filter(
    //         (sneaker) => {
    //             return sneaker.source_site.toLowerCase()
    //             .indexOf(props.siteFilter.toLowerCase()) !== -1
    //         }
    //     )

    //     return filteredSneakers
    // }

    return (
        <div className='catalog'>
                {data.map((sneaker) => {
                     return (
                     <Sneaker
                        key={sneaker.id}
                        size={sneaker.size}
                        price={sneaker.price}
                        url={sneaker.url}
                        model={sneaker.model}
                        source={sneaker.source.toLowerCase()}
                        image={sneaker.image}
                    />
                    )})}
            </div>
    )
}