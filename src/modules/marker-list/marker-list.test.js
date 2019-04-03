import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import MarkerList from './marker-list';

const positionArr = [{
    formatted_address: '',
    geometry: {
        location: {
            lat: () =>jest.fn(),
            lng: () =>jest.fn()
        }
    },
}];

it('Should render all the dom elements', () => {
	const onEdit = jest.fn();

    const onRemove = jest.fn();

	const markerList = shallow(<MarkerList
        positionArr={positionArr}
        onEditMarker={onEdit}
        onRemoveMarker={onRemove}
        formInEditMode={false}
    />
	);
    expect(markerList.find('h3').length).toEqual(1);
    expect(markerList.find('p').length).toEqual(3);
    expect(markerList.find('span').length).toEqual(4);
    expect(markerList.find('button').length).toEqual(2);
    expect(markerList.find('.content-wrapper').length).toEqual(1);
    expect(markerList.find('.col-xs-12').length).toEqual(1);

    markerList.setProps({formInEditMode: true});
    expect(markerList.find('button').length).toEqual(0);
});

it('should trigger the onEdit and onRemove method on button click', () => {
    const onEdit = jest.fn();

    const onRemove = jest.fn();

	const markerList = shallow(<MarkerList
        positionArr={positionArr}
        onEditMarker={onEdit}
        onRemoveMarker={onRemove}
        formInEditMode={false}
    />
    );
    markerList.find('.btn-primary').simulate('click');
    expect(onEdit).toHaveBeenCalled();

    markerList.find('.btn-secondary').simulate('click');
    expect(onRemove).toHaveBeenCalled();    
});

it('renders correctly', () => {
    const positionObj = {
        formatted_address: ''
    };
    const onEdit = jest.fn();

    const onRemove = jest.fn();

  const tree = renderer
    .create(<MarkerList
        positionArr={positionArr}
        onEditMarker={onEdit}
        onRemoveMarker={onRemove}
        formInEditMode={false}
    />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});