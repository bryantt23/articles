import React from 'react';
import { connect } from 'react-redux';

const Authorization = allowedRoles => WrappedComponent => {
  function WithAuthorization({ user }) {
    if (user.roles && user.roles.includes(allowedRoles)) {
      return <WrappedComponent />;
    }
    return <div>This is not part of your role</div>;
  }

  const mapStateToProps = state => {
    return {
      user: state.session.user
    };
  };

  return connect(mapStateToProps, null)(WithAuthorization);
};

export default Authorization;
