import React, { useEffect } from "react"
import Sneaker from './sneaker'
import { useDispatch, useSelector } from 'react-redux'
import { updateShoe, apiCall, showShoeModal } from '../redux/actions'


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

        function applyfilter() {            
            if (filter.search) api_url += `&search=${filter.search}`

            // TODO: make this a drop down menu
            if (filter.size > 0) api_url += `&size=${filter.size}`
            
            // TODO: make this a slider bar
            if (filter.price_low > 0) api_url += `&price_low=${filter.price_low}`
            if (filter.price_high > 0) api_url += `&price_high=${filter.price_high}`
        }

        applyfilter()
        fetchData(api_url)
    }, [filter])

    const clickHandler = sneaker => {
        dispatch(updateShoe(sneaker))
        dispatch(showShoeModal())
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
                        shoe_condition={sneaker.shoe_condition}
                        />
                    </div>
                )})}
            </div>
    )
}