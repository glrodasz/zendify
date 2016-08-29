import test from 'ava';
import sinon from 'sinon';
import React from 'react';
import { shallow } from 'enzyme';
import Button from '../../../client/components/Button';

test(`Given a Button
    When it renders
    Then should have .button as class`, t => {
  const wrapper = shallow(<Button text="foo" />);

  t.truthy(wrapper.find('.button').length);
});

test(`Given a Button with isLoading prop
    When it renders
    Then should have .spinner as class`, t => {
  const wrapper = shallow(<Button isLoading />);

  t.truthy(wrapper.find('.spinner').length);
});

test(`Given a Button with isSubmit prop
    When it renders
    Then should have 'submit' as type`, t => {
  const wrapper = shallow(<Button isSubmit />);

  t.true(wrapper.find('.button').prop('type') === 'submit');
});

test(`Given a Button
    When it clicks
    Then should call the handleClick`, t => {
  const handleClick = sinon.spy();
  const wrapper = shallow(<Button handleClick={handleClick} />);

  wrapper.find('.button').simulate('click');

  t.true(handleClick.called);
});
