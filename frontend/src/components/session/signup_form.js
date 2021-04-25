import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Formik } from 'formik';

class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      handle: '',
      password: '',
      password2: '',
      errors: {}
    };
    this.handleSumbit = this.handleSumbit.bind(this);
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

  handleSumbit({ email }) {
    let user = {
      email,
      handle: this.state.handle,
      password: this.state.password,
      password2: this.state.password2
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
          initialValues={{ email: '' }}
          validate={values => {
            const errors = {};
            if (!values.email) {
              errors.email = 'Required';
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = 'Invalid email address';
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              this.handleSumbit(values);
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
                  value={this.state.handle}
                  onChange={this.update('handle')}
                  placeholder='Handle'
                />
                <br />
                <input
                  type='password'
                  value={this.state.password}
                  onChange={this.update('password')}
                  placeholder='Password'
                />
                <br />
                <input
                  type='password'
                  value={this.state.password2}
                  onChange={this.update('password2')}
                  placeholder='Confirm Password'
                />
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
