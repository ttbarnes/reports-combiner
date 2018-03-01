import React from 'react';
import { Link } from 'react-router-dom';
import sinon from 'sinon';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import IntegrationsCount from './index';

Enzyme.configure({ adapter: new Adapter() });

const mockProps = {
  integrations: [ {}, {}, {}, {}, {} ],
  totalCount: 100
};

describe('IntegrationsCount', () => {
  let component;

  describe('rendering', () => {

    it('should render the correct count with copy', () => {
      component = shallow(<IntegrationsCount {...mockProps} />)
      const count = component.find('p small');
      const expectedCountCopy = `${mockProps.integrations.length}/${mockProps.totalCount} exchanges integrated`;
      expect(count.text()).toEqual(expectedCountCopy);
    });

    describe('when props.showCta is TRUE ', () => {
      it('should render a link to add an exchange', () => {
        mockProps.showCta = true;
        component = shallow(<IntegrationsCount {...mockProps} />)
        const actual = component.containsMatchingElement(
          <Link to="/integrations">add exchange</Link>
        );
        expect(actual).toEqual(true);
      });
    });

  });
});
