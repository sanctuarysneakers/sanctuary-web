import React, { useState } from 'react'
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { ReactComponent as Search } from '../assets/images/Search.svg'
import { ReactComponent as Clear } from '../assets/images/Clear.svg'


import sampledata from '../assets/sampledata/testdata'

export default function SearchBox({ location }) {

    const [input, setInput] = useState('')

    const redirectForSearch = (val) => {
        document.location.href = `/browse/${val}`
    }

    const handleSuggestionOrClear = (newValue) => {
        console.log("value is: " + newValue);
        if (newValue == null) {
            setInput('')
        } else {
            setInput(newValue); 
            window.analytics.track(`autocomplete_selected`, {searchValue: newValue});
            redirectForSearch(newValue); 
        }
    }

    const handleKeyDown = e => {
        if (e.key === 'Enter') {
            // redirect to browse page with search query as url param
            window.analytics.track(`searchbar_entered`, {searchValue: e.target.value});
            redirectForSearch(e.target.value);
        }
    }

    return (

        <div className='search-box'>
            <div className='search-box-content'>
                <div className='search-box-icon'>
                    <Search />
                </div>

                <Autocomplete
                    clearOnEscape
                    clearOnBlur
                    clearIcon={<Clear/>}
                    disablePortal
                    freeSolo
                    fullWidth
                    handleHomeEndKeys
                    inputValue={input}
                    onInputChange={e => setInput(e.target.value || "")}
                    onChange={(_, newValue) => handleSuggestionOrClear(newValue)}
                    onKeyDown={e => handleKeyDown(e)}
                    options={sampledata.map((option) => option.title)}
                    renderInput={(params) =>                 
                        <TextField 
                            {...params}
                            autoFocus={location === 'search-modal' ? false : true}
                            className='search-box-input'  
                            placeholder='Search'
                            type='text'
                        />
                    }
                />
            </div>
        </div>
    )
}