import React, { Fragment, useState } from 'react';
import { SearchField } from '../../components/';

const AddMarkerForm = ({ formInEditMode, mapObjToEdit, onSearch, onSubmit }) => {

    let myFormRef;
    let heading = 'Add a new marker';
    //heading is updated if the form is in the edit mode with the formatted address of the previous marker.
    if(formInEditMode && mapObjToEdit) {
        heading = `Edit marker for ${mapObjToEdit.formatted_address}`;
    }
    //useState hook to set the value of the search box in the form.
    const [searchValue, setSearchValue] = useState('');

    //useState hook to show error, if user didn't enter any value
    const [error, setError ] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(searchValue && searchValue !== '') {
            onSubmit();
            myFormRef.reset();
            setError(false);
        }
        else {
            setError(true);
        }
    }

    const handleChange = (name, value) => {
        setSearchValue(value);
        if (onSearch) {
            onSearch(value);
        }
    }

    return (
        //We don't need a div wrapper for these element, components can directly be rendered in the parent node.
        <Fragment> 
            <strong>{heading}</strong>
            <hr />
            <form
                className="form-section"
                onSubmit={handleSubmit}
                ref={(el) => myFormRef = el}
            >
                <SearchField 
                    name="searchBox"
                    label="Enter location"
                    aria-describedby="Search box"
                    placeholder="Please enter the location to search"
                    onChange={handleChange}
                />

                {error && 
                    <p className="error">
                        Please enter some value in the field
                    </p>
                }
                <button
                    type="submit"
                    className="btn btn-secondary"
                >
                    {formInEditMode ? 'Edit marker' : 'Add marker'}
                </button>
            </form>
        </Fragment>
    );
  }
  
export default AddMarkerForm;

