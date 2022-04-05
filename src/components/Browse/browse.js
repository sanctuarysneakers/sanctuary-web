import React from 'react'
import { Helmet } from 'react-helmet';
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router'
import { showHomeSeach } from '../../redux/actions'
import Catalog from './catalog'
import Footer from '../Other/footer'
import CategoryFilter from './categoryFilter'

export default function Browse() {

    const dispatch = useDispatch()

    let {query} = useParams()
    if (!query) query = ''

    dispatch(showHomeSeach())

    return (
        <div className='browse'>
            <Helmet>
                <title>Sanctuary: Browse</title>
            </Helmet>
            <div className='browse-results'>
                <div className='browse-results-content'>

                    {!query && <div className='browse-results-text'> 
                        <h2> Browse </h2>
                    </div>}
                    {query && <div className='browse-results-text'>
                        <h2> Search results for </h2>
                        <h2> '{query}' </h2>
                    </div>}
                    <CategoryFilter />
                </div>
            </div>

            <div className='browse-catalog'>
                <Catalog search_query={query} />
            </div>

            <Footer colour={'blue'} />
        </div>
    )

}