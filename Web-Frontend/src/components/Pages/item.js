import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Helmet } from 'react-helmet'
import { useSelector } from 'react-redux'
import useAPICall from '../Hooks/useapicall'
import Loader from '../loader'
import stockX from '../../assets/images/stockx-new.png'
import ItemPrice from '../itemPrice'
import ItemListing from '../itemListing'

export default function Item() {

    const { urlKey } = useParams()
    const itemData = useSelector(state => state.itemData)
    const currency = useSelector(state => state.currency)
    console.log(itemData)
    useAPICall('getitem', { itemKey: urlKey })

    let itemPrices;
    if (itemData.prices) {
        itemPrices = itemData.prices.map((item) => <ItemPrice data={item}></ItemPrice>)
    }

    let itemListings;
    if (itemData.listings) {
        itemListings = itemData.listings.map((item) => <ItemListing data={item}></ItemListing>)
    }

    const [loader, setLoader] = useState(true)

    useEffect(() => {
        if (itemData.info)
            setLoader(false)
    })

    if (loader) {
        return (
            <Loader />
        )
    } else {
        return (
            <div className='item'>
                <div className='item-info'>
                    <div className='item-shoe'>
                        <img src={itemData.info.image} alt='sneaker image' />
                    </div>

                    <div className='item-text'>
                        <h2 className='item-model'>
                            {itemData.info.modelName}
                        </h2>

                        <div className='item-buy'>
                            <p> Buy ${itemData.prices[0].price}</p>
                        </div>

                        <div className='item-specifics'>
                            <div className='item-size'>
                                <h4> SIZE </h4>
                                <p> 10 </p>
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

                <div className='item-listings'>
                    <div className='item-listings-wrapper'>

                        <div className='item-listings-cheapest'>
                            <h2 className='lowest-prices-title'> 
                                Lowest Prices 
                            </h2>

                            <div className='item-lowest-prices'>
                                <div className='item-lowest-prices-wrapper'>
                                    {itemPrices}
                                </div>
                            </div>
                        </div>

                        <div className='item-listings-used'>
                            <h2 className='more-listings-title'>
                                More Listings
                            </h2>

                            <div className='item-more-listings'>
                                <div className='item-more-listings-wrapper'>
                                    {itemListings}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    // return (
    //     // trying to display item attributes causes an error because
    //     // itemData is initially an empty object
    //     <div>
    //         <p>{/*itemData.info.modelName*/}</p>
    //         <p>{/*itemData.info.skuId*/}</p>
    //     </div>
    // )
}