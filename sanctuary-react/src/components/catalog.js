import React, { useState, useEffect } from "react"
import Sneaker from './sneaker'


const API_URL = "http://flask-env.eba-wjhtntpd.us-west-2.elasticbeanstalk.com/?"

export default function Catalog(props) {

    const [data, setData] = useState([])

    useEffect(() => {
        let search_url = API_URL

        const fetchData = async (url) => {
            const response = await fetch(url)
            const data = await response.json()
            setData(data)
        }

        const filter = () => {
            if (props.search) {
                search_url += `&model='${props.search}'`
            }

            if (props.sizeFilter) {
                search_url += `&size=${props.sizeFilter}`
            }

            if (props.priceFilter) {
                search_url += `&price_high=${props.priceFilter}`
            }
            // TODO: price low filter

            if (props.siteFilter) {
                search_url += `&source='${props.siteFilter}'`
            }
        }

        filter()
        fetchData(search_url)
    }, [props.search])


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