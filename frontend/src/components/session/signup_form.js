import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Formik } from 'formik';

class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {}
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearedErrors = false;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.signedIn === true) {
      this.props.history.push('/login');
    }
    this.setState({ errors: nextProps.errors });
  }

  update(type) {
    return e => this.setState({ [type]: e.currentTarget.value });
  }

  handleSubmit({ email, handle, password, password2 }) {
    console.log(arguments);
    let user = {
      email,
      handle,
      password,
      password2
    };
    console.log(user);
    this.props.signup(user, this.props.history);
  }

  renderErrors() {
    return (
      <ul>
        {Object.keys(this.state.errors).map((error, i) => (
          <li key={`error=${i}`}>{this.state.errors[error]}</li>
        ))}
      </ul>
    );
  }

  render() {
    return (
      <div>
        <Formik
          initialValues={{
            email: '',
            handle: '',
            password: '',
            password2: ''
          }}
          validate={values => {
            const errors = {};
            if (!values.email) {
              errors.email = 'Required';
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = 'Invalid email address';
            }

            if (!values.handle) {
              errors.handle = 'Required';
            } else if (values.handle.length < 2 || values.handle.length > 30) {
              errors.handle = 'Handle must be between 2 and 30 characters';
            }

            if (!values.password) {
              errors.password = 'Required';
            } else if (
              values.password.length < 6 ||
              values.password.length > 30
            ) {
              errors.password = 'Password must be between 6 and 30 characters';
            }

            if (values.password2 !== values.password) {
              errors.password2 = 'Passwords must match';
            }

            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            console.log(values);
            setTimeout(() => {
              this.handleSubmit(values);
              setSubmitting(false);
            }, 400);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting
            /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit}>
              <div>
                <br />
                <input
                  type='email'
                  name='email'
                  value={values.email}
                  onChange={handleChange}
                  placeholder='Email'
                />
                <br />
                <input
                  type='text'
                  name='handle'
                  value={values.handle}
                  onChange={handleChange}
                  placeholder='Handle'
                />
                {errors.handle ? <div>{errors.handle}</div> : null}
                <br />
                <input
                  type='password'
                  name='password'
                  value={values.password}
                  onChange={handleChange}
                  placeholder='Password'
                />
                {errors.password ? <div>{errors.password}</div> : null}
                <br />
                <input
                  type='password'
                  name='password2'
                  value={values.password2}
                  onChange={handleChange}
                  placeholder='Password'
                  placeholder='Confirm Password'
                />
                {errors.password2 ? <div>{errors.password2}</div> : null}
                <br />
                {this.renderErrors()}
                {errors.password && touched.password && errors.password}
                <button type='submit' disabled={isSubmitting}>
                  Submit
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    );
  }
}

export default withRouter(SignupForm);
