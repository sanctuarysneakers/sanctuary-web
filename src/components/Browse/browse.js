import React from 'react'
import { Helmet } from 'react-helmet'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router'
import { showHomeSeach } from '../../redux/actions'
import Catalog from './catalog'
import Footer from '../Other/footer'
import FiltersButton from './filtersButton'
import SortByButton from './sortByButton'

export default function Browse () {
  const dispatch = useDispatch()

  let { searchTerm } = useParams()
  if (!searchTerm) searchTerm = ''

  dispatch(showHomeSeach())

  return (
    <div className='browse'>
      <Helmet>
        <title>Sanctuary: Browse</title>
      </Helmet>
      <div className='browse-results'>
        <div className='browse-results-content'>

          {!searchTerm && <div className='browse-results-text'>
            <h2> Browse </h2>
          </div>}
          {searchTerm && <div className='browse-results-text'>
            <h2> Search results for </h2>
            <h2> &apos;{searchTerm}&apos; </h2>
          </div>}

          <div className='browse-buttons'>
            <SortByButton />
            <FiltersButton />
          </div>
        </div>
      </div>

      <div className='browse-catalog'>
        <Catalog searchTerm={searchTerm} />
      </div>

      <Footer color={'blue'} />
    </div>
  )
}
