import React from "react";
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { updateSize, updateItemInfo, setItemPricesLoading, setItemListingsLoading } from '../../../redux/actions'
import { currencySymbolMap } from '../../../assets/constants'

export default function CarouselCard({ data, index, type, length }) {

    const dispatch = useDispatch()
    const currency = useSelector(state => state.currency)
    const size = useSelector(state => state.item.size)

    const generateLink = () => {
        dispatch(updateItemInfo({}))
        dispatch(setItemPricesLoading(true))
        dispatch(setItemListingsLoading(true))

        let itemId = data['sku'] ? data['sku'].split('/')[0] : data['urlKey']
        window.analytics.track(`home_carousel_item_clicked`, {id: itemId, gender: data['gender']});

        return `/item/${itemId}/${data['gender']}` 
    }

    const getNavData = () => {
        if (size < 7 && data['gender'] === 'men')
			dispatch(updateSize(7))
		else if (size > 12 && data['gender'] === 'women')
			dispatch(updateSize(12))
        
        let itemInfo = {
            hasPrice: true,
            skuId: data.sku.replaceAll('-', ' '),
            modelName: data.model,
            price: data.price,
            image: data.image,
            url: data.url,
            shipping: data.shipping
        }

        return itemInfo
    }

    let position;
    if (index === 0)
        position = 'carousel-card start'
    else if (index === length - 1)
        position = 'carousel-card end'
    else position = 'carousel-card'

    return (
        <div className={position}>
            {(type === 'trending') && 
                <Link 
                    to={{
                        pathname: generateLink(),
                        itemInfo: getNavData()
                    }}
                    className="hidden-link"
                > 
                    <div className='carousel-card-trending'>
                        <div className='carousel-card-trending-sneaker'>
                            <img src={data.imageThumbnail} alt='Sneaker thumbnail'/>
                        </div>

                        <div className='carousel-card-trending-text'>
                            <div className='carousel-card-trending-model'>
                                <p>TRENDING</p>
                                <h2>{data.model}</h2>
                            </div>

                            <div className='carousel-card-trending-price'>
                                <p>Estimated</p>
                                <h4>{currencySymbolMap[currency]}{data.price.toLocaleString('en')}</h4>
                            </div>
                        </div>
                    </div>
                </Link>
            }

            {(type === 'under200' || type === 'under300') && 
                <Link 
                    to={{
                        pathname: generateLink(),
                        state: getNavData()
                    }}
                    className="hidden-link"
                >  
                    <div className='carousel-card-deals'>
                        <div className='carousel-card-content'>
                            <div className='carousel-card-image'>
                                <img src={data.imageThumbnail} alt='Sneaker thumbnail'/>
                            </div>

                            <div className='carousel-card-text'>
                                <h2>{data.model}</h2>
                            </div>

                            <div className='carousel-card-price'>
                                <p>Estimated</p>
                                <h4>{currencySymbolMap[currency]}{data.price.toLocaleString('en')}</h4>
                            </div>
                        </div>
                    </div>
                </Link>
            }
        </div>
    )
}