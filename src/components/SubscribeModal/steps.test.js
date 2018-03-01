import React from 'react';
import sinon from 'sinon';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Step1, Step2, Step3 } from './steps';

Enzyme.configure({ adapter: new Adapter() });

describe('SubscribeModal', () => {
  let component;

  describe('Step1', () => {
    beforeEach(() => component = shallow(<Step1 />));

    describe('rendering', () => {
      it('should render a subscribe button', () => {
        const button = component.find('button');
        expect(button.text()).toEqual('Subscribe today');
      });
    });
    describe('interaction', () => {
      describe('button', () => {
        it('should call props.onButtonClick', () => {
          const buttonClickSpy = sinon.spy();
          component.setProps({
            onButtonClick: buttonClickSpy
          })
          const button = component.find('button');
          button.simulate('click');
          expect(buttonClickSpy.callCount).toEqual(1);
        });
      });
    });
  });

  describe('Step2', () => {
    beforeEach(() => component = shallow(<Step2 />));
    describe('rendering', () => {
      it('should render a payment button', () => {
        const button = component.find('button');
        expect(button.text()).toEqual('Mock send payment');
      });
    });
    describe('interaction', () => {
      describe('button', () => {
        it('should call props.onButtonClick', () => {
          const buttonClickSpy = sinon.spy();
          component.setProps({
            onButtonClick: buttonClickSpy
          })
          const button = component.find('button');
          button.simulate('click');
          expect(buttonClickSpy.callCount).toEqual(1);
        });
      });
    });
  });

  // describe('Step3', () => { });
  
});
