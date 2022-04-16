import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateSize } from '../../redux/actions'
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import { styled } from "@mui/material/styles";
import TextField from '@mui/material/TextField';
import createRequestObject from '../../hooks/createRequest'
import { ReactComponent as Search } from '../../assets/images/Search.svg'
import { ReactComponent as Clear } from '../../assets/images/Clear.svg'

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

export default function SearchBox() {

    const [input, setInput] = useState('')
    const [options, setOptions] = useState([])

    const dispatch = useDispatch()
    const size = useSelector(state => state.item.size)

    const redirectForSearch = (val) => {
        document.location.href = `/browse/${val}`
    }

    const redirectForSelection = (selectedItem) => {
		if (size < 7 && selectedItem['single_gender'] === 'men')
			dispatch(updateSize(7))
		else if (size > 12 && selectedItem['single_gender'] === 'women')
			dispatch(updateSize(12))

        let itemId = encodeURIComponent(selectedItem['sku'].replace(/\s/g, '-'))
        let gender = selectedItem['single_gender']

        window.analytics.track(`home_carousel_item_clicked`, {id: itemId, gender: gender});
        document.location.href = `/item/${itemId}/${gender}`
    }

    const handleLetterInput = async (val) => {     
        if(val && val !== "") {
            //make api call and update options
            const request = createRequestObject('autocomplete', {search: val})
            const response = await fetch(request.url, request.headers)
            let results = await response.json()

            if(results.hits) {
                const newOptions = results.hits.filter(shoe => shoe.grid_picture_url && !shoe.grid_picture_url.includes("missing") && shoe.sku).map(({name, sku, grid_picture_url, single_gender}) => ({name, sku, grid_picture_url, single_gender}))
                setOptions(newOptions)
            }           
        }       
    }

    const handleChange = async (reason, val, event) => {
        if(reason === "createOption") {
            setInput(val)
            redirectForSearch(val); 
        } else if (reason === "selectOption") {
            redirectForSelection(val)
        }  else if (reason === "clear" || reason === "blur") {
            setInput('')
            setOptions([]);
        }
    }

    return (
        <div className='search-box'>
            <div className='search-box-content'>
                <div className='search-box-icon'>
                    <Search />
                </div>

                <StyledAutocomplete
                    clearIcon={<Clear/>}
                    disablePortal={true}
                    filterOptions={(options) => options}
                    freeSolo
                    fullWidth
                    getOptionLabel={(option) => option.name || ""}
                    handleHomeEndKeys
                    onChange={(event, value, reason) => {
                        handleChange(reason, value, event.currentTarget); 
                    }}
                    onInputChange={e => handleLetterInput(e.target.value)}
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
                            placeholder='Search'
                            type='text'
                        />
                    }
                    renderOption={(props, option) => (
                        <Box component="li" 
                            sx={{ 
                                '&': {
                                    height: 85
                                },
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
                        >
                            <img
                                width="80"
                                src={option.grid_picture_url}
                                alt=""
                            />
                            <h4> {option.name} </h4> 
                        </Box>
                    )}
                    value={input}
                />
            </div>
        </div>
    )
}