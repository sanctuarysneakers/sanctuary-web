import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { useMediaQuery } from 'react-responsive'
import { Helmet } from 'react-helmet'
import { useSelector } from 'react-redux'
import { showFilter } from '../../redux/actions'
import stockX from '../../assets/images/stockx-new.png'
import useAPICall from '../Hooks/useapicall'
import Loader from '../loader'
import ItemPrice from '../itemPrice'
import ItemListing from '../itemListing'
import ItemLoader from '../itemLoader'

export default function Item() {
    const isDesktop = useMediaQuery({query: '(min-width: 768px)'})

    const { sku } = useParams()
    const size = useSelector(state => state.size)
    useAPICall('getitem', { sku: sku, size: size })

    const itemInfo = useSelector(state => state.itemInfo)
    const itemPrices = useSelector(state => state.itemPrices)
    const itemListings = useSelector(state => state.itemListings)

    const [pricesLoader, setPricesLoader] = useState(true)
    const [listingsLoader, setListingsLoader] = useState(true)
    const [priceComponents, setPriceComponents] = useState(false)
    const [listingComponents, setListingComponents] = useState(false)
    const [noPrices, setNoPrices] = useState(false)
    const [noListings, setNoListings] = useState(false)

    useEffect(() => {
        if (!itemPrices)
            setNoPrices(true)
        else if (itemPrices.length !== 0) {
            setPricesLoader(false)
            setPriceComponents(itemPrices.map((item) =>
                <ItemPrice key={item.source} data={item}></ItemPrice>
            ))
        }

        if (!itemListings)
            setNoListings(true)
        else if (itemListings.length !== 0) {
            setListingsLoader(false)
            setListingComponents(itemListings.map((item) =>
                <ItemListing key={item.id} data={item}></ItemListing>
            ))
        }
    }, [itemPrices, itemListings])

    return (
        <div className='item'>
            <div className='item-sneaker'>
                <div className='item-sneaker-content'>
                    {!isDesktop && <div className='item-sneaker-filters mobile'>
                        <div className='item-sneaker-select-size'>
                            <h4> Select size </h4>
                        </div>
                    </div>}

                    <div className='item-sneaker-image'>
                        <img src={itemInfo.image} alt='sneaker image' />
                    </div>

                    <div className='item-sneaker-info'>
                        {isDesktop && <div className='item-sneaker-filters'>
                            <div className='item-sneaker-select-size'>
                                <h4> Select size </h4>
                            </div>
                        </div>}

                        <div className='item-sneaker-text'>
                            <div className='item-sneaker-model'>
                                <h1> {itemInfo.modelName} </h1>
                            </div>

                            <div className='item-sneaker-price'>
                                <a>
                                    {pricesLoader && <h2> ... </h2>}
                                    {!pricesLoader && <h2> Buy ${itemPrices[0].price} </h2>}
                                </a>
                            </div>

                            <div className='item-specifics'>
                                <div className='item-size'>
                                    <h4> SIZE </h4>
                                    <p> {size} </p>
                                </div>
                                <div className='item-specifics-divider' />
                                <div className='item-condition'>
                                    <h4> CONDITION </h4>
                                    <p> New </p>
                                </div>
                                <div className='item-specifics-divider' />
                                <div className='item-website'>
                                    <h4> WEBSITE </h4>
                                    <img src={stockX} alt='StockX' />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='item-price-listings'>
                <div className='item-price-listings-content'>
                    <div className='item-lowest-prices'>
                        <h6> Lowest Prices </h6>

                        <div className='item-lowest-prices-rows'>
                            {pricesLoader && <ItemLoader version={'prices'} />}
                            {noPrices && console.log('no prices')}

                            {!pricesLoader && <div className='item-lowest-prices-rows-content'>
                                {priceComponents}
                            </div>}
                        </div>
                    </div>

                    <div className='item-more-listings'>
                        <h6> More Listings </h6>

                        <div className='item-more-listings-rows'>
                            {listingsLoader && <ItemLoader version={'listings'} />}
                            {noListings && console.log('no listings')}

                            {!listingsLoader && <div className='item-more-listings-rows-content'>
                                {listingComponents}
                            </div>}
                        </div>
                    </div>
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