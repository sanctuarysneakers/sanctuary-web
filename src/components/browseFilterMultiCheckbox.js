import React, {useEffect, useState} from 'react'
import { useDispatch } from 'react-redux'

import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';


export default function BrowseFilterMultiCheckbox({ options, title, updateAction, showMoreOption }) {

    const dispatch = useDispatch()

    const [selected, setSelected] = useState([]);  
    //const [checkboxes, setCheckboxes] = useState([])
    //const [showMore, setShowMore] = useState(true)

    // const optionsToCheckboxes = (givenOptions) => {

    //     let checkboxes = givenOptions.map(({value, label}) => (
    //         <FormControlLabel
    //             className="checkboxLabel"
    //             control={
    //                 <Checkbox 
    //                     onChange={onCheckboxChange} 
    //                     sx={{
    //                         color: "#EC3E26",
    //                         '&.Mui-checked': {
    //                           color: "#EC3E26",
    //                     }}}  
    //                     value={value}
    //                 />
    //             }
    //             label={label}
    //         />) 
    //     ) 

    //     setCheckboxes(checkboxes)
    // }

    const onCheckboxChange = (event) =>  {
        let newSelected
        if(event.target.checked) {
            newSelected = [...selected, event.target.value]
        }  else { 
            newSelected = selected.filter(e => e !== event.target.value)
        }

        setSelected(newSelected)
        dispatch(updateAction(newSelected)) 
    }

    // const onShowMoreClick = () => { 
    //     if(showMore) {
    //         //want to hide some
    //         optionsToCheckboxes(options.slice(0, 5))
    //         setShowMore(true)
    //     } else {
    //         //want to show all
    //         optionsToCheckboxes(options)
    //         setShowMore(false)
    //     }
    // }

    // useEffect(() => {
    //     if(showMoreOption) {
    //         //want to hide some
    //         optionsToCheckboxes(options.slice(0, 5))
    //     } else {
    //         //want to show all
    //         optionsToCheckboxes(options)
    //     }
    // })

    let checkboxes = options.map(({value, label}) => (
        <FormControlLabel
            className="checkboxLabel"
            control={
                <Checkbox 
                    onChange={onCheckboxChange} 
                    sx={{
                        color: "#EC3E26",
                        '&.Mui-checked': {
                          color: "#EC3E26",
                    }}}  
                    value={value}
                />
            }
            label={label}
        />) 
    ) 


    return (
        <Box sx={{ fontFamily: "Poppins, sans-serif" }}>
            <FormControl 
                sx={{ 
                    marginTop: 0,
                    marginBottom: 4
                }}
            >    
                <FormLabel                    
                    sx={{
                        color: "black",
                        fontWeight: 550, 
                        marginBottom: 1, 
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

            {/* {showMoreOption && 
                <FormHelperText       
                    onClick={onShowMoreClick}             
                    sx={{
                        
                        color: "black",
                        fontWeight: 550, 
                        marginBottom: 1, 
                        '&.Mui-focused': {
                            color: "black",
                        }}} 
                > 
                    { showMore ? "Show More" : "Show Less" } 
                </FormHelperText> 
            }  */}
        </Box> 
    )
}

