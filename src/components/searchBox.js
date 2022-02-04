import React, { useState, useEffect } from 'react'
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import createRequestObject from './Hooks/createRequest'
import { ReactComponent as Search } from '../assets/images/Search.svg'
import { ReactComponent as Clear } from '../assets/images/Clear.svg'


export default function SearchBox({ location }) {

    const [input, setInput] = useState('')
    const [options, setOptions] = useState([])

    const defaultTrending = []

    useEffect(() => {
        setOptions(defaultTrending);
    }, [])

    const redirectForSearch = (val) => {
        document.location.href = `/browse/${val}`
    }

    const handleLetterInput = async (val) => {
        if (val == null || val == "") {
            setInput('')
            setOptions([]);
        } else {
            setInput(val)
            
            //make api call and update options
            const request = createRequestObject('autocomplete', {search: val})
            const response = await fetch(request.url, request.headers)
            let results = await response.json()

            if(results.hits) {
                const newOptions = results.hits.map(({title, brand, colorway, media}) => ({title, brand, colorway, media}))
                setOptions(newOptions)
            }           
        }
    }

    const handleSuggestionOrClear = (newValue) => {
        if (newValue == null) {
            setInput('')
        } else {
            setInput(newValue.title); 
            window.analytics.track(`autocomplete_selected`, {searchValue: newValue.title});
            redirectForSearch(newValue.title); 
        }
    }

    const handleEnterPressed = (newValue) => {
        window.analytics.track(`searchbar_entered`, {searchValue: newValue});
        redirectForSearch(newValue);
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
                    getOptionLabel={(option) => option.title || ""}
                    handleHomeEndKeys
                    inputValue={input}
                    onInputChange={e => handleLetterInput(e.target.value)}
                    onChange={(_, newValue) => handleSuggestionOrClear(newValue)}
                    options={options}
                    renderInput={(params) =>                 
                        <TextField 
                            {...params}
                            autoFocus={location === 'search-modal' ? false : true}
                            className='search-box-input'  
                            inputProps={{
                                ...params.inputProps,
                                onKeyDown: (e) => {
                                      if (e.key === 'Enter') {
                                        e.stopPropagation();
                                        handleEnterPressed(e.target.value); 
                                      }
                                },
                              }}
                            placeholder='Search'
                            type='text'
                        />
                    }
                    renderOption={(props, option) => (
                        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                          <img
                            loading="lazy"
                            width="80"
                            src={option.media.thumbUrl}
                            alt=""
                          />
                          {option.title}
                        </Box>
                    )}
                />
            </div>
        </div>
    )
}