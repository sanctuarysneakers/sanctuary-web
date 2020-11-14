import { useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { stockxCall, goatCall, grailedCall, flightClubCall, shoeComparisonCall } from '../../redux/actions'

export default function useAPICall(callType) {
    /* 
        callType is either 'catalog' or 'comparison' which indicates whether the API call
        is being made to update the main catalog or if it is being made to update the
        shoes for price comparison inside of a shoe modal.
    */

    const dispatch = useDispatch()
    const filter = useSelector(state => state.filter)
    const shoe = useSelector(state => state.shoe)

    useEffect(() => {
        const shoeConditionReformat = (data) => {
            /* site must be one of the following values: "stockx", "goat", "grailed", "flightclub" */

            let grailedConditions = {
                "is_gently_used": "Gently Used",
                "is_used": "Used",
                "is_not_specified": "Not Specified",
                "is_new": "New",
                "is_worn": "Worn"
            }

            let goatConditions = {
                "new_no_defects": "New",
                "new_with_defects": "New With Defects",
                "used": "Used",
                "goat_clean": "GOAT Clean"
            }

            let flightClubConditions = {
                "new_no_defects": "New",
                "new_with_defects": "New With Defects",
                "used": "Used",
            }

            let stockxConditions = {
                "New": "New"
            }

            let shoeConditionsMap = {
                "stockx": stockxConditions,
                "goat": goatConditions,
                "grailed": grailedConditions,
                "flightclub": flightClubConditions
            }

            return data.map(shoe => {
                // make lower case and remove white space
                let site = shoe.source.toLowerCase().replace(/\s+/g, '');
                if (shoe.shoe_condition in shoeConditionsMap[site]) {
                    shoe.shoe_condition = shoeConditionsMap[site][shoe.shoe_condition]
                }
                else shoe.shoe_condition = 'Undetermined'
                return shoe
            })
        }

        const dispatchMap = {
            "stockx": stockxCall,
            "goat": goatCall,
            "grailed": grailedCall,
            "flightclub": flightClubCall
        }

        function catalogAPICall() {

            let api_url = `https://sanctuaryapi.net/?`

            function applyFilter() {
                if (filter.search) api_url += `&search=${filter.search}`
                if (filter.size && filter.size > 0) api_url += `&size=${filter.size}`
                if (filter.price_low && filter.price_low > 0) api_url += `&price_low=${filter.price_low}`
                if (filter.price_high && filter.price_high > 0) api_url += `&price_high=${filter.price_high}`
            }

            async function fetchData(url) {

                let sites = ["stockx", "goat", "grailed", "flightclub"]

                for await (const site of sites) {
                    const response = await fetch(url + `&source=${site}`)
                    let data = await response.json()
                    if ("message" in data && data["message"] === "Internal Server Error") data = []
                    dispatch(dispatchMap[site](shoeConditionReformat(data)))
                }
            }

            applyFilter()
            fetchData(api_url)
        }

        function comparisonAPICall() {

            let api_url = `https://sanctuaryapi.net/?&search=${shoe.model}&sku_id=${shoe.sku_id}`

            async function fetchData(url) {
                const response = await fetch(url)
                let data = await response.json()
                if ("message" in data && data["message"] === "Internal Server Error") data = []
                dispatch(shoeComparisonCall(shoeConditionReformat(data)))
            }

            fetchData(api_url)
        }

        if (callType === 'catalog') catalogAPICall()
        if (callType === 'comparison') comparisonAPICall()
    }, [filter])
}