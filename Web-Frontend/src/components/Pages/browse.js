import React from 'react'
import { Helmet } from 'react-helmet'
import { useDispatch, useSelector } from 'react-redux'
import { showHomeSeach } from '../../redux/actions'
import FilterBar from '../filterbar'
import Catalog from '../catalog'

export default function Browse() {

    const dispatch = useDispatch()

    // Show the search bar
    dispatch(showHomeSeach())

    return (
        <div>
            <main className='filter-catalog'>
                <section id="section-a" className='filterrow'>
                    <div className='a-wrap'>
                        <FilterBar />
                    </div>
                </section>

                <section id="section-b" className='catalogrow'>
                    <div className='b-wrap'>
                        <Catalog />
                    </div>
                </section>
            </main>
        </div>
    )
}