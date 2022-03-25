import React, {useState} from 'react'
import { useDispatch } from 'react-redux'

import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';


export default function BrowseFilterMultiCheckbox({ options, title, updateAction }) {

    const dispatch = useDispatch()
    const [selected, setSelected] = useState([]);  

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

    const checkboxes = options.map(({value, label}) => (
        <FormControlLabel
            control={
                <Checkbox onChange={onCheckboxChange} value={value}/>
            }
            label={label}
        />) 
    ) 

    return (
        <Box sx={{ display: 'flex' }}>
            <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
                <FormLabel component="legend"> { title } </FormLabel>
                <FormGroup >
                    {checkboxes}
                </FormGroup>
            </FormControl>
        </Box> 
    )
}

