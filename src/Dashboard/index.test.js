import React from 'react';
import sinon from 'sinon';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Dashboard } from './index';
import { EXCHANGES_MAP } from '../constants';
import IntegrationsCount from '../components/IntegrationsCount';

Enzyme.configure({ adapter: new Adapter() });

const mockProps = {
  user: {
    username: 'bill123',
    keys: []
  },
  onShowSubSubscriptionModal: () => {}
};

describe('Dashboard', () => {
  let component;

  describe('rendering', () => {

    it('should render an intro message with username', () => {
      component = shallow(<Dashboard {...mockProps} />)
      const heading = component.find('h2');
      expect(heading.text()).toEqual(`${mockProps.user.username}'s Dashboard`);
    });

    describe('when user.subscription', () => {
      it('should render a premium account tag', () => {
        const mockUser = mockProps.user;
        mockUser.subscription = 'premium';
        component = shallow(<Dashboard {...mockProps} user={mockUser} />);
        const accountTag = component.find('.account-tag');
        expect(accountTag.text()).toEqual('Premium account');
      });
    });

    describe('when user.subscription is FALSE', () => {
      it('should render a basic account tag', () => {
        const mockUser = mockProps.user;
        mockUser.subscription = '';
        component = shallow(<Dashboard {...mockProps} user={mockUser} />);
        const accountTag = component.find('.account-tag');
        expect(accountTag.text()).toEqual('Basic account');
      });
      it('should render an upgrade button', () => {
        const mockUser = mockProps.user;
        mockUser.subscription = '';
        component = shallow(<Dashboard {...mockProps} user={mockUser} />);
        const button = component.find('button');
        const actual = component.containsMatchingElement(
          <button onClick={mockProps.onShowSubSubscriptionModal}>
            Upgrade to premium
          </button>
        );
        expect(actual).toEqual(true);
      });
    });

    it('should render IntegrationsCount with correct props', () => {
      const mockUser = mockProps.user;
      const mockKeys = [ { test: true } ];
      mockUser.keys = mockKeys;
      component.setProps({
        user: mockKeys
      });
      component = shallow(<Dashboard {...mockProps} user={mockUser} />);
      const actual = component.containsMatchingElement(
        <IntegrationsCount
          integrations={mockKeys}
          totalCount={EXCHANGES_MAP.length}
          showCta
        />
      );
      expect(actual).toEqual(true);
    });

  });

  describe('interaction', () => {

    describe('button', () => {
      it('should call props onShowSubSubscriptionModal', () => {
        const buttonClickSpy = sinon.spy();
        component.setProps({
          onShowSubSubscriptionModal: buttonClickSpy
        })
        const button = component.find('button');
        button.simulate('click');
        expect(buttonClickSpy.callCount).toEqual(1);
      });
    });
  });
  
});
