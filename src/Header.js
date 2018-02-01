import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

export class Header extends PureComponent {
  render() {
    return (
      <header>
        <h1>
          <Link to="/">Reports Combiner</Link>
        </h1>
      </header>
    );
  }
}

export default Header;
