import React, { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { stockxCall, goatCall, grailedCall, flightClubCall } from '../redux/actions'
import Slider from "./slider"

import stockxLogo from "../assets/images/logos/stockx.png"
import goatLogo from "../assets/images/logos/goat.png"
import grailedLogo from "../assets/images/logos/grailed.png"
import flightclubLogo from "../assets/images/logos/flight club.png"


export default function Catalog() {

    const dispatch = useDispatch()
    const filter = useSelector(state => state.filter)

    const stockxData = useSelector(state => state.stockxData)
    const goatData = useSelector(state => state.goatData)
    const grailedData = useSelector(state => state.grailedData)
    const flightClubData = useSelector(state => state.flightClubData)


    useEffect(() => {

        let api_url = `http://flask-env.eba-wjhtntpd.us-west-2.elasticbeanstalk.com/?`
        let sites = ["stockx", "goat", "grailed", "flightclub"]

        async function fetchData(url) {
            for await (const site of sites) {
                const response = await fetch(url + `&source=${site}`)
                let data = await response.json()
                if ("message" in data && data["message"] === "Internal Server Error") {
                    data = []
                }

                switch (site) {
                    case "stockx":
                        dispatch(stockxCall(data))
                        break
                    case "goat":
                        dispatch(goatCall(data))
                        break
                    case "grailed":
                        dispatch(grailedCall(data))
                        break
                    case "flightclub":
                        dispatch(flightClubCall(data))
                        break
                }
            }
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
        fetchData(api_url, "stockx")
    }, [filter])

    return (
        <div className='catalog'>
            <img 
                className='stockxLogo'
                src={stockxLogo}
                alt={"StockX"}
            />
            <Slider data={stockxData} />

            <img 
                className='goatLogo'
                src={goatLogo}
                alt={"GOAT"}
            />
            <Slider data={goatData} />

            <img 
                className='grailedLogo'
                src={grailedLogo}
                alt={"Grailed"}
            />
            <Slider data={grailedData} />

            <img 
                className='flightclubLogo'
                src={flightclubLogo}
                alt={"Flight Club"}
            />
            <Slider data={flightClubData} />
        </div>
    )
}