import React from 'react';
import {mount} from 'enzyme';
import Hotels, {Alert, HotelItemsWrapper} from "./Hotels";
import {BrowserRouter} from "react-router-dom";
import HotelItem, {Title} from "./HotelItem";

/**
 * Integration testing with Enzyme
 */

let useContextMock;

// 테스트 전처리
beforeEach(() => {
	useContextMock = React.useContext = jest.fn();
});

// 테스트 후처리
afterEach(() => {
	useContextMock.mockReset();
});

describe('the <Hotels/> component', () => {
	// context getHotelsRequest 호출 여부 테스트
	it('should handle the first mount', () => {
		const mockContext = {
			loading: true,
			error: '',
			hotels: [],
			getHotelsRequest: jest.fn(),
		};
		useContextMock.mockReturnValue(mockContext);
		const wrapper = mount(<Hotels/>);
		expect(mockContext.getHotelsRequest).toHaveBeenCalled();
		expect(wrapper.find(Alert).text()).toBe('Loading...');
	});

	// 호텔 목록의 이름과 context 내 데이터의 이름과 일치하는지 확인
	it('should render the list of hotels', () => {
		const mockContext = {
			loading: false,
			error: '',
			hotels: [{ id: 123, title: 'Test Hotel', thumbnail: 'test.jpg' }],
			getHotelsRequest: jest.fn(),
		};
		useContextMock.mockReturnValue(mockContext);
		// const wrapper = mount(<Hotels/>); // todo enzyme은 Link를 렌더링 하지 못한다. BrowserRouter로 감싸줘야 함
		const wrapper = mount(<BrowserRouter><Hotels/></BrowserRouter>)
		expect(wrapper.find(HotelItemsWrapper).exists()).toBe(true);
		expect(wrapper.find(HotelItem).exists()).toBe(true);
		wrapper.find(HotelItem).forEach((hotelItem, idx) => {
			expect(hotelItem.find(Title).text()).toBe(mockContext.hotels[idx].title);
		})
	});
});