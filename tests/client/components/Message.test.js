import test from 'ava';
import React from 'react';
import { shallow } from 'enzyme';
import Message from '../../../client/components/Message';

test(`Given a Message
    When it renders
    then should have .message as class`, t => {
  const wrapper = shallow(<Message />);

  t.truthy(wrapper.find('.message').length);
});

test(`Given a Message with text prop
    When it renders
    then should have text as ✓ value`, t => {
  const wrapper = shallow(<Message text="foo" />);

  t.true(wrapper.find('.message').text() === '✓ foo');
});

test(`Given a Message with text and showError prop
    When it renders
    then should have text as ✗ value`, t => {
  const wrapper = shallow(<Message text="foo" showError />);

  t.true(wrapper.find('.message').text() === '✗ foo');
});
