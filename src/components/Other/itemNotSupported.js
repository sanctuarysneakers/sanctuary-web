import React from 'react'
import { Helmet } from 'react-helmet'
import { useDispatch } from 'react-redux'
import { hideHomeSearch } from '../../redux/actions'
import SearchBox from '../Search/searchBox'
import Footer from '../Other/footer'

export default function ItemNotSupported () {
  const dispatch = useDispatch()

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
                <h1> Sorry, the item you&apos;re looking for is not supported yet. </h1>
                <SearchBox/>
            </div>

            <Footer colour={'white'} />
        </div>
  )
}
