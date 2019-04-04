
import React from 'react';
// @flow
const MarkerList = ({ onEditMarker, onRemoveMarker,  positionArr, formInEditMode }) => {
    
    const renderMarkerText = (position) => {
        return (
            <div className="detail-section">
                <h3>{position.formatted_address}</h3>
                <hr />
                <p>{position.formatted_address}</p>
                <p>
                    <span>Latitude:</span>
                    <span>{position.geometry.location.lat()}</span>
                </p>
                <p>
                    <span>Longitude:</span>
                    <span>{position.geometry.location.lng()}</span>
                </p>
            </div>
        );
    }

    const renderButtonGrp = (index, position) => {
        return (
            <div className="btn-group">
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {onEditMarker(index, position)}}
                >
                    Edit
                </button>
                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {onRemoveMarker(index)}}
                >
                    Delete
                </button>
            </div>
        );
    }
    
    return (
        <ul className="markers-list">
            {positionArr.map((position, index) => {
                return (
                    <li key={index} className="col-xs-12 col-sm-6">
                        <div className="content-wrapper">
                            {renderMarkerText(position)}
                            {!formInEditMode && renderButtonGrp(index, position)}
                        </div>
                    </li>
                );
            })}
        </ul>
    )
}
  
export default MarkerList;
