import React from 'react'
import { updateShoe, showShoeModal } from '../redux/actions'
import { useDispatch } from 'react-redux'

export default function Sneaker(props) {

    const dispatch = useDispatch()

    const clickHandler = () => {
        dispatch(updateShoe(props))
        dispatch(showShoeModal())
    }

    function getCurrencySymbol(currencyName) {
        if (currencyName === "USD" || currencyName === "CAD" || currencyName === "AUD") {
            return "$"
        } else if (currencyName === "GBP") {
            return "£"
        } else if (currencyName === "JPY") {
            return "¥"
        } else if (currencyName === "EUR") {
            return "€"
        } else {
            return "$"
        }
    }

    var currencySymbol = getCurrencySymbol(props.currency);

    return (
        <div className='sneaker' onClick={() => clickHandler()}>
            <div className='sneaker-content'>
                
                <div className={props.source === 'grailed' ? 'grailed-img-area' : 'img-area'}>
                    <img 
                        className='sneakerImg'
                        src={props.image_thumbnail}
                        loading="lazy"
                        alt={props.model}
                    />
                </div>

                <div className="content-area">
                    <div className='condition-area'>
                        <h3 className='condition'>{props.shoe_condition}</h3>
                    </div>

                    <div className='name-area'>
                        <h2 className='modelName'>{props.model}</h2>
                    </div>

                    <div className='priceAndSize'>
                        <h3 className='price'>{currencySymbol}{props.price.toLocaleString()}</h3>
                        <h3 className='size'>{props.size}</h3>
                    </div>
                </div>

            </div>
        </div>
    )
}
