import React from 'react'
import { useHistory } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { updateItemInfo, updateSize, setItemPricesLoading, setItemListingsLoading  } from '../redux/actions'
import { currencySymbolMap }  from '../assets/constants'


export default function ItemCard({ data }) {

    let history = useHistory(); 

    const dispatch = useDispatch()
    const currency = useSelector(state => state.currency)
    const size = useSelector(state => state.size)

    const clickHandler = () => {
        if (size < 7 && data['gender'] === 'men')
			dispatch(updateSize(7))
		else if (size > 12 && data['gender'] === 'women')
			dispatch(updateSize(12))
        
        let itemId = data['sku'] ? data['sku'].split('/')[0] : data['urlKey']
        window.analytics.track(`browse_item_clicked`, {id: itemId, gender: data['gender']});

        let itemInfo = {
            hasPrice: true,
            skuId: data.sku.replaceAll('-', ' '),
            modelName: data.model,
            price: data.price,
            image: data.image,
            url: data.urlKey 
        }

        dispatch(updateItemInfo(itemInfo))
        dispatch(setItemPricesLoading(true))
        dispatch(setItemListingsLoading(true))

        history.push({
            pathname: `/item/${itemId}/${data['gender']}`, 
            itemInfo: itemInfo
        })
        window.scrollTo(0, 0)
    }

    return (
        <div className='item-card' onClick={clickHandler}>
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
        </div>
    )
}
