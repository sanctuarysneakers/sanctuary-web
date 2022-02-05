import React, { useState, useEffect } from 'react'
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import { styled } from "@mui/material/styles";
import TextField from '@mui/material/TextField';
import createRequestObject from './Hooks/createRequest'
import { ReactComponent as Search } from '../assets/images/Search.svg'
import { ReactComponent as Clear } from '../assets/images/Clear.svg'

const StyledAutocomplete = styled(Autocomplete)({
    "& .MuiAutocomplete-inputRoot": {
      color: "black",
      fontSize: 16,
      fontWeight: 400,
      fontFamily: 'Poppins',
      "& .MuiOutlinedInput-notchedOutline": {
        border: "none" 
      }
    },
});


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

            console.log("algolia response: " + JSON.stringify(results))

            if(results.hits) {
                const newOptions = results.hits.filter(shoe => shoe.grid_picture_url && !shoe.grid_picture_url.includes("missing")).map(({name, grid_picture_url}) => ({name, grid_picture_url}))
                setOptions(newOptions)
            }           
        }
    }

    const handleSuggestionOrClear = (newValue) => {
        if (newValue == null) {
            setInput('')
        } else {
            setInput(newValue.name); 
            window.analytics.track(`autocomplete_selected`, {searchValue: newValue.title});
            redirectForSearch(newValue.name); 
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

                <StyledAutocomplete
                    clearOnEscape
                    clearOnBlur
                    clearIcon={<Clear/>}
                    disablePortal={true}
                    freeSolo
                    fullWidth
                    getOptionLabel={(option) => option.name || ""}
                    handleHomeEndKeys
                    inputValue={input}
                    onInputChange={e => handleLetterInput(e.target.value)}
                    onChange={(_, newValue) => handleSuggestionOrClear(newValue)}
                    options={options}
                    PopperComponent={({ style, ...props }) => (
                        <Popper
                          {...props}
                          style={{ ...style, height: 0, zIndex: 1}} // width is passed in 'style' prop
                        />
                      )}
                    ListboxProps={{ style: { maxHeight: '30vh' } }}
                    renderInput={(params) =>                 
                        <TextField 
                            {...params}
                            autoFocus={location === 'search-modal' ? false : true} 
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
                        <Box component="li" 
                            sx={{ 
                                '& > img': { mr: 2, flexShrink: 0 },
                                '& > h4': {
                                    fontSize: 16, 
                                    fontWeight: 500, 
                                    fontFamily: 'Poppins', 
                                    color: 'black',
                                    letterSpacing: -0.28,
                                    margin: 0
                                }
                            }} 
                            {...props}
                            onFocus={(e) => console.log("focused!")}
                        >
                            <img
                                loading="lazy"
                                width="80"
                                src={option.grid_picture_url}
                                alt=""
                            />
                            <h4> {option.name} </h4> 
                        </Box>
                    )}
                />
            </div>
        </div>
    )
}