import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Catalog from '../catalog'
import FilterBar from '../filterbar'
import { Helmet } from 'react-helmet'
import SearchBar from '../searchbar'
import { showHomeSeach } from '../../redux/actions'

export default function Browse() {

    const dispatch = useDispatch()

    // Show the search bar
    dispatch(showHomeSeach())

    return (
        <div>
			<div className='splashWrap'>
				<div className='middleSearchbar'>
					<SearchBar />
				</div>
			</div>

            <main
                className='filter-catalog'
            >
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