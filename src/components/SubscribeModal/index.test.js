import React from 'react';
import sinon from 'sinon';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { SubscribeModal } from './index';
import Modal from '../Modal';
import Loading from '../Loading';
import { Step1, Step2, Step3 } from './steps';

Enzyme.configure({ adapter: new Adapter() });
const mockProps = {
  onCloseModal: () => {},
  onSubmitPayment: () => {},
  promiseLoading: false,
  promiseSuccess: false,
  promiseError: false
};

describe('SubscribeModal', () => {
  let component;

  beforeEach(() => {
    component = shallow(<SubscribeModal {...mockProps} />);
  });

  describe('methods', () => {

    describe('handleOnClose', () => {
      it('should set correct state', () => {
        component.setState({ step: 1 });
        expect(component.state()).toEqual({ modalIsOpen: true, step: 1 });
        component.instance().handleOnClose();
        expect(component.state()).toEqual({ modalIsOpen: false, step: 1 });
      });

      it('should call props.onCloseModal', () => {
        const closeModalSpy = sinon.spy();
        component.setProps({
          onCloseModal: closeModalSpy
        });
        component.instance().handleOnClose();
        expect(closeModalSpy.callCount).toEqual(1);
      });
    });

    describe('handleStepChange', () => {
      it('should set change step state', () => {
        component.setState({ step: 1 });
        expect(component.state().step).toEqual(1);
        component.instance().handleStepChange();
        expect(component.state().step).toEqual(2);
        component.instance().handleStepChange();
        expect(component.state().step).toEqual(3);
      });
    });

    describe('handlePayment', () => {
      it('should call props.onSubmitPayment', () => {
        const submitPaymentSpy = sinon.spy();
        component.setProps({
          onSubmitPayment: submitPaymentSpy
        });
        component.instance().handlePayment();
        expect(submitPaymentSpy.callCount).toEqual(1);
      });
      it('should call handleStepChange', () => {
        const handleStepChangeSpy = sinon.spy();
        component.instance().handleStepChange = handleStepChangeSpy;
        component.instance().handlePayment();
        expect(handleStepChangeSpy.callCount).toEqual(1);
      });
    });

  });
  
  describe('rendering', () => {

    it('should render with the correct initial state', () => {
      const component = shallow(<SubscribeModal {...mockProps} />);
      const expected = {
        modalIsOpen: true,
        step: 1
      };
      expect(component.state()).toEqual(expected);
    });

    it('should render a Modal component with correct props', () => {
      const component = shallow(<SubscribeModal {...mockProps} />);
      expect(component.find(Modal).length).toEqual(1);
      expect(component.prop('isOpen')).toEqual(true);
    });

    describe('steps', () => {

      describe('when step = 1', () => {
        it('should render Step1 with correct props', () => {
          const actual = component.containsMatchingElement(
            <Step1 onButtonClick={component.instance().handlePayment} />
          );
          expect(actual).toEqual(true);
        });
      });

      describe('when step = 2', () => {
        it('should render Step1 with correct props', () => {
          component.setState({ step: 2 });
          const actual = component.containsMatchingElement(
            <Step2 onButtonClick={component.instance().handlePayment} />
          );
          expect(actual).toEqual(true);
        });
      });

      describe('when step = 3 and promiseSuccess', () => {
        it('should render Step3', () => {
          component.setState({ step: 3 });
          component.setProps({ promiseSuccess: true });
          const actual = component.containsMatchingElement(
            <Step3 />
          );
          expect(actual).toEqual(true);
        });
      });
    });

    describe('promise', () => {

      describe('promiseLoading', () => {
        it('should render Loading component', () => {
          component.setProps({ promiseLoading: true });
          expect(component.find(Loading).length).toEqual(1);
        });

      });

      describe('promiseError', () => {
        it('should render an error message', () => {
          component.setProps({ promiseError: true });
          const actual = component.containsMatchingElement(
            <p className="form-error">Sorry, something has gone wrong :(</p>
          );
          expect(actual).toEqual(true);
        });
      });
    });
  });

});
