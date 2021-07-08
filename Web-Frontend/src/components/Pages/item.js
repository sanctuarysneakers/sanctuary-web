import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Helmet } from 'react-helmet'
import { useDispatch, useSelector } from 'react-redux'
import { showFilter } from '../../redux/actions'
import stockX from '../../assets/images/stockx-new.png'
import useAPICall from '../Hooks/useapicall'
import Loader from '../loader'
import ItemPrice from '../itemPrice'
import ItemListing from '../itemListing'

export default function Item() {
    const dispatch = useDispatch()

    const { sku } = useParams()
    const size = useSelector(state => state.size)
    const itemInfo = useSelector(state => state.itemInfo)
    const itemPrices = useSelector(state => state.itemPrices)
    const itemListings = useSelector(state => state.itemListings)

    useAPICall('getitem', { sku: sku, size: size })

    const itemPriceComponents = itemPrices.map((item) => (
        <ItemPrice key={item.source} data={item}></ItemPrice>
    ))
    const itemListingComponents = itemListings.map((item) => (
        <ItemListing key={item.id} data={item}></ItemListing>
    ))

    const [loader, setLoader] = useState(true)

    console.log(itemPrices)

    useEffect(() => {
        if (itemInfo)
            setLoader(false)
    })

    return (
        <div className='item'>
            <div className='item-sneaker'>
                <div className='item-sneaker-content'>
                    <div className='item-sneaker-image'>
                        <img src={itemInfo.image} alt='sneaker image' />
                    </div>

                    <div className='item-sneaker-info'>
                        <div className='item-sneaker-filters'>
                            <div className='item-sneaker-select-size'>
                                <h4> Select size </h4>
                            </div>
                        </div>

                        <div className='item-sneaker-text'>
                            <div className='item-sneaker-model'>
                                <h1> {itemInfo.modelName} </h1>
                            </div>

                            <div className='item-sneaker-price'>
                                <a>
                                    Buy
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='item-price-listings'>
                <div className='item-price-listings-content'>

                </div>
            </div>
        </div>
    )





    // if (loader) {
    //     return (
    //         <Loader />
    //     )
    // } else {
    //     return (
    //         <div className='item'>
    //             <div className='item-info'>
    //                 <div className='item-shoe'>
    //                     <img src={itemInfo.image} alt='sneaker image' />
    //                 </div>
    //                 <div className='item-text'>
    //                     <h2 className='item-model'>
    //                         {itemInfo.modelName}
    //                     </h2>

    //                     <div className='item-buy'>
    //                         <p> Buy $TMP{/* itemData.prices[0].price */}</p>
    //                     </div>

    //                     <div className='item-specifics'>
    //                         <div className='item-size'>
    //                             <h4> SIZE </h4>
    //                             <p> {size} </p>
    //                         </div>
    //                         <div className='item-specifics-divider' />
    //                         <div className='item-condition'>
    //                             <h4> CONDITION </h4>
    //                             <p> New </p>
    //                         </div>
    //                         <div className='item-specifics-divider' />
    //                         <div className='item-website'>
    //                             <h4> WEBSITE </h4>
    //                             <img src={stockX} alt='StockX' />
    //                         </div>
    //                     </div>
    //                 </div>
    //             </div>

    //             <div className='item-listings'>
    //                 <div className='item-listings-wrapper'>

    //                     <div className='item-listings-cheapest'>
    //                         <h2 className='lowest-prices-title'> 
    //                             Lowest Prices
    //                             <p className='item-filter' onClick={() => dispatch(showFilter())}>FILTER</p>
    //                         </h2>
    //                         <div className='item-lowest-prices'>
    //                             <div className='item-lowest-prices-wrapper'>
    //                                 {itemPriceComponents}
    //                             </div>
    //                         </div>
    //                     </div>

    //                     <div className='item-listings-used'>
    //                         <h2 className='more-listings-title'>
    //                             More Listings
    //                         </h2>

    //                         <div className='item-more-listings'>
    //                             <div className='item-more-listings-wrapper'>
    //                                 {itemListingComponents}
    //                             </div>
    //                         </div>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     )
    // }

}