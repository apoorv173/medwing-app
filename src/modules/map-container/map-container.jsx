import React, { Component, Fragment } from 'react';
import { AddMarkerForm, MarkerList } from '..';

let markers = [];
const editIcon = 'http://maps.google.com/mapfiles/ms/icons/blue-pushpin.png';

class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.getGeoCode = this.getGeoCode.bind(this);
        this.state = {
            positionArr: [],
            displayForm: false,
            formInEditMode: false,
            errorMsg: null
        }
    }

    componentDidMount() {
        const { map } = this.props;
        map.addListener('click', (event) => {
            this.addMarker(event.latLng);
        });
    }

    onLocationSearch = (location) => {
        const callback = (function(results) {
            this.setState({positionObj: results[0]});
        }).bind(this);
        this.getGeoCode({ 'address': location}, callback);
    }

    getGeoCode(location, callback) {
        const that = this;
        const geocoder = new window.google.maps.Geocoder();
        
        geocoder.geocode(location , function(results, status) {
            if (status === 'OK') {
                callback(results);
            } else {
                that.setState({
                    errorMsg: '0 results found, please change the search parameter or try again later.'
                });
            }
        });
    }

    setMarkers(map) {
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(map);
        }
    }

    addMarker(location) {
        const { positionArr } = this.state;
        const { map } = this.props;
        const marker = new window.google.maps.Marker({
            map: map,
            position: location
        });

        const callback = (function(results) {
            this.setState({
                positionObj: results[0],
                positionArr: [...positionArr, results[0]],
                displayForm: false,
            });
        }).bind(this);

        this.getGeoCode({'location': location}, callback);
        markers.push(marker);
        this.setMarkers(map);
    }

    toggleForm = () => {
        const { indexToEdit } = this.state;
        this.setState({
            displayForm: !this.state.displayForm,
            formInEditMode: false,
            errorMsg: null
        });
        if(!isNaN(indexToEdit)) {
            markers[indexToEdit].setIcon(null);
        }
    }

    removeMarker(index) {
        markers[index].setMap(null);
        markers = [...markers.slice(0, index), ...markers.slice(index + 1)];
    }
    onRemove = (index) => {
        const { positionArr } = this.state;
        this.removeMarker(index);
        this.setState({
            positionArr: [...positionArr.slice(0, index), ...positionArr.slice(index + 1)],
        });
    }

    onEdit = (index, positionObj) => {
        if(markers[index]) {
            markers[index].setIcon(editIcon);
            this.setState({
                formInEditMode: true,
                displayForm: true,
                positionObj: positionObj,
                indexToEdit: index
            });
        }
    }

    handleSubmit = () => {
        const { map } = this.props;
        const { positionObj, positionArr, indexToEdit, formInEditMode } = this.state;
        const marker = new window.google.maps.Marker({
            map: map,
            position: positionObj.geometry.location,
        });

        if(positionObj) {
            if(!isNaN(indexToEdit) && formInEditMode) {
                markers[indexToEdit].setMap(null);
                markers = [...markers.slice(0, indexToEdit), marker, ...markers.slice(indexToEdit + 1)];
                this.setState({
                    positionArr: [...positionArr.slice(0, indexToEdit), positionObj, ...positionArr.slice(indexToEdit+1)],
                    displayForm: false,
                    formInEditMode: false,
                    errorMsg: null,
                });
            }
            else {
                markers.push(marker);
                this.setState({
                    positionArr: [...positionArr, positionObj],
                    displayForm: false,
                    errorMsg: null
                });
            }
            this.setMarkers(map);
        }
    }

    renderError(msg = 'Please enter some value in the field') {
        return (
            <p className="error">
                {msg}
            </p>
        );
    }

    renderFormComponents() {
        const { displayForm, formInEditMode, positionObj, errorMsg } = this.state;
        return (
            <Fragment>
                <div className={`slider ${displayForm ? '' : 'closed'}`}>
                    {errorMsg && this.renderError(errorMsg)}
                    <AddMarkerForm
                        onSubmit={this.handleSubmit}
                        onSearch={this.onLocationSearch}
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
                    onClick={() => {this.toggleForm()}}
                >
                    {displayForm ? 'Cancel' : 'Add location'}
                </button>
                <hr />
            </Fragment>
        );
    }

    renderMarkerList() {
        const { positionArr, formInEditMode } = this.state;
        return (
            <MarkerList
                positionArr={positionArr}
                onEditMarker={this.onEdit}
                onRemoveMarker={this.onRemove}
                formInEditMode={formInEditMode}
            />
        );
    }

    render() {
        return (
            <div className="form-container col col-xs-12 col-sm-6">
                {this.renderFormComponents()}
                {this.renderMarkerList()}
            </div>
        );
    }
}

export default MapContainer;
