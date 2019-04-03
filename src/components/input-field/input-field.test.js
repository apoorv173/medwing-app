import React from 'react';
import { shallow } from 'enzyme';
import InputField from './input-field';
import renderer from 'react-test-renderer';

it('Input onchange event', () => {
	// Render a checkbox with label in the document
	const onChangeFn = jest.fn();
	
	const inputField = shallow(<InputField 
			name="search-input"
			onChange={onChangeFn}
			ariaDescribedBy="Enter location"
			placeholder= "Enter location"
			label="Enter location"
		/>
	);

	inputField.find('input').simulate('change', 'berlin');
	expect(onChangeFn.mock.calls.length).toEqual(1);
  expect(onChangeFn).toBeCalledWith('berlin');
});

it('renders correctly', () => {
  const tree = renderer
    .create(<InputField 
			name="search-input"
			ariaDescribedBy="Enter location"
			placeholder= "Enter location"
			label="Enter location"
		/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});