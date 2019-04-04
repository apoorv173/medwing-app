import React, { Fragment, useState, useEffect } from 'react';
import { AddMarkerForm, MarkerList } from '..';

const editIcon = 'http://maps.google.com/mapfiles/ms/icons/blue-pushpin.png';
let markers = [];

const MapContainer = ({ googleMaps }) => {
    
    const [displayForm, setDisplayForm] = useState(false);
    const [formInEditMode, setFormInEditMode] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);
    const [indexToEdit, setIndexToEdit] = useState(null);
    const [positionObj, setPositionObj] = useState(null);
    const [positionArr, setPositionArr] = useState([]);

    useEffect(() => {
        const mapListener = googleMaps.addListener('click', (event) => { addMarker(event.latLng);});
        return () => new window.google.maps.event.removeListener(mapListener);
    });

    const addMarker = (location) => {
        const marker = new window.google.maps.Marker({
            map: googleMaps,
            position: location
        });

        const callback = function(results) {
            setDisplayForm(false);
            setPositionArr([...positionArr, results[0]]);
            markers.push(marker);
            setMarkers(googleMaps);
        };
        getGeoCode({'location': location}, callback);
    }

    
    const onLocationSearch = (location) => {
        const callback = function(results) {
            setPositionObj(results[0]);
        };
        getGeoCode({ 'address': location}, callback);
    }

    const getGeoCode = (location, callback) => {
        const geocoder = new window.google.maps.Geocoder();
        
        geocoder.geocode(location , function(results, status) {
            if (status === 'OK') {
                callback(results);
            } else {
                setErrorMsg('0 results found, please change the search parameter or try again later.');
            }
        });
    }

    const setMarkers = (map) => {
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(map);
        }
    }

    const toggleForm = () => {

        setDisplayForm(!displayForm);
        setFormInEditMode(false);
        setErrorMsg(null);
        if(!isNaN(indexToEdit) && markers[indexToEdit]) {
            markers[indexToEdit].setIcon(null);
        }
    }

    const removeMarker = (index) => {
        if (markers[index]) {
            markers[index].setMap(null);
            markers = [...markers.slice(0, index), ...markers.slice(index + 1)];
        }
    }
    const onRemove = (index) => {
        removeMarker(index);
        setPositionArr([...positionArr.slice(0, index), ...positionArr.slice(index + 1)]);
    }

    const onEdit = (index, obj) => {
        if(markers[index]) {
            markers[index].setIcon(editIcon);
            setFormInEditMode(true);
            setDisplayForm(true);
            setPositionObj(obj);
            setIndexToEdit(index);
        }
    }

    const handleSubmit = () => {
        const marker = new window.google.maps.Marker({
            map: googleMaps,
            position: positionObj.geometry.location,
        });
        if(positionObj) {
            if(!isNaN(indexToEdit) && formInEditMode) {
                markers[indexToEdit].setMap(null);
                markers = [...markers.slice(0, indexToEdit), marker, ...markers.slice(indexToEdit + 1)];
                setFormInEditMode(false);
                setPositionArr([...positionArr.slice(0, indexToEdit), positionObj, ...positionArr.slice(indexToEdit+1)]);
            }
            else {
                markers.push(marker);
                setPositionArr([...positionArr, positionObj]);
            }
            setErrorMsg(null);
            setDisplayForm(false);
            setMarkers(googleMaps);
        }
    }

    const renderError = (msg = 'Please enter some value in the field') => {
        return (
            <p className="error">
                {msg}
            </p>
        );
    }

    return (
        <div className="form-container col col-xs-12 col-sm-6">
            <Fragment>
                <div className={`slider ${displayForm ? '' : 'closed'}`}>
                    {errorMsg && renderError(errorMsg)}
                    <AddMarkerForm
                        onSubmit={handleSubmit}
                        onSearch={onLocationSearch}
                        formInEditMode={formInEditMode}
                        mapObjToEdit={positionObj}
                    />
                </div>
                {!displayForm && 
                    <small>
                        Please click on the button below or select location on map to add markers.
                    </small>
                }
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={toggleForm}
                >
                    {displayForm ? 'Cancel' : 'Add location'}
                </button>
                <hr />
            </Fragment>
            <MarkerList
                positionArr={positionArr}
                onEditMarker={onEdit}
                onRemoveMarker={onRemove}
                formInEditMode={formInEditMode}
            />
        </div>
    );
}

export default MapContainer;
