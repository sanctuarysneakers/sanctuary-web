import React, { useState, useEffect } from "react"
import Sneaker from './sneaker'


export default function Catalog(props) {

    const [data, setData] = useState([])

    useEffect(() => {

        let api_url = `http://flask-env.eba-wjhtntpd.us-west-2.elasticbeanstalk.com/?`

        async function fetchData(url) {
            const response = await fetch(url)
            const data = await response.json()
            setData(data)
        }

        // filter options: price_low, price_high, search, size, source
        function filter() {            
            if (props.search) api_url += `&search=${props.search}`
            if (props.size > 0) api_url += `&size=${props.size}`
            // TODO: make this a drop down menu
            if (props.source) api_url += `&source=${props.source}`
            // TODO: make this a slider bar
            // TODO: add price_low, price_high filters
            // if (props.price_low)
            // if (props.price_high)
        }

        filter()
        fetchData(api_url)
    }, [props])


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