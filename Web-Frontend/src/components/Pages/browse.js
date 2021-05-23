import React from 'react'
import { Helmet } from 'react-helmet'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { showHomeSeach } from '../../redux/actions'
import Catalog from '../catalog'

export default function Browse() {

    const dispatch = useDispatch()

    const {query} = useParams()

    // Show the search bar
    dispatch(showHomeSeach())

    return (
        <div>
            <main className='filter-catalog'>
                <h2>{query}</h2>
                <section id="section-b" className='catalogrow'>
                    <div className='b-wrap'>
                        <Catalog search_query={query} />
                    </div>
                </section>
            </main>
        </div>
    )
}