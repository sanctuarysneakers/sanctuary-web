import React, {useEffect, useState, useRef} from 'react'
import { useDispatch } from 'react-redux'

import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';


export default function BrowseFilterMultiCheckbox({ options, title, updateAction, showMoreOption = false, allowMulti = true }) {

    const dispatch = useDispatch()

    const selectedRef = useRef([]);  
    const [showMore, setShowMore] = useState(showMoreOption)

    const onCheckboxChange = (event) =>  {
        let newSelected

        if(allowMulti) {
            if (event.target.checked && !selectedRef.current.includes(event.target.value)) {
                newSelected = [...selectedRef.current, event.target.value]
            }  else { 
                newSelected = selectedRef.current.filter(e => e !== event.target.value)
            }
        } else {
            newSelected = event.target.value 
        }
      
        selectedRef.current = newSelected
        console.log(selectedRef.current)
        dispatch(updateAction(selectedRef.current)) 
    }

    const onShowMoreClick = () => { 
        if(showMore) {
            setShowMore(false)
        } else {
            setShowMore(true)
        }
    }
    
    // const isChecked = (value) => {
    //     console.log('value is: ' + value)
    //     console.log('selectedref is: ' + selectedRef)
    //     return allowMulti ? selectedRef.current.includes(value) : value == selectedRef.current
    // }

    return (
        <Box sx={{ fontFamily: "Poppins, sans-serif" }}>
       
            <FormControl 
                sx={{ 
                    marginTop: 3,
                    marginBottom: 0
                }}
            >    
                <FormLabel                    
                    sx={{
                        color: "black",
                        fontWeight: 500,
                        fontSize: 18,
                        marginBottom: 2, 
                        '&.Mui-focused': {
                            color: "black",
                    }}}  
                > 
                    { title } 
                </FormLabel>
                <FormGroup>
                    {showMore && 
                        options.slice(0, 5).map(({value, label}, idx) => (
                            <FormControlLabel
                                className="checkboxLabel"
                                control={
                                    <Checkbox 
                                        className='checkbox'
                                        // checked={isChecked(value)}
                                        onChange={(event) => onCheckboxChange(event)} 
                                        sx={{
                                            color: "#DDE1E9",
                                            '&.Mui-checked': {
                                            color: "black",
                                        }}}  
                                        value={value}
                                    />
                                }
                                label={label}
                            />) 
                        ) 
                    }
                    {!showMore && 
                        options.map(({value, label}, idx) => (
                            <FormControlLabel
                                className="checkboxLabel"
                                control={
                                    <Checkbox 
                                        className='checkbox'
                                        // checked={isChecked(value)}
                                        onChange={(event) => onCheckboxChange(event)} 
                                        sx={{
                                            color: "#DDE1E9",
                                            '&.Mui-checked': {
                                            color: "black",
                                        }}}  
                                        value={value}
                                    />
                                }
                                label={label}
                            />) 
                        ) 
                    }
                </FormGroup>
            </FormControl>
            

            {showMoreOption && 
                <FormHelperText       
                    onClick={onShowMoreClick}             
                    sx={{
                        
                        color: "#777F93",
                        fontWeight: 500, 
                        marginBottom: 2, 
                        '&.Mui-focused': {
                            color: "black",
                        }}} 
                > 
                    { showMore ? "Show More" : "Show Less" } 
                </FormHelperText> 
            } 
        </Box> 
    )
}

