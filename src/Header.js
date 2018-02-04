import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

export class Header extends PureComponent {
  render() {
    return (
      <header>
        <div className="logo">
          <h1>
            <Link to="/">Reports Combiner</Link>
          </h1>
        </div>
        <div className="nav">
          <ul>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/login">Sign up</Link></li>
          </ul>
        </div>
      </header>
    );
  }
}

export default Header;
