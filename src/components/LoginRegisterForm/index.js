import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Redirect } from 'react-router-dom'
import { userLogin, userSignup } from '../../actions/user';
import './styles.css';

class LoginRegisterForm extends Component {
  render() {
    const {
      isAuth,
      authError
    } = this.props;

    if (isAuth) {
      return (
        <Redirect to={{
          pathname: '/dashboard',
          state: { from: this.props.location }
        }} />
      );
    }
    return (
      <div className="login-form">
        <form onSubmit={(e) => e.preventDefault()}>
          <div>
            <Field
              name="username"
              component="input"
              type="text"
              className="input-on-dark"
              placeholder="username"
              autoComplete="username"
            />
          </div>

          <div>
            <Field
              name="password"
              component="input"
              type="password"
              className="input-on-dark"
              placeholder="**************"
              autoComplete="current-password"
            />
          </div>

          <div>
            {authError && <p className="form-error">{authError}</p>}

            <button
              type="submit"
              onClick={this.props.onSubmitForm}
              className="block"
            >{this.props.isSignup ? 'Get started today' : 'Log in'}
            </button>
          </div>

        </form>
      </div>
    );
  }
}

const LogInRegisterReduxForm = reduxForm({
  form: 'USER_LOGIN_SIGNUP'
})(LoginRegisterForm);

const mapStateToProps = (state) => {
  return {
    isAuth: state.user && state.user.isAuth,
    authError: state.user && state.user.authError
  }
}

const mapDispatchToProps = (dispatch, props) => {
  const submitFormAction = props.isSignup ? userSignup() : userLogin()
  return {
    onSubmitForm: () => dispatch(submitFormAction)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LogInRegisterReduxForm);

