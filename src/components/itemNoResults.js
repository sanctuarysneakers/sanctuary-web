import React from 'react'

export default function ItemNoResults({ version }) {

    return (
        <div className='item-no-results'>
            <div className='item-no-results-content'>
                {(version === 'prices') ? <p> New - No Results </p> : <p> Used - No Results </p>}
            </div>
        </div>
    )
}