import React from 'react'
import { Helmet } from 'react-helmet'
import { useDispatch } from 'react-redux'
import { hideHomeSearch } from '../../redux/actions'

export default function ItemNotSupported() {

    const dispatch = useDispatch()

    // Hide the search bar
    dispatch(hideHomeSearch())

    return (
        <div className="pageNotFoundText">
            <Helmet>
                <title>Sanctuary Sneakers | Item Not Supported</title>
                <meta
                    name="description"
                    content="Sorry, this item isn't supported yet."
                />
            </Helmet>
            <h1>Sorry, this item isn't supported yet.</h1>
        </div>
    )
}