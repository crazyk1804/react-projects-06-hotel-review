import React from 'react';
// import ShallowRenderer from 'react-test-renderer/shallow';
import Button from "./Button";
import {shallow} from "enzyme";

describe('the <Button/> component', () => {
	// const renderer = new ShallowRenderer();


	// it('should render', () => {
	// 	const children = 'This is a button';
	// 	renderer.render(<Button>{ children}</Button>);
	// 	const result = renderer.getRenderOutput();
	//
	// 	expect(result).toMatchSnapshot();
	// });
	//
	it('should render the correct children', () => {
		const children = 'This is a button';
		// renderer.render(<Button>{children}</Button>);
		// const component = renderer.getRenderOutput();
		const component = shallow(<Button>{children}</Button>);
		expect(component.props().children).toEqual(children);
	});

	it('should handle the onClick event', () => {
		const mockOnClick = jest.fn();
		const component = shallow(<Button onClick={mockOnClick}/>);

		component.simulate('click');
		expect(mockOnClick).toHaveBeenCalled();
	})
})