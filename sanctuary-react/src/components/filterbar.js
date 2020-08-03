import React from 'react'


export default function FilterBar(props) {

    // TODO: add price_low, price_high filters

    function updateSize(event) {
        props.changeSize(event.target.value)
    }

    function updatePrice(event) {
        props.changePrice(event.target.value)
    }

    function updateSource(event) {
        props.changeSource(event.target.value)
    }

    // TODO: turn site filter into a drop down
    return (
        <div className="filterBar">
            <label> Size Filter:
                <input 
                    className="sizeFilter"
                    type='number' 
                    value={props.size}
                    onChange={updateSize}
                />
            </label>

            <label> Price Filter:
                <input 
                    className="priceFilter"
                    type='number' 
                    value={props.price}
                    onChange={updatePrice}
                />
            </label>

            <label> Site Filter:
                <input 
                    className="sourceFilter"
                    type='text' 
                    value={props.source}
                    onChange={updateSource}
                />
            </label>
        </div>
    )
}