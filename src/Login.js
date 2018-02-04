import React, { PureComponent } from 'react';
import LoginForm from './components/LoginForm';

export class Login extends PureComponent {
  render() {
    return (
      <div className="login-container align-center">
        <h2>Login</h2>
        <LoginForm />
      </div>
    );
  }
}

export default Login;
