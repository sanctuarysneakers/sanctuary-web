import React, { useState } from 'react'
import { ReactComponent as Search } from '../assets/images/Search.svg'
import { ReactComponent as Clear } from '../assets/images/Clear.svg'

export default function SearchBox({ location }) {

    const [input, setInput] = useState('')

    const handleKeyDown = e => {
        if (e.key === 'Enter') {
            // redirect to browse page with search query as url param
            document.location.href = `/browse/${e.target.value}`
        }
    }

    return (

        <div className='search-box'>
            <div className='search-box-content'>
                <div className='search-box-icon'>
                    <Search />
                </div>

                {/* Search bar component for the navbar modal */}
                {location === 'search-modal' && <input autoFocus
                    className='search-box-input'
                    type='text'
                    placeholder='Search'
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => handleKeyDown(e)}
                />}

                {/* Search bar component for home splash area */}
                {location === 'home-splash' && <input
                    className='search-box-input'
                    type='text'
                    placeholder='Search'
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => handleKeyDown(e)}
                />}

                {input && <div className='search-box-clear' onClick={() => setInput('')}>
                    <Clear />
                </div>}
            </div>
        </div>
    )
}