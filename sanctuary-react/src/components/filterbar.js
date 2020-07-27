import React from 'react'


export default function FilterBar(props) {

    function updateSizeFilter(event) {
        props.changeSizeFilter(event.target.value)
    }

    function updatePriceFilter(event) {
        props.changePriceFilter(event.target.value)
    }

    function updateSiteFilter(event) {
        props.changeSiteFilter(event.target.value)
    }

    return (
        <div className="filterBar">
            <label> Size Filter:
                <input 
                    className="sizeFilter"
                    type='number' 
                    value={props.sizeFilter}
                    onChange={updateSizeFilter}
                />
            </label>

            <label> Price Filter:
                <input 
                    className="priceFilter"
                    type='number' 
                    value={props.priceFilter}
                    onChange={updatePriceFilter}
                />
            </label>

            <label> Site Filter:
                <input 
                    className="siteFilter"
                    type='text' 
                    value={props.siteFilter}
                    onChange={updateSiteFilter}
                />
            </label>
        </div>
    )
}