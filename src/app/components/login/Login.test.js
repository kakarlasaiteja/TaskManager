import { render, screen } from '@testing-library/react';
import { shallow } from 'enzyme';
import Login from './Login';

it("should enter username", () => {
    let wrapper = shallow(<Login/>);
    let idField = wrapper.find(".text")
    idField.simulate('change', {target: {name: 'id', value: 'user1'}})
    expect(wrapper.props.idField).toEqual('user1')
})