import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import AddMarkerForm from './add-marker-form';


it('Input onchange event', () => {

    const event = {
		preventDefault:() => {},
		target: {
			name:'searchBox',
			value:''
		}
    }

	const onSubmitFn = jest.fn();
	const positionObj = {
        formatted_address: ''
    };
    
    
	const markerForm = shallow(<AddMarkerForm
            formInEditMode={true}
            onSubmit={onSubmitFn(event)}
            mapObjToEdit={positionObj}
        />
	);
    expect(markerForm.find('form').length).toEqual(1);
    expect(markerForm.find('SearchField').length).toEqual(1);
    expect(markerForm.find('button').length).toEqual(1);

	markerForm.find('form').simulate('submit', event);
    expect(onSubmitFn).toHaveBeenCalled();
});

it('renders correctly', () => {
    const positionObj = {
        formatted_address: ''
    };
  const tree = renderer
    .create(<AddMarkerForm
        formInEditMode={true}
        mapObjToEdit={positionObj}
    />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});