import React from 'react';
import { InputField } from '../';
//This wait interval would trigger the onChange when the user has stopped typing for half a second.
const WAIT_INTERVAL = 500;
//timeout to handle search, geocoder search would only trigger when the user stops typing for WAIT_INTERVAL.
let timeout = 0;
    
export const handleChange = (event,onChangeMethod ) => {
    const { name, value } = event.target;
    if(timeout) clearTimeout(timeout);

    timeout = setTimeout(() => {
        onChangeMethod(name, value);
    }, WAIT_INTERVAL);
}

const SearchField = ({ name, ariaDesc, placeholder, label, onChange }) => {
    return (
        <InputField 
            name={name}
            onChange={(e) => handleChange(e, onChange)}
            ariaDescribedBy={ariaDesc}
            placeholder= {placeholder}
            label={label}
        />
    );
}

export default SearchField;

