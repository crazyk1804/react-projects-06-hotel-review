import React from 'react';
// import ShallowRenderer from 'react-test-renderer/shallow';
import {shallow} from 'enzyme';
import SubHeader, {SubHeaderButton, Title} from "./SubHeader";

describe('the <SubHeader/> component', () => {
	it('should render', () => {
		// renderer.render(<SubHeader/>);
		// const component = renderer.getRenderOutput();
		const component = shallow(<SubHeader/>);
		expect(component).toMatchSnapshot();
	});

	it('should render with a dynamic title', () => {
		// const component = shallow(<SubHeader title="Test Applicationcation"/>);
		// expect(component).toMatchSnapshot();

		const title = 'Test Application';
		const component = shallow(<SubHeader title={title}/>);
		expect(component.find(Title).text()).toEqual(title);
	});

	// it('should render with a goback button', () => {
	// 	const component = shallow(<SubHeader goBack={() => {}}/>);
	// 	expect(component).toMatchSnapshot();
	// });
	//
	// it('should render with a form button', () => {
	// 	const component = shallow(<SubHeader openForm={() => {}}/>);
	// 	expect(component).toMatchSnapshot();
	// });

	it('should render with buttons and handle the onClick events', () => {
		const mockGoBack = jest.fn();
		const mockOpenForm = jest.fn();
		const component = shallow(<SubHeader goBack={mockGoBack} openForm={mockOpenForm}/>);

		const goBackButton = component.find(SubHeaderButton).at(0);
		expect(goBackButton.exists()).toBe(true);

		goBackButton.simulate('click');
		expect(mockGoBack).toHaveBeenCalled();

		const openFormButton = component.find(SubHeaderButton).at(1);
		expect(openFormButton.exists()).toBe(true);

		openFormButton.simulate('click');
		expect(mockOpenForm).toHaveBeenCalled();
	})
});