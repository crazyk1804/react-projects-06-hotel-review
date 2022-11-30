import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import SubHeader, {SubHeaderButton, Title} from "./SubHeader";
import {shallow} from "enzyme";

// 서브헤더 렌더 테스트(스냅샷 생성)
describe('the <SubHeader/> component', () => {
	it('should render', () => {
		const renderer = new ShallowRenderer();
		renderer.render(<SubHeader/>);
		const component = renderer.getRenderOutput();

		expect(component).toMatchSnapshot();
	})
});

// 렌더러 광역변수(...)로 분리해서 2개의 테스트에 사용
describe('the <Subheader/> component', () => {
	const renderer = new ShallowRenderer();

	it('should render', () => {
		renderer.render(<SubHeader/>);
		const component = renderer.getRenderOutput();
		expect(component).toMatchSnapshot();
	});

	// 스냅샷 생성 이후 title 값을 변경하면 오류 발생 (기존 스냅샷과 달라지므로)
	it('should render with a dynamic title', () => {
		renderer.render(<SubHeader title="Test Application Version 2"/>);
		const component = renderer.getRenderOutput();
		expect(component).toMatchSnapshot();
	});
});

// 딱히 의미 없는
describe('the <Subheader/> component', () => {
	const renderer = new ShallowRenderer();

	it('should render with a goback button', () => {
		renderer.render(<SubHeader goBack={() => {}}/>);
		const component = renderer.getRenderOutput();
		expect(component).toMatchSnapshot();
	});

	it('should render with a form button', () => {
		renderer.render(<SubHeader openForm={() => {}}/>);
		const result = renderer.getRenderOutput();
		expect(result).toMatchSnapshot();
	})
})

// enzyme의 shallow를 사용한 테스트
describe('the <SubHeader/> component with the enzyme shallow', () => {
	// 문법이 간소화 됨
	it('should render', () => {
		const component = shallow(<SubHeader/>);
		expect(component).toMatchSnapshot();
	});

	it('should render with a goback button', () => {
		const component = shallow(<SubHeader goBack={() => {}}/>);
		expect(component).toMatchSnapshot();
	});

	it('should render with a from button', () => {
		const component = shallow(<SubHeader openForm={() => {}}/>);
		expect(component).toMatchSnapshot();
	});

	// 클래스 혹은 컴포넌트를 사용해서 element를 찾을 수 있다
	it('should render with a dynamic title', () => {
		const title = 'Test Application';
		const component = shallow(<SubHeader title={title}/>);
		expect(component.find(Title).text()).toEqual(title);
	});

	// simulate로 클릭질 가능
	it('should render with a goback button and handle the onClick event', () => {
		const mockGoBack = jest.fn();
		const component = shallow(<SubHeader goBack={mockGoBack}/>);
		const goBackButton = component.find(SubHeaderButton);
		expect(goBackButton.exists()).toBe(true);

		goBackButton.simulate('click');
		expect(mockGoBack).toHaveBeenCalled();
	});

	// element 여러개 찾을 시 at을 사용하거나 처리가 동일하면 forEach 하던가
	it('should render with a button and handle the onClick events', () => {
		const mockGoBack = jest.fn();
		const mockOpenForm = jest.fn();
		const component = shallow(<SubHeader goBack={mockGoBack} openForm={mockOpenForm}/>);

		component.find(SubHeaderButton).forEach(x => {
			console.log('x:', x.text());
			expect(x.exists()).toBe(true);
			x.simulate('click');
		});
		expect(mockGoBack).toHaveBeenCalled();
		expect(mockOpenForm).toHaveBeenCalled();
	});
});