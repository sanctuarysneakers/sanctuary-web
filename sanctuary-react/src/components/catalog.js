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

    const grailedConditionReformat = data => {
        let grailedConditions = {
            "is_gently_used": "Gently Used",
            "is_used": "Used",
            "is_not_specified": "Not Specified",
            "is_new": "New",
            "is_worn": "Worn"
        }

        return data.map(shoe => {
            shoe.shoe_condition = grailedConditions[shoe.shoe_condition]
            return shoe
        })
    }

    const goatConditionReformat = data => {
        let goatConditions = {
            "new_no_defects": "New",
            "new_with_defects": "New With Defects",
            "used": "Used",
            "goat_clean": "GOAT Clean"
        }

        return data.map(shoe => {
            shoe.shoe_condition = goatConditions[shoe.shoe_condition]
            return shoe
        })
    }


    useEffect(() => {

        let api_url = `https://sanctuaryapi.net/?`
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
                        data = goatConditionReformat(data)
                        dispatch(goatCall(data))
                        break
                    case "grailed":
                        data = grailedConditionReformat(data)
                        dispatch(grailedCall(data))
                        break
                    case "flightclub":
                        dispatch(flightClubCall(data))
                        break
                    default:
                        break
                }
            }
        }

        function applyfilter() {
            if (filter.search) api_url += `&search=${filter.search}`

            // TODO: make this a drop down menu
            if (filter.size && filter.size > 0) api_url += `&size=${filter.size}`

            // TODO: make this a slider bar
            if (filter.price_low && filter.price_low > 0) api_url += `&price_low=${filter.price_low}`
            if (filter.price_high && filter.price_high > 0) api_url += `&price_high=${filter.price_high}`
        }
        
        applyfilter()
        fetchData(api_url, "stockx")
    }, [filter])

    const noResults = site => {
        return (
            <div className='no-results'>
                <h1>Sorry, we couldn't find any results on {site}.</h1>
            </div>
        )
    }

    return (
        <div className='catalog'>
            <img 
                className='stockxLogo'
                src={stockxLogo}
                alt={"StockX"}
            />
            {stockxData.length !== 0 && <Slider data={stockxData} />}
            {stockxData.length === 0 && noResults("StockX")}

            <img 
                className='goatLogo'
                src={goatLogo}
                alt={"GOAT"}
            />
            {goatData.length !== 0 && <Slider data={goatData} />}
            {goatData.length === 0 && noResults("GOAT")}

            <img 
                className='grailedLogo'
                src={grailedLogo}
                alt={"Grailed"}
            />
            {grailedData.length !== 0 && <Slider data={grailedData} />}
            {grailedData.length === 0 && noResults("Grailed")}

            <img 
                className='flightclubLogo'
                src={flightclubLogo}
                alt={"Flight Club"}
            />
            {flightClubData.length !== 0 && <Slider data={flightClubData} />}
            {flightClubData.length === 0 && noResults("Flight Club")}
        </div>
    )
}
