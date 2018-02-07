import React, { PureComponent } from 'react';
import LoginRegisterForm from './components/LoginRegisterForm';

export class Signup extends PureComponent {
  render() {
    return (
      <div className="signup-container align-center">
        <h2>Sign up</h2>
        <LoginRegisterForm isSignup />
      </div>
    );
  }
}

export default Signup;
