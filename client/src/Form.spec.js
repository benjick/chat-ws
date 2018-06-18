import React from 'react';
import {mount} from 'enzyme';
import Form from './Form';

describe('Form', () => {
  it('should call the sendMessage function on submit', () => {
    const cb = jest.fn();
    const component = mount(<Form sendMessage={cb} />);
    component
      .find('.qa-name')
      .simulate('change', {target: {value: 'Max Malm'}});
    component
      .find('.qa-message')
      .simulate('change', {target: {value: 'Hello mina vänner'}});
    component.find('form').simulate('submit');
    expect(cb.mock.calls.length).toBe(1);
    expect(cb.mock.calls[0][0]).toBe('Max Malm');
    expect(cb.mock.calls[0][1]).toBe('Hello mina vänner');
  });
});
