import React, { useEffect } from "react"
import Sneaker from './sneaker'
import { useDispatch, useSelector } from 'react-redux'
import { updateShoe, apiCall, toggleShoeDetails } from '../redux/actions'


export default function Catalog() {
    
    const filter = useSelector(state => state.filter)
    const apiData = useSelector(state => state.apiData)
    const dispatch = useDispatch()

    useEffect(() => {

        let api_url = `http://flask-env.eba-wjhtntpd.us-west-2.elasticbeanstalk.com/?`

        async function fetchData(url) {
            const response = await fetch(url)
            const data = await response.json()
            dispatch(apiCall(data))
        }

        // filter options: price_low, price_high, search, size, source
        function filter() {            
            if (filter.search) api_url += `&search=${filter.search}`
            if (filter.size > 0) api_url += `&size=${filter.size}`
            // TODO: make this a drop down menu
            if (filter.source) api_url += `&source=${filter.source}`
            // TODO: make this a slider bar
            // TODO: add price_low, price_high filters
            // if (props.price_low)
            // if (props.price_high)
        }

        filter()
        fetchData(api_url)
    }, [filter])

    const clickHandler = sneaker => {
        dispatch(updateShoe(sneaker))
        dispatch(toggleShoeDetails())
    }


    return (
        <div className='catalog'>
            {apiData.map((sneaker) => {
                    return (
                    <div
                        className="shoe-card"
                        key={sneaker.id}
                        onClick={() => clickHandler(sneaker)}
                    >
                        <Sneaker
                        size={sneaker.size}
                        price={sneaker.price}
                        url={sneaker.url}
                        model={sneaker.model}
                        source={sneaker.source.toLowerCase()}
                        image={sneaker.image}
                        />
                    </div>
                )})}
            </div>
    )
}