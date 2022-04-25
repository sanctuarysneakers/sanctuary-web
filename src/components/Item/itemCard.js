import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { updateItemInfo, setItemPricesLoading, setItemListingsLoading  } from '../../redux/actions'
import { currencySymbolMap }  from '../../assets/constants'

export default function ItemCard({ data }) {

    const dispatch = useDispatch()
    const currency = useSelector(state => state.currency)

    const generateLink = () => {
        dispatch(updateItemInfo({}))
        dispatch(setItemPricesLoading(true))
        dispatch(setItemListingsLoading(true))

        let itemKey = data.sku ? encodeURIComponent(data.sku) : data.urlKey
        window.analytics.track(`browse_item_clicked`, {id: itemKey, gender: data.gender})

        return `/item/${itemKey}/${data.gender}` 
    }

    const getNavData = () => {
        let itemInfo = {
            sku: data.sku.replaceAll('-', ' '),
            modelName: data.model,
            image: data.image,
            url: data.url,
        }
        return itemInfo
    }

    return (
        <div className='item-card'>
            <Link 
                to={{
                    pathname: generateLink(),
                    itemInfo: getNavData()
                }}
                className="hidden-link"
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
