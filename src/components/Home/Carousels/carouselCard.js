import React from "react";
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { updateItemInfo, setItemPricesLoading, setItemListingsLoading } from '../../../redux/actions'
import { currencySymbolMap } from '../../../assets/constants'

export default function CarouselCard({ data, index, type, length }) {

    const dispatch = useDispatch()
    const currency = useSelector(state => state.currency)

    const generateLink = () => {
        if (type !== "recommended") {
            dispatch(updateItemInfo({}))
            dispatch(setItemPricesLoading(true))
            dispatch(setItemListingsLoading(true))
        }

        let itemKey = data.sku ? encodeURIComponent(data.sku) : data.urlKey 
        let gender = data.gender !== null ? data.gender: 'men' //default to men gender  

        //window.analytics.track(`carousel_item_clicked`, {id: itemKey, gender: gender})
        return `/item/${itemKey}/${gender}` 
    }

    const recommendedClick = (e) => {
        if (e.nativeEvent.button === 0) {
            let itemKey = data.sku ? encodeURIComponent(data.sku) : data.urlKey 
            document.location.href = `/item/${itemKey}/men`
        }
    }

    const getNavData = () => {
        let itemInfo = {
            sku: data.sku ? data.sku.replaceAll('-', ' ') : null,
            modelName: data.model,
            image: data.image,
            url: data.url,
            urlKey: data.urlKey
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
                        itemInfo: getNavData()
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

            {type === 'recommended' && 
                <Link 
                    to={{
                        pathname: generateLink(),
                        itemInfo: null
                    }}
                    onClick={(event) => recommendedClick(event)}
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