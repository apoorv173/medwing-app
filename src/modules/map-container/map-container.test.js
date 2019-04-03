import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import MapContainer from './map-container';

let markers = [{setIcon: ''}];
it('Should render all the dom elements', () => {
	
    const map = {
        addListener: jest.fn()
    };
	const mapContainer = shallow(<MapContainer map={map} />
	);
    expect(mapContainer.find('MarkerList').length).toEqual(1);
    expect(mapContainer.find('AddMarkerForm').length).toEqual(1);
    expect(mapContainer.find('.error').length).toEqual(0);
    mapContainer.setState({errorMsg: true});
    expect(mapContainer.find('.error').length).toEqual(1);

});
