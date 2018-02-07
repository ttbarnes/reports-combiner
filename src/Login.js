import React, { PureComponent } from 'react';
import LoginRegisterForm from './components/LoginRegisterForm';

export class Login extends PureComponent {
  render() {
    return (
      <div className="login-container align-center">
        <h2>Login</h2>
        <LoginRegisterForm />
      </div>
    );
  }
}

export default Login;
