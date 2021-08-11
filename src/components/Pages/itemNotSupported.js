import React from 'react'
import { Helmet } from 'react-helmet'
import { useDispatch } from 'react-redux'
import { hideHomeSearch } from '../../redux/actions'
import SearchBox from '../searchBox'
import Footer from '../footer'

export default function ItemNotSupported() {

    const dispatch = useDispatch()

    // Hide the search bar
    dispatch(hideHomeSearch())

    return (
        <div className="pageNotFoundText">
            <div className='pageNotFoundText-content'>
                <Helmet>
                    <title>Sanctuary Sneakers | Item Not Supported</title>
                    <meta
                        name="description"
                        content="Sorry, this item isn't supported yet."
                    />
                </Helmet>
                <h1> Sorry, the item you're looking for is not supported yet. </h1>
                <SearchBox location={'home-splash'} />
            </div>

            <Footer colour={'white'} />
        </div>
    )
}