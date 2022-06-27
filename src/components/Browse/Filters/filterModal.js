import React from 'react'
import { useDispatch } from 'react-redux'
import { hideFilterModal } from '../../../redux/actions'
import { ReactComponent as Close } from '../../../assets/images/close.svg'
import BrowseFilterWrapper from './browseFilterWrapper'

export default function FilterModal() {

    const dispatch = useDispatch()

    return (
        <div className='modal-filter'>
            <div className='filter'>
                <div className='filter-content'>
                    <div className='filter-header'>
                        <h2 className='filter-title'>
                            Filter
                        </h2>

                        <div className='filter-close'>
                            <button onClick={() => dispatch(hideFilterModal())}>
                                <Close />
                            </button>
                        </div>
                    </div>

                    <div className='filter-checkboxes'>
                        <BrowseFilterWrapper/> 
                    </div>
                </div>
            </div>
        </div>
    )
}