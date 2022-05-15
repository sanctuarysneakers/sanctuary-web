import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { currencySymbolMap }  from '../../assets/constants'
import { updateItemInfo, setItemPricesLoading, setItemListingsLoading  } from '../../redux/actions'
import { v4 as uuidv4 } from 'uuid';

export default function RecommendedCard({ data }) {

    const dispatch = useDispatch()
    const currency = useSelector(state => state.currency)

    const generateLink = () => {
        let itemKey = data.sku ? encodeURIComponent(data.sku) : data.urlKey //recommended items will most likely only have a urlkey
        window.analytics.track(`recommended_item_clicked`, {id: itemKey})
        return `/item/${itemKey}/men` //recommended items do no have a specific gender, setting to men for now 
    }

    const handleClick = (e) => {
        if (e.nativeEvent.button === 0) {
            let itemKey = data.sku ? encodeURIComponent(data.sku) : data.urlKey 
            document.location.href = `/item/${itemKey}/men`
            dispatch(updateItemInfo({}))
            dispatch(setItemPricesLoading(true))
            dispatch(setItemListingsLoading(true))
          }
    }

    return (
        <div className='item-card'>
            <Link 
                className="hidden-link"
                onClick={(event) => handleClick(event)}
                to={{
                    pathname: generateLink(), 
                    key: uuidv4() //force refresh
                }}
                
            > 
                <div className='item-card-content'>
                    <div className='item-card-sneaker'>
                        <img src={data.imageThumbnail} loading='lazy' alt={data.model} />
                    </div>

                    <div className='item-card-text'>
                        <h2> {data.model} </h2>

                        <div className='item-card-estimated-price'>
                            <p className='item-card-estimated'>
                                Estimated 
                            </p>

                            <p className='item-card-price'>
                                {currencySymbolMap[currency]}{data.price.toLocaleString('en')}
                            </p>
                        </div>
                    </div>
                </div>
            </Link> 
        </div>
    )
}
