import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

import {ReactComponent as DownArrow} from '../assets/images/arrowDown.svg'

export default function BrowseFilterDropdown({ options, placeholder, updateAction }) {

    const dispatch = useDispatch()
    const [selection, setSelection] = useState(null)

    const onChange = (selection) =>  {
        setSelection(selection)

        
        dispatch(updateAction(selection.value))
    }
    
    return (
        <div className='filter-dropdown'> 
            <Dropdown 
                arrowClosed={<DownArrow />}
                arrowOpen={<DownArrow />}
                controlClassName='filter-dropdown-control' 
                menuClassName='filter-dropdown-menu'
                onChange={onChange} 
                options={options} 
                placeholder={placeholder}               
                value={selection && selection.value ?  `${placeholder}: ${selection.label}` : placeholder } 
            />
        </div>
    )
}

