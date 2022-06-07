import React, {useEffect, useState, useRef} from 'react'
import { useDispatch } from 'react-redux'

import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';


export default function BrowseFilterMultiCheckbox({ options, title, updateAction, showMoreOption = false }) {

    const dispatch = useDispatch()

    const selectedRef = useRef([]);  
    const [showMore, setShowMore] = useState(showMoreOption)
    const [checkboxes, setCheckboxes] = useState([])

    const onCheckboxChange = (event) =>  {
        let newSelected

        if (event.target.checked && !selectedRef.current.includes(event.target.value)) {
            newSelected = [...selectedRef.current, event.target.value]
        }  else { 
            newSelected = selectedRef.current.filter(e => e !== event.target.value)
        }

        selectedRef.current = newSelected
        console.log(selectedRef.current)
        // dispatch(updateAction(selectedRef.current)) 
    }

    const onShowMoreClick = () => { 
        if(showMore) {
            setShowMore(false)
        } else {
            setShowMore(true)
        }
    }

    useEffect(() => {
        let displayedOptions
        if(showMore) {
            //want to hide some
            displayedOptions = options.slice(0, 5)
        } else {
            //want to show all
            displayedOptions = options 
        }

        let temp = selectedRef.current 
        selectedRef.current.forEach(selectedVal => {
            let currentlyVisible = false

            displayedOptions.forEach(option => {
                if(option.value === selectedVal) {
                    currentlyVisible = true
                }
            }) 

            if(!currentlyVisible) { 
                temp = temp.filter(e => e !== selectedVal)
            }
        })

        selectedRef.current = temp

        let checkboxes = displayedOptions.map(({value, label}) => (
            <FormControlLabel
                className="checkboxLabel"
                control={
                    <Checkbox 
                        className='checkbox'
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

        setCheckboxes(checkboxes)
    // eslint-disable-next-line
    }, [showMore])

    return (
        <Box sx={{ fontFamily: "Poppins, sans-serif" }}>
            {checkboxes && 
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
                        {checkboxes}
                    </FormGroup>
                </FormControl>
            }  

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

