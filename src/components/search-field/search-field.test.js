import React from 'react';
import { shallow } from 'enzyme';
import SearchField, { handleChange } from './search-field';
import renderer from 'react-test-renderer';

const event = {
	preventDefault:() => {},
	target: {
		name:'searchBox',
		value:''
	}
};

it('Search onchange event', () => {
	const onChangeEvent = jest.fn(event);
	const searchField = shallow(<SearchField 
			name="searchBox"
			label="Enter location"
			aria-describedby="Search box"
			placeholder="Please enter the location to search"
			onChange={() => onChangeEvent()}
	/>
	);
	expect(searchField.find('InputField').length).toBe(1);

});

it('renders correctly', () => {
	const onChangeEvent = jest.fn();
  const tree = renderer
    .create(<SearchField 
				name="searchBox"
				label="Enter location"
				aria-describedby="Search box"
				placeholder="Please enter the location to search"
				onChange={onChangeEvent}
		/>
		)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('onChange method would be called if timeout exists', () => {
	const onChangeEvent = jest.fn();
	jest.useFakeTimers();
	handleChange(event, onChangeEvent);
	jest.runAllTimers();
	expect(onChangeEvent).toHaveBeenCalled();
	jest.useRealTimers();
});
