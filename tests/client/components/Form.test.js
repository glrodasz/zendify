import test from 'ava';
import sinon from 'sinon';
import React from 'react';
import { mount } from 'enzyme';
import Form from '../../../client/components/Form';

test(`Given a Form
    When it renders
    Then should have .form as class`, t => {
  const wrapper = mount(<Form />);

  t.truthy(wrapper.find('.form').length);
});

test(`Given a Form
    When it updates with isFulfilled prop
    Then should call the reset`, t => {
  const handleReset = sinon.spy();
  const wrapper = mount(<Form reset={handleReset} />);

  wrapper.setProps({ isFulfilled: true });

  t.true(handleReset.called);
});

test(`Given a Form with isLoading prop
    When it renders
    Then should have .form--loading class`, t => {
  const wrapper = mount(<Form isLoading />);

  t.truthy(wrapper.find('.form--loading').length);
});

test.skip(`Given a Form
    When it submit
    Then should call the handleSubmit`, t => {
  const handleSubmit = sinon.spy();
  const wrapper = mount(<Form submit={handleSubmit} />);

  wrapper.find('[ref="name"]')
    .simulate('change', { target: { value: 'foo' } });
  wrapper.find('[ref="email"]')
    .simulate('change', { target: { value: 'foo@bar.com' } });
  wrapper.find('[ref="subject"]')
    .simulate('change', { target: { value: 'bar' } });
  wrapper.find('[ref="message"]')
    .simulate('change', { target: { value: 'foobar' } });

  wrapper.find('.form').simulate('submit');

  t.true(handleSubmit.called);
});
