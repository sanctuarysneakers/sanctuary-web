import React from 'react'
import { Helmet } from 'react-helmet'
import { useDispatch } from 'react-redux'
import { hideHomeSearch } from '../../redux/actions'
import SearchBox from '../Search/searchBox'
import Footer from '../Other/footer'

export default function PageNotFound() {

    const dispatch = useDispatch()

    // Hide the search bar
    dispatch(hideHomeSearch())

    return (
        <div className="pageNotFoundText">
            <div className='pageNotFoundText-content'>
                <Helmet>
                    <title>Sanctuary Sneakers | Page Not Found</title>
                    <meta
                        name="description"
                        content="Sorry, we can't find the page you're looking for."
                    />
                </Helmet>
                <h1>Sorry, we can't find the page you're looking for. </h1>
                <SearchBox/>
            </div>

            <Footer colour={'white'} />
        </div>
    )
}